import AnswerDto from './AnswerDto';

export default interface QuestionDto {
    id: number;
    type: number;
    text: string;
    answers: Array<AnswerDto>;
    rightAnswer: number;
}