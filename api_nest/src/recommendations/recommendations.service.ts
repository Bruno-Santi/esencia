import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Survey } from 'src/survey/entities/survey.entity';
import * as ss from 'simple-statistics';
import * as openai from 'openai';

@Injectable()
export class RecommendationsService {
  private readonly openaiApiKey: string; // Your OpenAI API key

  constructor(
    @InjectModel(Survey.name) private readonly surveyModel: Model<Survey>,
  ) {
    this.openaiApiKey = process.env.OPENAI_API_KEY; // Set your OpenAI API key here
  }

  async generateRecommendations(teamId: string): Promise<any> {
    const dataSummary = await this.getSurveyQuestions(teamId);
    return this.generateRecommendationsFromSummary(dataSummary);
  }

  private async getSurveyQuestions(teamId: string): Promise<any> {
    try {
      // Calculate date 15 days ago
      const date15DaysAgo = new Date();
      date15DaysAgo.setDate(date15DaysAgo.getDate() - 15);

      // Search for surveys by team id and date
      const surveys = await this.surveyModel.find({
        team_id: teamId,
        date: { $gte: date15DaysAgo },
      });
      console.log(surveys.length);

      // Extract question values into arrays
      const question1Values = surveys.map((survey) => survey.question1.value);
      const question2Values = surveys.map((survey) => survey.question2.value);
      const question3Values = surveys.map((survey) => survey.question3.value);
      const question4Values = surveys.map((survey) => survey.question4.value);

      // Data Summary
      const dataSummary = {
        question1: this.calculateQuestionSummary(question1Values),
        question2: this.calculateQuestionSummary(question2Values),
        question3: this.calculateQuestionSummary(question3Values),
        question4: this.calculateQuestionSummary(question4Values),
      };

      console.log('Data Summary:', dataSummary);
      return dataSummary;
    } catch (error) {
      console.error('Error calculating data summary:', error);
      throw new Error('Failed to calculate data summary');
    }
  }

  private calculateQuestionSummary(values: number[]): any {
    return {
      mean: ss.mean(values).toFixed(2),
      median: ss.median(values).toFixed(2),
      standardDeviation: ss.standardDeviation(values).toFixed(2),
      min: ss.min(values).toFixed(2),
      max: ss.max(values).toFixed(2),
      variance: ss.variance(values).toFixed(2),
    };
  }

  private async generateRecommendationsFromSummary(
    dataSummary: any,
  ): Promise<string> {
    try {
      const client = new openai.OpenAI({ apiKey: this.openaiApiKey });
      const prompt = this.constructPrompt(dataSummary);
      const response = await client.chat.completions.create({
        messages: [{ role: 'system', content: prompt }],
        model: 'gpt-3.5-turbo',
      });

      return response.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error generating recommendations:', error);
      throw new Error('Failed to generate recommendations');
    }
  }

  private constructPrompt(dataSummary: any): string {
    let prompt = `Basados en la data de las pregunta, aquí hay algunas recomendaciones:\n\n`;

    for (const question in dataSummary) {
      const summary = dataSummary[question];
      prompt += `${question}:\n`;
      prompt += `  Mean: ${summary.mean}\n`;
      prompt += `  Median: ${summary.median}\n`;
      prompt += `  Standard Deviation: ${summary.standardDeviation}\n`;
      prompt += `  Min: ${summary.min}\n`;
      prompt += `  Max: ${summary.max}\n`;
      prompt += `  Variance: ${summary.variance}\n\n`;
    }
    console.log(prompt);
    return prompt;
  }
}

// Todo
//Find Coex, Change Prompt, Add Question Values and Commens.
