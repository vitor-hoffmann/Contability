export const handleRegister = async (
  email: string,
  password: string,
  name: string,
  avatar: string
) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
      avatar: avatar,
    }),
  });
  return response;
};
