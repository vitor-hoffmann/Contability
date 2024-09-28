export const handleLogin = async (email: string, password: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    return data.token;
  }
};
