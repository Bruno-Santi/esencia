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

      // Pie chart calculations
      let pieChart;
      console.log(lines);

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

      const answers = await this.surveyModel
        .aggregate([
          { $match: { team_id: teamId } },
          { $match: { date: { $gte: fifteenDaysAgo.toDate() } } },
          { $group: { _id: null, total_entries: { $sum: 1 } } },
        ])
        .exec();
      const totalAnswers = answers.length > 0 ? answers[0].total_entries : 0;

      console.log(answers);
      console.log(totalAnswers);

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
              'comment.content': { $ne: '' }, // Excluir comentarios vacíos
              date: { $gte: fifteenDaysAgo.toDate() }, // Filtrar los últimos 15 días
            },
          },
          {
            $group: {
              _id: '$comment.content', // Agrupar por el contenido del comentario
            },
          },
          {
            $project: {
              _id: 0,
              content: '$_id', // Proyectar solo el contenido del comentario
            },
          },
        ])
        .exec();

      // Topics
      // const topics = await this.test1Model
      //   .aggregate([
      //     { $match: { team_id: teamId } },
      //     { $unwind: '$days' },
      //     { $unwind: '$days.post' },
      //     {
      //       $project: {
      //         _id: 0,
      //         topic: '$days.post.comment.topic',
      //       },
      //     },
      //     {
      //       $match: {
      //         topic: { $exists: true, $nin: ['', 'Sin tema relevante'] },
      //       },
      //     },
      //   ])
      //   .exec();
      // const topicList = topics.map((topic: any) => topic.topic);

      // Cards amount
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
      console.log(short_recommendation);

      const dashboard = {
        pie_chart: pieChart,
        lines_graph: lines,
        data_amount: {
          respuestas_diarias: totalAnswers,
          cantidad_de_retros: retroCount,
          reportes_generados: reportCount,
        },
        short_recommendation: short_recommendation.length
          ? short_recommendation
          : 'There is not enought data.',
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

      if (questionsData.length === 0) return [];

      const preguntas = questionsData[0].questions.map(
        (question) => question.content,
      );

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

      // Obtener recomendaciones del modelo de OpenAI
      const client = new openai.OpenAI({ apiKey: this.openaiApiKey });
      const response = await client.chat.completions.create({
        messages: [{ role: 'system', content: prompt }],
        model: 'gpt-3.5-turbo',
        temperature: 0.8, // Ajusta este valor según lo que desees, valores típicos están en el rango de 0.1 a 1.0
      });
      console.log(response);

      const recommendationText = response.choices[0].message.content.trim();
      console.log(
        'Texto de la recomendación antes del procesamiento:',
        recommendationText,
      ); // Agregar esta línea para imprimir el texto antes de procesarlo

      // Formatear recomendaciones
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

      // Guardar recomendaciones en la base de datos
      await this.recommendationModel.insertMany({
        team_id: teamId,
        date: moment().startOf('day').toDate(),
        kind: 'daily',
        answers: data[0].answers, // Aquí debes especificar de dónde vienen las respuestas
        content: JSON.stringify(formattedRecommendations), // Convertir a cadena de texto
      });

      return formattedRecommendations;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
