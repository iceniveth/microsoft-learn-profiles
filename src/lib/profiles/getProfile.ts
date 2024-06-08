export default async function getProfile(username: string) {
  const response = await fetch(
    `https://learn.microsoft.com/api/profiles/${username}`
  );
  const profile = (await response.json()) as {
    userId: string;
    userName: string;
    displayName: string;
  };
  return profile;
}
