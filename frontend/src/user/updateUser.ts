export const updateUser = async (
  id: string | null,
  name: string | null,
  avatar: string | null
) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}users`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      name: name,
      avatar: avatar,
    }),
  });
  const data = await response.json();
  return data;
};
