export function getHash() {
  const hash = window.location.hash;
  let token = "";

  if (!token && hash) {
    token = hash
      .substring(1)
      .split("&")
      .find((elem) => elem.startsWith("access_token"))
      ?.split("=")[1];
  }
  return token;
}
