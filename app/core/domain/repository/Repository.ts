export default interface Repository<TInput, TOutput> {
  execute(input: TInput): Promise<TOutput>;
}