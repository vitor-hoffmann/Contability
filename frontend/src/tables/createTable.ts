export const createTable = async (
  name: string | null,
  userid: string | null,
  XAUTHA: string | null
) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}tables`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${XAUTHA}`,
    },
    body: JSON.stringify({
      name: name,
      userId: userid,
    }),
  });
  const data = await response.json();
  return data;
};
