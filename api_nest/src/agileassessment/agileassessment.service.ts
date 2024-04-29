import { Injectable } from '@nestjs/common';
import { CreateAgileassessmentDto } from './dto/create-agileassessment.dto';
import { UpdateAgileassessmentDto } from './dto/update-agileassessment.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AgilityAssessment } from 'src/agileassessment/entities/agileassessment.entity';
import * as openai from 'openai';

@Injectable()
export class AgileassessmentService {
  readonly openaiApiKey: string; // Your OpenAI API key
  constructor(
    @InjectModel(AgilityAssessment.name) private readonly agilityAssessmentModel: Model<AgilityAssessment>
  ) {
    this.openaiApiKey = process.env.OPENAI_API_KEY; // Set your OpenAI API key here
  }
  async createAgileAssessment(teamId: string, teamObjectivesAndFunctions: string, teamDailyChallenges: string, teamCultureAndValues, agileQuestions: any): Promise<any> {
    //console.log("Creating Assessment for teamid: ", teamId);
    // console.log("Team Objectives and Functions: ", teamObjectivesAndFunctions);
    // console.log("Team Daily Challenges: ", teamDailyChallenges);
    // console.log("Team Culture and Values: ", teamCultureAndValues);
    //console.log("Agile Questions: ", agileQuestions);
    //Validate if teamid already has an assessment
    const existingAssessment = await this.agilityAssessmentModel.findOne({ teamId: teamId });
    if (existingAssessment) {
      console.log("Assessment already exists for this team");
      return "Assessment already exists for this team"
    }
    console.log("Creating Assessment for teamid: ", teamId);
    try {
      // Calculate the Agile Index
      const AgileIndex = await calculateIndex(agileQuestions);
      const AssessmentAnalysis = await generateAssessmentAnalysis(this.openaiApiKey, teamObjectivesAndFunctions, teamDailyChallenges, teamCultureAndValues, agileQuestions, AgileIndex);
      const AssessmentRecommendations = await generateAssessmentRecommendations(AssessmentAnalysis, this.openaiApiKey);
      const Assessment = new this.agilityAssessmentModel({
        teamId: teamId,
        date: new Date(),
        teamContext: teamObjectivesAndFunctions,
        objectivesAndFunctions: teamObjectivesAndFunctions,
        dailyChallenges: teamDailyChallenges,
        cultureAndValues: teamCultureAndValues,
        agileQuestions: agileQuestions,
        agileindex: AgileIndex,
        analysis: AssessmentAnalysis.analysis,
        recommendations: AssessmentRecommendations
      })

      //await Assessment.save();
      console.log("Assessment saved");
      return Assessment;
    } catch (error) {
      console.error(error);
      //Return error message ot the client
      return {
        message: error.message
      }
    }

    async function calculateIndex(agileQuestions: any[]): Promise<any> {
      console.log("Calculating percentages");
      const areas: { [area: string]: number } = {
        Resultados: 0,
        Metodologia: 0,
        Cultura: 0
      };

      const possibleScores: { [area: string]: number } = {
        Resultados: 0,
        Metodologia: 0,
        Cultura: 0
      };

      // Iterate through each question
      agileQuestions.forEach(question => {
        const { area, score } = question;

        // Accumulate the score for the corresponding area
        areas[area] += score;
        // Accumulate the possible total score for the corresponding area
        possibleScores[area] += 3; // Since 'Si' = 3 puntos, we add 3 for each question
      });

      // Calculate the percentage for each area
      const percentages: { [area: string]: number } = {};
      for (const area in areas) {
        if (Object.prototype.hasOwnProperty.call(areas, area)) {
          percentages[area] = (areas[area] / possibleScores[area]) * 100;
          percentages[area] = parseFloat(percentages[area].toFixed(2)); // Fix to 2 decimal places
        }
      }

      // Calculate the average of the three areas' percentages
      const average = Object.values(percentages).reduce((acc, val) => acc + val, 0) / 3;
      percentages['AgileIndex'] = parseFloat(average.toFixed(2));

      return percentages;
    }

    async function generateAssessmentAnalysis(
      openaiApiKey,
      teamObjectivesAndFunctions,
      teamDailyChallenges,
      teamCultureAndValues,
      agileQuestions,
      AgileIndex,
    ): Promise<any> {
      console.log('Generando Analisis del Assessment');
      const AssessmentData = {
        teamObjectivesAndFunctions,
        teamDailyChallenges,
        teamCultureAndValues,
        agileQuestions,
        AgileIndex
      }
      try {
        const client = new openai.OpenAI({ apiKey: openaiApiKey });
        const prompt = await constructPrompt(AssessmentData);
        const response = await client.chat.completions.create({
          messages: [{ role: 'user', content: prompt }],
          model: 'gpt-3.5-turbo',
          temperature: 1,
          top_p: 1
        });
        const analysis = response.choices[0].message.content.trim();
        return { analysis, prompt };
      } catch (error) {
        console.error('Error generating recommendations:', error);
        throw new Error('Failed to generate recommendations');
      }

      async function constructPrompt(dataSummary: any): Promise<any> {
        // Deconstruct the dataSummary object
        const { teamObjectivesAndFunctions, teamDailyChallenges, teamCultureAndValues, agileQuestions, AgileIndex } = dataSummary;
        // Construct the prompt
        let prompt = `Actuarás como un consultor experto en agilidad empresarial. Basados en la data del siguiente equipo, su contexto, y un agile assessment, genera un análisis relevante sobre el estado del equipo en relación a su agilidad, el contexto, y sus objetivos:
        \n\n`;

        prompt += `1. Contexto del Equipo \n`;
        prompt += `Cuentanos sobre los principales objetivos y funciones de tu equipo: : ${teamObjectivesAndFunctions}\n`;
        prompt += `¿Cuáles son los principales desafíos a los que se enfrenta tu equipo en su día a día?: ${teamDailyChallenges}\n`;
        prompt += `¿Cómo describirías la cultura y los valores de tu equipo actualmente?: ${teamCultureAndValues}\n`;

        // Append agileQuestions to the prompt
        prompt += `\n2. Preguntas del assessment de agilidad. Cada pregunta puede tener valores de 0 (No), 1 (A Veces), o 3 (Si). Cada pregunta pertenece a un área (Resultados, Metodologia, o Cultura):\n`;

        agileQuestions.forEach((question: any, index: number) => {
          prompt += `${index + 1}. ${question.question}: ${question.area}: ${question.score}\n`;
        });

        prompt += `\n3. Y se ha calculado el Agile Index general, además del score por cada area:\n`;
        prompt += `Agile General Index (%): ${AgileIndex.AgileIndex}\n`;
        prompt += `Resultados (%): ${AgileIndex.Resultados}\n`;
        prompt += `Metodologia (%): ${AgileIndex.Metodologia}\n`;
        prompt += `Cultura (%): ${AgileIndex.Cultura}\n`;

        prompt += `\n\nDebes darle mucho enfásis al contexto del equipo, sobre todo a sus desafios. Genera un análsis general en cada una de las dimensiones del assesment, Resultados, Metodología y Cultura. `
        //console.log("Prompt: ", prompt);
        return prompt;
      }


    }
    async function generateAssessmentRecommendations(
      AssessmentAnalysis: any,
      openaiApiKey,
    ): Promise<any> {
      console.log('Generando Recomendaciones del Assessment');
      try {
        const client = new openai.OpenAI({ apiKey: openaiApiKey });
        const prompt = await constructPrompt(AssessmentAnalysis);
        const response = await client.chat.completions.create({
          messages: [{ role: 'user', content: prompt }],
          model: 'gpt-3.5-turbo',
          temperature: 1,
          top_p: 1
        });

        return response.choices[0].message.content.trim();
      } catch (error) {
        console.error('Error generating recommendations:', error);
        throw new Error('Failed to generate recommendations');
      }

      async function constructPrompt(
        AssessmentAnalysis: any
      ): Promise<any> {
        let prompt = `Actuarás como un consultor experto en agilidad empresarial. Basados en el analisis del siguiente assessment, genera las 3 recomendaciones mas importantes y de mayor impacto de mejora en su agilidad y performance para el equipo:\n\n`;
        // add the datasummary to the prompt variable
        prompt += `Analisis del Assessment: ${AssessmentAnalysis}\n`;
        return prompt;
      }
    }
  }



  async findAll(teamId: string): Promise<any> {
    // Add logic to fetch data from the database
    const existingAssessment = await this.agilityAssessmentModel.findOne({ teamId: teamId });
    if (existingAssessment) {
      return existingAssessment;
    }
    else {
      return "No assessment exists for this team";
    }


  }

  findOne(id: number) {
    return `This action returns a #${id} agileassessment`;
  }

  remove(id: number) {
    return `This action removes a #${id} agileassessment`;
  }
}
