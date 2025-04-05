/**
 * Represents the data transfer object for a user's score.
 * Contains the user's email and their associated score.
 */
export default interface ScoreDto {
    email: string;
    score: number;
}