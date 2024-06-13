export async function GET() {
  await new Promise((resolve) => {
    setTimeout(() => {
      return resolve(true);
    }, 2000);
  });

  console.log('here')

  return new Response(
    JSON.stringify({
      greeting: new Date().getTime(),
    })
  );
};
