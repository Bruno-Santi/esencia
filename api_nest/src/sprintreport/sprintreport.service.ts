import { Injectable } from '@nestjs/common';
import { CreateSprintreportDto } from './dto/create-sprintreport.dto';
import { UpdateSprintreportDto } from './dto/update-sprintreport.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as openai from 'openai';

import { Retro } from 'src/retro/entities/retro.entity';
import { Board } from 'src/boards/entities/board.entity';
import { Survey } from 'src/survey/entities/survey.entity';
import { Card } from 'src/boards/entities/card.entity';
import { SprintReport } from 'src/sprintreport/entities/sprintreport.entity';

@Injectable()
export class SprintreportService {
  readonly openaiApiKey: string; // Your OpenAI API key
  constructor(
    @InjectModel(Retro.name) private readonly retroModel: Model<Retro>,
    @InjectModel(Board.name) private readonly boardModel: Model<Board>,
    @InjectModel(Survey.name) private readonly surveyModel: Model<Survey>,
    @InjectModel(Card.name) private readonly cardModel: Model<Card>,
    @InjectModel(SprintReport.name)
    private readonly sprintReportModel: Model<SprintReport>,
  ) {
    this.openaiApiKey = process.env.OPENAI_API_KEY; // Set your OpenAI API key here
  }
  async createSprintReport(teamId: string, sprint: string): Promise<any> {
    // Retrieve sprint data for the specified team and sprint
    try {
      const retrospective = await this.retroModel.find({
        team_id: teamId,
        sprint: sprint,
      });
      const board = await this.boardModel.find({ team_id: teamId });
      const cards = await this.cardModel.find({
        boardId: board[0]._id.toString(),
      });
      const surveys = await this.surveyModel.find({
        team_id: teamId,
        sprint: sprint,
      });
      //Create Report Data
      const report = await generateSprintReport(
        this.openaiApiKey,
        teamId,
        sprint,
        retrospective,
        board,
        surveys,
        cards,
      );
      const newReport = await new this.sprintReportModel(report);
      //await newReport.save();
      console.log('Report saved');
      return newReport;
    } catch (error) {
      console.log(error);
    }
    async function generateSprintReport(
      openaiApiKey,
      teamId: string,
      sprint: string,
      retrospective: Retro[],
      board: Board[],
      surveys: Survey[],
      cards: Card[],
    ): Promise<any> {
      try {
        // OK Calculate Weighted Averages for Quadrants
        const weightedAverages = await getSurveyResults(surveys);
        // OK Calculate Min and Max Date
        const { minDate, maxDate } = await getMinMaxDate(weightedAverages);
        // OK Get Difference Between Cuadrands start and end date.
        const difference = await getDifferenceBetweenCuadrands(
          weightedAverages,
          minDate,
          maxDate,
        );
        //OK Get Total cards from board
        const columnItemCount = await getCardsByColumn(board);
        // OK Aggregate Responses for Retrospective
        const retrospectiveResponses = await getRetroResults(retrospective);
        // Get Worst and Best Survey Questions
        const topworstanswers = await getSurveyAnswers(surveys);
        //Get Cards In the Boards
        const boardCards = await getCardsForBoard(cards);
        // Construct Sprint Report
        const sprintReport: { [key: string]: any } = {
          teamId: teamId,
          sprint: sprint,
          startDate: minDate,
          endDate: maxDate,
          tasks: columnItemCount,
          cuadrants_difference: difference,
          retrospective: retrospectiveResponses,
          line_graphs: weightedAverages,
          survey_answers: topworstanswers,
          GoalStatus: boardCards,
        };
        // Ask Analyss to chatgpt
        const {analysis, prompt} = await generateAnalysis(sprintReport, openaiApiKey);
        
        const recomendaciones = await generateRecommendations(
          prompt,
          analysis,
          openaiApiKey,
        );
        // Append analysis and recomendaciones to sprintReport
        sprintReport.analysis = analysis;
        sprintReport.recommendations = recomendaciones;
        return sprintReport;
      } catch (error) {
        return console.log(error);
      }
    }
    async function getSurveyResults(surveys: Survey[]): Promise<any> {
      console.log('Procesando Resultados de Encuestas');
      // Initialize an object to store surveys grouped by day
      const surveysByDay: { [key: string]: Survey[] } = {};
      // Group surveys by day
      surveys.forEach((survey) => {
        // Extract day part from the date
        const day = survey.date.toISOString().split('T')[0]; // Assuming survey.date is a Date object
        // Check if surveysByDay already has surveys for the current day
        if (!surveysByDay[day]) {
          // If not, initialize an array for the current day
          surveysByDay[day] = [];
        }
        // Push the current survey to the array for the current day
        surveysByDay[day].push(survey);
      });

      const weightedAveragesByDay: { [key: string]: number[] } = {};

      Object.keys(surveysByDay).forEach(async (day) => {
        const surveysForDay = surveysByDay[day];
        const weightedAverages = await getSurveyResultsbyDay(surveysForDay);
        //console.log(day, weightedAverages);
        // Define weightedAveragesByDay = day,weightedAverages
        weightedAveragesByDay[day] = weightedAverages;
      });

      return weightedAveragesByDay;
    }
    async function getSurveyResultsbyDay(surveys: Survey[]): Promise<any> {
      // Initialize an object to store the total weighted averages for each quadrant
      let results: number[] = [];
      let totals: number[] = [];

      // Initialize totals array with zeros for each quadrant
      results = [0, 0, 0, 0];
      totals = [0, 0, 0, 0];

      // Iterate through each survey
      surveys.forEach((survey) => {
        // Iterate through each question in the survey
        for (let i = 1; i <= 4; i++) {
          //Get the Answer Value and Quadrant Cohef of each question
          const value = survey[`question${i}`].value;
          const cuadrant_cohef = survey[`question${i}`].cuadrant_cohef;

          // Validate cuadrant_cohef values
          if (
            Array.isArray(cuadrant_cohef) &&
            cuadrant_cohef.every((coef) => typeof coef === 'number')
          ) {
            // Calculate the coef * cuadrant result
            const quadrant: number[] = cuadrant_cohef.map((coef) =>
              parseFloat((coef * value).toFixed(2)),
            );

            // Accumulate the product of coef * value for each quadrant for all surveys
            for (let j = 0; j < 4; j++) {
              results[j] += quadrant[j];
              totals[j] += cuadrant_cohef[j];
            }
          } else {
            console.error(
              `Invalid cuadrant_cohef for Question ${i}: ${cuadrant_cohef}`,
            );
            // Handle the error or skip the calculation for this question
          }
        }
      });
      //At this point, we have the sum of the results and total possible score
      //Calculate the weighted averages
      const weightedAverages = results.map((result, index) =>
        (result / totals[index]).toFixed(2),
      );

      const generalAverage = (
        weightedAverages.reduce((sum, avg) => sum + parseFloat(avg), 0) /
        weightedAverages.length
      ).toFixed(2);

      // Add the general average as the last element of the array
      weightedAverages.push(generalAverage);

      return weightedAverages;
    }
    async function getMinMaxDate(weightedAverages): Promise<any> {
      console.log('Calculando Min y Max Date');
      try {
        const dates = Object.keys(weightedAverages);

        const timestamps = dates.map((date) => new Date(date).getTime());

        const minTimestamp = Math.min(...timestamps);
        const maxTimestamp = Math.max(...timestamps);

        const minDate = new Date(minTimestamp).toISOString().split('T')[0];
        const maxDate = new Date(maxTimestamp).toISOString().split('T')[0];

        return { minDate, maxDate };
      } catch (error) {
        console.log('error getting min and max dates');
      }
    }
    async function getDifferenceBetweenCuadrands(
      weightedAverages,
      minDate,
      maxDate,
    ): Promise<any> {
      console.log('Calculando Diferencias de Cuadrantes');
      try {
        //Calculate the difference between de max date and min date
        const cuadrantsDifference: number[] = [];
        // Iterate over each quadrant
        for (let i = 0; i < 5; i++) {
          // Calculate the difference for the current quadrant between the maximum and minimum dates
          const difference =
            weightedAverages[maxDate][i] - weightedAverages[minDate][i];
          // Push the difference to the cuadrantsDifference array
          cuadrantsDifference.push(parseFloat(difference.toFixed(2)));
        }
        return cuadrantsDifference;
      } catch (error) {
        console.log('error getting cuadrants difference');
      }
    }
    async function getCardsByColumn(board): Promise<any> {
      console.log('Calculando Status de Goals');
      // Initialize an object to store the summary
      const columnSummary = {};
      // Iterate over each column in the board
      board[0].columns.forEach((column) => {
        // Get the number of cards in the column
        const cardCount = column.cards.length;
        // Add the card count to the column summary object
        columnSummary[column.name] = cardCount;
      });
      return columnSummary;
    }
    async function getRetroResults(retrospective: Retro[]): Promise<any> {
      console.log('Procesando Retro');
      try {
        const flattenedResponses: string[] = [];
        // Iterate through each question (c1, c2, c3, c4)
        for (const question of ['c1', 'c2', 'c3', 'c4']) {
          // Get the responses for the current question
          const responses = retrospective[0][question]?.responses || [];

          // Iterate through each response and extract the relevant information
          for (const response of responses) {
            // Construct the flattened response string
            const flattenedResponse = `${retrospective[0][question].content}, ${response.note}, thumb_up: ${response.thumb_up}, thumb_down: ${response.thumb_down}`;
            // Push the flattened response to the flattenedResponses array
            flattenedResponses.push(flattenedResponse);
          }
        }
        //Sort resonses from most thumbs up to most thumbs down
        flattenedResponses.sort((a, b) => {
          // Extract thumbs up and thumbs down counts from the response strings
          const thumbsUpA = parseInt(a.match(/thumb_up: (\d+)/)[1]);
          const thumbsDownA = parseInt(a.match(/thumb_down: (\d+)/)[1]);
          const thumbsUpB = parseInt(b.match(/thumb_up: (\d+)/)[1]);
          const thumbsDownB = parseInt(b.match(/thumb_down: (\d+)/)[1]);

          // Calculate scores for each response based on thumbs up and thumbs down counts
          const scoreA = thumbsUpA - thumbsDownA;
          const scoreB = thumbsUpB - thumbsDownB;

          // Sort responses based on score (highest score first)
          return scoreB - scoreA;
        });
        return flattenedResponses;
      } catch (error) {
        console.log('error getting retro results');
      }
    }
    async function getSurveyAnswers(surveys: Survey[]): Promise<any> {
      console.log('Procesando Preguntas de Encuestas');
      try {
        // Initialize an object to store the sum of values for each question
        const questionSums: { [key: string]: number } = {};
        const questionCounts: { [key: string]: number } = {};

        // Iterate over each survey
        for (const survey of surveys) {
          // Iterate over each question in the survey
          for (let i = 1; i <= 4; i++) {
            const questionKey = `question${i}`;
            const question = survey[questionKey];
            const content = question.content;
            const value = question.value;

            // Accumulate the sum of values for each question
            questionSums[content] = (questionSums[content] || 0) + value;

            // Increment the count of surveys for each question
            questionCounts[content] = (questionCounts[content] || 0) + 1;
          }
        }

        // Calculate the average for each question
        const averageAnswers: { [key: string]: number } = {};
        for (const content in questionSums) {
          const sum = questionSums[content];
          const count = questionCounts[content];
          // Calculate the average and limit the decimals to 2
          const average = sum / count;
          averageAnswers[content] = Number(average.toFixed(2));
        }

        return getSortedAverageAnswers(averageAnswers);
      } catch (error) {
        console.log('Error procesando preguntas');
      }
    }
    async function getSortedAverageAnswers(averageAnswers: {
      [key: string]: number;
    }): Promise<any> {
      console.log('Ordenando Preguntas de Encuestas');
      try {
        // Convert averageAnswers object into an array of key-value pairs
        const averageAnswersArray = Object.entries(averageAnswers);
        // Sort the array based on the average values (in descending order)
        averageAnswersArray.sort((a, b) => Number(b[1]) - Number(a[1]));

        // Convert the sorted array back into an object
        const sortedAverageAnswers: { [key: string]: number } = {};
        averageAnswersArray.forEach(([content, average]) => {
          sortedAverageAnswers[content] = average;
        });

        return sortedAverageAnswers;
      } catch (error) {
        console.log('Error ordenando preguntas');
      }
    }
    async function getCardsForBoard(cards: Card[]): Promise<any> {
      console.log('Calculando estado de cards');
      try {
        const cardSummaries = await cards.map((card) => {
          let totalCheckItems = 0;
          let trueCount = 0;

          card.checkList.forEach((checklist) => {
            totalCheckItems += checklist.checkItems.length;
            checklist.checkItems.forEach((checkItem) => {
              if (checkItem.isChecked) {
                trueCount++;
              }
            });
          });
          const percentageTrue =
            totalCheckItems > 0 ? (trueCount / totalCheckItems) * 100 : 0;
          return {
            total_check_items: totalCheckItems,
            true_count: trueCount,
            title: card.title,
            status: card.status,
            percentage_true: percentageTrue.toFixed(2),
          };
        });
        return cardSummaries;
      } catch (error) {
        console.log('Error calculando estado de cards');
      }
    }
    async function generateAnalysis(
      sprintData: any,
      openaiApiKey,
    ): Promise<any> {
      console.log('Generando Analisis de Sprint');
      try {
        const client = new openai.OpenAI({ apiKey: openaiApiKey });
        const prompt = await constructPrompt(sprintData);
        const response = await client.chat.completions.create({
          messages: [{ role: 'user', content: prompt }],
          model: 'gpt-3.5-turbo',
        });
        const analysis = response.choices[0].message.content.trim();
        return {analysis,prompt};
      } catch (error) {
        console.error('Error generating recommendations:', error);
        throw new Error('Failed to generate recommendations');
      }

      async function constructPrompt(dataSummary: typeof sprintData): Promise<any> {
        //Deconstruct the dataSummary object
        const { teamid, sprint, startDate, endDate, tasks, cuadrants_difference, retrospective, line_graphs, survey_answers, GoalStatus } = dataSummary;

        // Construct the prompt
        let prompt = `Actuarás como un consultor expero en agilidad empresarial. Basados en la data del siguiente sprint, genera un análisis relevante sobre el progreso del sprint, los objetivos planteados, los puntos altos y bajos del equipo en el sprint:\n\n`;

        // Sprint Information
        prompt += `Sprint ${sprint}:\n`;
        prompt += `Fecha de inicio: ${startDate}\n`;
        prompt += `Fecha de fin: ${endDate}\n`;

        prompt += `\nEstado de los objetivos planteados:`;
        prompt = await addtoPrompt(prompt, GoalStatus)

        // Task Summary
        prompt += `\nResumen del progreso de estos objetivos al cierre del sprint:\n`;
        Object.entries(tasks).forEach(([category, count]) => {
          prompt += `${category}: ${count}\n`;
        });

        // Retrospective
        prompt += `\nFeedback encontrado en la retrospectiva, bajo el formato; Pregunta Realizada, Respuesta Obtenidas, Votos a cada respuesta:\n`;
        prompt = await addtoPrompt(prompt, retrospective)

        // Survey Answers
        prompt += `\nRespuestas a las encuestas de pulso realizadas:\n`;
        prompt = await addtoPrompt(prompt, survey_answers)

        // Cuadrants Difference
        prompt += `\nDiferencia entre cuadrantes, en relación al inicio y cierre del sprint, donde cada cuadrante es:\n
              daily_self_satisfaction: ${cuadrants_difference[0]}\n
              daily_team_collaboration: ${cuadrants_difference[1]}\n
              daily_work_engagement: ${cuadrants_difference[2]}\n
              daily_workspace_wellbeing: ${cuadrants_difference[3]}\n
              daily_general_satisfaction:${cuadrants_difference[4]}\n`;

        // Line Graphs
        prompt += `\nEvolución de estos cuadrantes en el sprint, por fecha:\n`;
        prompt = await addtoPrompt(prompt, line_graphs)

        // Helper function to add the data to the prompt
        async function addtoPrompt(prompt, dataobject): Promise<any> {
          Object.entries(dataobject).forEach(([key, value]) => {
            // Check if the value is an object
            if (typeof value === 'object' && value !== null) {
              // If it's an object, stringify it and add it to the prompt
              prompt += `${key}: ${JSON.stringify(value)}\n`;
            } else {
              // If it's not an object, just add it to the prompt as-is
              prompt += `${key}: ${value}\n`;
            }
          });
          return prompt;
        }
        return prompt;
      }

    }
    async function generateRecommendations(
      sprintData: any,
      sprintAnalysis: any,
      openaiApiKey,
    ): Promise<any> {
      console.log('Generando Recomendaciones del Sprint');
      try {
        const client = new openai.OpenAI({ apiKey: openaiApiKey });
        const prompt = await constructPrompt(sprintData, sprintAnalysis);
        const response = await client.chat.completions.create({
          messages: [{ role: 'user', content: prompt }],
          model: 'gpt-3.5-turbo',
        });

        return response.choices[0].message.content.trim();
      } catch (error) {
        console.error('Error generating recommendations:', error);
        throw new Error('Failed to generate recommendations');
      }

      async function constructPrompt(
        dataSummary: any,
        sprintAnalysis: any,
      ): Promise<any> {
        let prompt = `Basados en la data y análisis del siguiente sprint, genera recomendaciones de mejora para el equipo:\n\n`;
        // add the datasummary to the prompt variable
        prompt += `Data del Sprint: ${dataSummary}\n\n`;
        prompt += `Analisis del Sprint: ${sprintAnalysis}\n`;
        //console.log("Prompt:", prompt);
        //console.log('Recommendations Prompt:', prompt);
        return prompt;
      }
    }

  }
  
  async getAllTeamReports(teamId: string): Promise<any> {
    try {
      const SprintReports = await this.sprintReportModel.find({
        teamId: teamId,
      });
      return SprintReports;
    } catch (error) {
      console.log('Error getting team reports:', error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} sprintreport`;
  }
}