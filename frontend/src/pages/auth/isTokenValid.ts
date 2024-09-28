export const isTokenValid = async (token: string | null) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}auth/validatetoken`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.ok;
};
