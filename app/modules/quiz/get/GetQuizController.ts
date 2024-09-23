import GetQuizRepository from './GetQuizRepository';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import HttpStatusCode from '../../../utils/httpStatusCode';
import Quiz from './Quiz';

export default class GetQuizController {
  constructor(
    private readonly getQuizRepository = new GetQuizRepository()
  ) {}

  async execute(request: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    const type: number = request.pathParameters?.type as unknown as number ?? 1;
    await this.getQuizRepository.execute(1);

    return {
      statusCode: HttpStatusCode.OK,
      body: 'quiz'
    }
  }
}