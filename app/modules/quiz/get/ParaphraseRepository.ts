import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import QuizQuestionsDTO from './QuizQuestionsDTO';
import Question from './Question';
import Quiz from './Quiz';


export default class ParaphraseRepository {
  private readonly bedrockClient: BedrockRuntimeClient;
  private readonly modelId = 'anthropic.claude-v2';

  constructor() {
    this.bedrockClient = new BedrockRuntimeClient({ region: 'us-east-1' })
  }

  async execute(questions: Array<Question>): Promise<Quiz> {
    const accept = 'application/json';
    const contentType = 'application/json';

    const paraphrasedQuestions = questions.map(async question => {
      const prompt = `Human: Paraphrase the following sentence for use in a quiz application, be as concise as possible.
      <text>
      ${question.text}
      </text>

      Assistant:`;
      const body = {
        prompt,
        max_tokens_to_sample: 4096,
        temperature: 0.5,
        top_k: 250,
        top_p: 0.5,
        stop_sequences: [],
      };

      const command = new InvokeModelCommand({
        body: JSON.stringify(body),
        modelId: this.modelId,
        accept,
        contentType
      });

      const response = await this.bedrockClient.send(command);
      question.text = JSON.parse(response.body.transformToString()).completion;
      return question;
    });
    const response = await Promise.all(paraphrasedQuestions);
    console.log()
    return new Quiz(response);
  }
}