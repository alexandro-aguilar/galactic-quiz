import Quiz from './Quiz';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';

export default class GetQuizRepository {
  private readonly client: S3Client;
  private readonly bucket: string;

  constructor() {
    this.client = new S3Client({ region: 'us-east-1' });
    this.bucket = 'com-day-questions';
  }

  async execute(type: number): Promise<void> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: `${type}.json`
    });

    console.log('command', command);

    try {
      const response = await this.client.send(command);
      const file = await response.Body?.transformToString();
      console.log('file', file);
    } catch (error) {
      console.error('Error getting object:', error);
    }
  }
}