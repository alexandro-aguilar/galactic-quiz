import Answer from './Answer';
import Question from './Question';
import QuizQuestionsDTO from './QuizQuestionsDTO';

export default class Quiz {
  private _questions: Array<Question>;

  constructor(questions: Array<Question>) {
    this._questions = questions;
  }

  get questions(): Array<Question> {
    return this._questions;
  }

  toJson() {
    return {
      questions: this.questions.map(question => question.toJson())
    }
  }

  static fromJson(rawQuestions: Array<QuizQuestionsDTO>): Quiz {
    const randomQuestions = this.getRandomItemsWithoutRepetition(rawQuestions, 5);
    const questions: Array<Question> = randomQuestions.map(
      question => {
        const answers = question.answers.map(answer => new Answer(answer.id, answer.text));
        return new Question(question.id, question.type, question.text, answers, question.rightAnswer)
      }
    );
    return new Quiz(questions);
  }

  private static getRandomItemsWithoutRepetition(arr: Array<QuizQuestionsDTO>, n: number): Array<QuizQuestionsDTO> {
    if (n > arr.length) {
      throw new Error("Cannot request more items than are in the array");
    }
  
    // Fisher-Yates shuffle
    const shuffled = arr.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, n);
  };
}