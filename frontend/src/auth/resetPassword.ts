export async function resetPassword(token: string | null, password: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}users/reset/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        password: password,
      }),
    }
  );
  return await response.json();
}
