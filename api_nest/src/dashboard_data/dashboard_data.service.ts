import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Response,
} from '@nestjs/common';
import { CreateDashboardDatumDto } from './dto/create-dashboard_datum.dto';
import { UpdateDashboardDatumDto } from './dto/update-dashboard_datum.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as moment from 'moment-timezone';
import { Retro } from 'src/retro/entities/retro.entity';
import { Board } from 'src/boards/entities/board.entity';
import { Card } from 'src/boards/entities/card.entity';
import { Test1 } from './entities/Test1.entity';
import { Survey } from 'src/survey/entities/survey.entity';
import { DaySurvey } from 'src/survey/entities/daySurvey.entity';
import { Recommendation } from './entities/Recommendation.entity';

import * as openai from 'openai';
interface AggregatedData {
  [date: string]: {
    date: string;
    daily_self_satisfaction: number;
    daily_team_collaboration: number;
    daily_work_engagement: number;
    daily_workspace_wellbeing: number;
    daily_general_satisfaction: number;
    count: number;
  };
}
@Injectable()
export class DashboardDataService {
  private readonly openaiApiKey: string;
  constructor(
    @InjectModel(DaySurvey.name) private readonly daySurveyModel: Model<any>,
    @InjectModel(Survey.name) private readonly surveyModel: Model<any>,
    @InjectModel(Board.name) private readonly boardsModel: Model<any>,
    @InjectModel(Card.name) private readonly cardsModel: Model<any>,
    @InjectModel(Retro.name) private readonly retroModel: Model<any>,
    @InjectModel('Report') private readonly reportModel: Model<any>,
    @InjectModel(Recommendation.name)
    private readonly recommendationModel: Model<any>,
  ) {
    this.openaiApiKey = process.env.OPENAI_API_KEY;
  }
  async dashboardAllData(teamId: string) {
    try {
      const fifteenDaysAgo = moment()
        .tz('America/Argentina/Buenos_Aires')
        .subtract(15, 'days');

      const lines = await this.surveyModel
        .aggregate([
          { $match: { team_id: teamId } },
          { $match: { date: { $gte: fifteenDaysAgo.toDate() } } },
          {
            $project: {
              _id: 0,
              date: 1,
              daily_self_satisfaction: { $divide: ['$question1.value', 1] },
              daily_team_collaboration: { $divide: ['$question2.value', 1] },
              daily_work_engagement: { $divide: ['$question3.value', 1] },
              daily_workspace_wellbeing: { $divide: ['$question4.value', 1] },
              daily_general_satisfaction: {
                $divide: [
                  {
                    $add: [
                      '$question1.value',
                      '$question2.value',
                      '$question3.value',
                      '$question4.value',
                    ],
                  },
                  4,
                ],
              },
            },
          },
          { $sort: { date: 1 } },
        ])
        .exec();
      console.log(lines);

      let pieChart;

      if (lines.length) {
        pieChart = {
          general_satisfaction:
            lines.reduce(
              (acc, curr) => acc + curr.daily_general_satisfaction,
              0,
            ) / lines.length,
          self_satisfaction:
            lines.reduce((acc, curr) => acc + curr.daily_self_satisfaction, 0) /
            lines.length,
          team_collaboration:
            lines.reduce(
              (acc, curr) => acc + curr.daily_team_collaboration,
              0,
            ) / lines.length,
          work_engagement:
            lines.reduce((acc, curr) => acc + curr.daily_work_engagement, 0) /
            lines.length,
          workspace_wellbeing:
            lines.reduce(
              (acc, curr) => acc + curr.daily_workspace_wellbeing,
              0,
            ) / lines.length,
        };
      }
      console.log(lines);

      const groupedByDate = lines.reduce((acc: any, curr: any) => {
        const date = curr.date.toISOString().split('T')[0];
        if (!acc[date]) {
          acc[date] = {
            date: date,
            daily_self_satisfaction: 0,
            daily_team_collaboration: 0,
            daily_work_engagement: 0,
            daily_workspace_wellbeing: 0,
            daily_general_satisfaction: 0,
            count: 0,
          };
        }

        acc[date].daily_self_satisfaction += curr.daily_self_satisfaction;
        acc[date].daily_team_collaboration += curr.daily_team_collaboration;
        acc[date].daily_work_engagement += curr.daily_work_engagement;
        acc[date].daily_workspace_wellbeing += curr.daily_workspace_wellbeing;
        acc[date].daily_general_satisfaction += curr.daily_general_satisfaction;
        acc[date].count++;

        return acc;
      }, {});

      console.log(groupedByDate);
      const finalAggregatedValues = Object.values(groupedByDate).map(
        (dayData: any) => {
          const { count, ...metrics } = dayData as {
            count: number;
            [key: string]: any;
          };

          const formattedDate = moment(dayData.date).toISOString();
          return {
            ...metrics,
            date: formattedDate,
            daily_self_satisfaction: metrics.daily_self_satisfaction / count,
            daily_team_collaboration: metrics.daily_team_collaboration / count,
            daily_work_engagement: metrics.daily_work_engagement / count,
            daily_workspace_wellbeing:
              metrics.daily_workspace_wellbeing / count,
            daily_general_satisfaction:
              metrics.daily_general_satisfaction / count,
          };
        },
      );
      console.log(finalAggregatedValues);
      const answers = await this.surveyModel
        .aggregate([
          { $match: { team_id: teamId } },
          { $match: { date: { $gte: fifteenDaysAgo.toDate() } } },
          { $group: { _id: null, total_entries: { $sum: 1 } } },
        ])
        .exec();
      const totalAnswers = answers.length > 0 ? answers[0].total_entries : 0;

      // Recommendation
      const recommendation = await this.recommendationModel
        .findOne({ team_id: teamId, kind: 'daily' }, { content: 1 })
        .sort({ date: -1, answers: -1 })
        .exec();

      // Retro count
      const retroCount = await this.retroModel
        .countDocuments({
          team_id: teamId,
          date: { $gte: fifteenDaysAgo.toDate() },
        })
        .exec();

      const reportCount = await this.reportModel
        .countDocuments({
          team_id: teamId,
          date: { $gte: fifteenDaysAgo.toDate() },
        })
        .exec();

      const topics = await this.surveyModel
        .aggregate([
          {
            $match: {
              team_id: teamId,
              'comment.content': { $ne: '' },
              date: { $gte: fifteenDaysAgo.toDate() },
            },
          },
          {
            $group: {
              _id: '$comment.content',
            },
          },
          {
            $project: {
              _id: 0,
              content: '$_id',
            },
          },
        ])
        .exec();

      const cardsAmount = await this.boardsModel
        .aggregate([
          { $match: { team_id: teamId } },
          { $unwind: '$columns' },
          { $unwind: '$columns.cards' },
          {
            $lookup: {
              from: 'Cards',
              localField: 'columns.cards',
              foreignField: '_id',
              as: 'card_details',
            },
          },
          { $unwind: '$card_details' },
          { $group: { _id: '$card_details.status', count: { $sum: 1 } } },
        ])
        .exec();

      // Task
      const task = await this.boardsModel
        .aggregate([
          { $match: { team_id: teamId } },
          { $unwind: '$columns' },
          { $unwind: '$columns.cards' },
          {
            $lookup: {
              from: 'Cards',
              localField: 'columns.cards',
              foreignField: '_id',
              as: 'card_details',
            },
          },
          { $unwind: '$card_details' },
          {
            $project: {
              _id: 0,
              title: '$card_details.title',
              status: '$card_details.status',
              total_check_items: {
                $sum: {
                  $map: {
                    input: '$card_details.checkList',
                    as: 'checkList',
                    in: { $size: '$$checkList.checkItems' },
                  },
                },
              },
              true_count: {
                $sum: {
                  $map: {
                    input: '$card_details.checkList',
                    as: 'checkList',
                    in: {
                      $size: {
                        $filter: {
                          input: '$$checkList.checkItems',
                          as: 'item',
                          cond: '$$item.isChecked',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          {
            $project: {
              title: '$title',
              status: '$status',
              total_check_items: 1,
              true_count: 1,
              percentage_true: {
                $cond: {
                  if: { $eq: ['$total_check_items', 0] },
                  then: 'No medible',
                  else: {
                    $multiply: [
                      { $divide: ['$true_count', '$total_check_items'] },
                      100,
                    ],
                  },
                },
              },
            },
          },
        ])
        .exec();

      const short_recommendation = await this.shortRecommendation(teamId);

      const dashboard = {
        pie_chart: pieChart,
        lines_graph: finalAggregatedValues,
        data_amount: {
          respuestas_diarias: totalAnswers,
          cantidad_de_retros: retroCount,
          reportes_generados: reportCount,
        },
        short_recommendation: short_recommendation.length
          ? short_recommendation
          : 'There is not enough data.',
        topics: topics.map((topic) => topic.content),
        cards: cardsAmount,
        task: task,
      };

      return dashboard;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async shortRecommendation(teamId: string) {
    try {
      const tz = 'America/Argentina/Buenos_Aires';
      const fecha = moment().tz(tz).toDate();
      const minDate = moment(fecha).startOf('day').toDate();
      const maxDate = moment(fecha).endOf('day').toDate();
      const today = moment().startOf('day');

      const questionsData = await this.daySurveyModel.aggregate([
        {
          $match: {
            team_id: teamId,
            $expr: {
              $eq: [
                { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
                today.format('YYYY-MM-DD'),
              ],
            },
          },
        },
      ]);
      console.log(questionsData);

      if (questionsData.length === 0) return [];

      const preguntas = questionsData[0].questions.map(
        (question) => question.content,
      );
      console.log(preguntas);

      const data = await this.surveyModel.aggregate([
        { $match: { team_id: teamId } },
        { $match: { date: { $gte: minDate, $lte: maxDate } } },
        {
          $group: {
            _id: {
              team_id: '$team_id',
              date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
            },
            daily_self_satisfaction: {
              $avg: { $multiply: ['$question1.value', 100] },
            },
            daily_team_collaboration: {
              $avg: { $multiply: ['$question2.value', 100] },
            },
            daily_work_engagement: {
              $avg: { $multiply: ['$question3.value', 100] },
            },
            daily_workspace_wellbeing: {
              $avg: { $multiply: ['$question4.value', 100] },
            },
          },
        },
      ]);
      console.log(data);

      if (data.length === 0) return [];

      let prompt = `Actuarás como un Agile coach experto. Darás recomendaciones para un equipo pensando en mejorar sus capacidades de desarrollo ágil.
      Te daré 4 preguntas que se hicieron a un grupo de trabajo y me darás como máximo 4 recomendaciones a partir de tu análisis de la puntuación de las respuestas
      y de lo que se enuncia. Debes dar recomendaciones creativas que aporten valor a estos equipos de trabajo.
      
      Necesito que las recomendaciones me las mandes en este formato:
      [Titulo recomendacion]: 
      [Recomendación extensa que de valor]
      
      Hasta un máximo de 4 de estas. Asegúrate de que las respuestas que me des no tengan ningún otro texto adicional.
      
      Preguntas:\n`;

      for (const pregunta of preguntas) {
        prompt += `${pregunta}\n`;
      }

      const client = new openai.OpenAI({ apiKey: this.openaiApiKey });
      const response = await client.chat.completions.create({
        messages: [{ role: 'system', content: prompt }],
        model: 'gpt-3.5-turbo',
        temperature: 0.8,
      });
      console.log(response);

      const recommendationText = response.choices[0].message.content.trim();
      console.log(
        'Texto de la recomendación antes del procesamiento:',
        recommendationText,
      );

      const formattedRecommendations = [];
      let currentRecommendation;
      recommendationText.split('\n').forEach((line) => {
        if (line.trim() !== '') {
          const match = line.match(/^\d+\.\s\*\*(.+?)\*\*:\s*(.*)$/);
          if (match) {
            if (currentRecommendation) {
              formattedRecommendations.push(currentRecommendation);
            }
            currentRecommendation = {
              title: match[1].trim(),
              content: match[2].trim(),
            };
          } else if (currentRecommendation) {
            currentRecommendation.content += ' ' + line.trim();
          }
        }
      });
      if (currentRecommendation) {
        formattedRecommendations.push(currentRecommendation);
      }

      await this.recommendationModel.insertMany({
        team_id: teamId,
        date: moment().startOf('day').toDate(),
        kind: 'daily',
        answers: data[0].answers,
        content: JSON.stringify(formattedRecommendations),
      });

      return formattedRecommendations;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
