export const getUser = async (id: string | null) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}users/getone?userid=${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
};
