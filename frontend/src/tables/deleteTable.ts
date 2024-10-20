export const deleteTable = async (tableid: number, XAUTHA: string | null) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}tables?tableid=${tableid}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${XAUTHA}`,
      },
    }
  );
  return response;
};
