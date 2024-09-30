export async function activateAccount(token: string | null) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}users/activate?token=${token}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await response.json();
}
