export async function recoverAccount(email: string | null) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}users/recover?email=${email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
}
