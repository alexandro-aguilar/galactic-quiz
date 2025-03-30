import Quiz from './Quiz';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import QuizQuestionsDTO from './QuizQuestionsDTO';
import Environment from '../../../utils/Environment';
import { injectable } from 'inversify';
import Repository from '@app/core/domain/repository/Repository';
import { logMethod } from '@app/core/decorators/logMethod';

@injectable()
export default class GetQuizRepository implements Repository<number, Quiz> {
  
  private readonly client: S3Client;
  private readonly bucket: string;

  constructor() {
    this.client = new S3Client({ region: 'us-east-1' });
    this.bucket = Environment.QuizBucket;
  }

  @logMethod()
  async execute(type: number): Promise<Quiz> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: `${type}.json`
    });

    try {
      const response = await this.client.send(command);
      const file = await response.Body?.transformToString() as string;
      const questions: Array<QuizQuestionsDTO> = JSON.parse(file);
      return Quiz.fromObject(questions);
    } catch (error) {
      console.error('Error getting object:', error);
      throw error;
    }
  }
}