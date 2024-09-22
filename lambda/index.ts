export const handler = async (event: any) => {
  console.log('First Lambda in Group A triggered');
  return {
    statusCode: 200,
    body: JSON.stringify('First Lambda in Group A Response'),
  };
};