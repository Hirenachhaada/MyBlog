import React, { useState } from "react";
export default function RegisterPage() {
  async function register(ev) {
    ev.preventDefault();
    // console.log(username, password);
    const resposne = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (resposne.status === 200) {
      alert("Register success");
    } else {
      alert("Register fail");
    }
  }
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form action="" className="register" onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  );
}
