// create a function that extracts the username from a url
// example https://learn.microsoft.com/en-us/users/ayeshadaniellesiroy-4510/
// should return ayeshadaniellesiroy-4510
export default function extractUsernameFromUrl(url: string) {
  const urlParts = url.split("/");
  return urlParts[urlParts.length - 2];
}
