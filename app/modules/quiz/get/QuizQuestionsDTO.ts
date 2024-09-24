export default interface QuizQuestionsDTO {
  id: number,
  text: string,
  type: number,
  answers: [
    {
      id: number,
      text: string
    },
    {
      id: number,
      text: string
    }
  ],
  rightAnswer: number
}