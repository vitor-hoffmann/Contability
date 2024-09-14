"use client";

import { useEffect, useState } from "react";

export default function Index() {
  const [data, setData] = useState<Array<UsersFetch>>([]);
  const [message, setMessage] = useState<string>("Loading...");
  const [enviado, setEnviado] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [payload, setPayload] = useState<Object>();

  interface UsersFetch {
    id: number;
    name: string;
    email: string;
  }

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((response) => setData(response))
      .catch((e) => {
        console.error("Fetch error " + e);
        setMessage("Erro no fetch");
      });
  }, [payload]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fetchPayload = { name, email };
    setPayload(fetchPayload);
    await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fetchPayload),
    })
      .then(() => setEnviado("Criado usuario: " + name + " " + email))
      .catch((e) => console.error("Erro ao enviar usuario: " + e));
  }

  return (
    <div>
      {data?.length > 0 ? (
        data?.map((item) => (
          <p key={item.id}>
            {item.name} - {item.email} - {item.id}
          </p>
        ))
      ) : (
        <p>{message}</p>
      )}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Insira seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          required
        />
        <input
          placeholder="Insira seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
        <button>Criar</button>
      </form>
      {enviado}
      <div>
        <input
          placeholder="Id para deletar"
          type="number"
          max={data.length}
          min={1}
        />
      </div>
    </div>
  );
}
