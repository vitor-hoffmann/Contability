export function getCookie(name: string): string | null {
  const cookieArr = document.cookie.split(";");

  for (const element of cookieArr) {
    const cookiePair = element.split("=");

    if (name === cookiePair[0].trim()) {
      return cookiePair[1];
    }
  }

  return null;
}
