import ScoreDto from "./ScoreDto";
/**
 * Represents a Score entity with an email and a score value.
 */
export default class Score {

  /**
   * Creates an instance of the Score class.
   * @param email - The email associated with the score.
   * @param score - The numerical score value.
   */
  constructor(
  private email: string, //The email associated with the score.
   private score: number //The numerical score value.
  ){}

  /**
   * Gets the email associated with the score.
   * @returns The email as a string.
   */
  get Email(): string {
    return this.email;
  }

  /**
   * Gets the numerical score value.
   * @returns The score as a number.
   */
  get Score(): number {
    return this.score;
  }
  /**
   * Converts the Score instance to a JSON representation.
   * @returns A `ScoreDto` object containing the email and score.
   */
  toJson(): ScoreDto {
    return {
      email: this.email,
      score: this.score
    }
  }
}