export const registerUser = async (data) => {
  const res = await fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  // 🔥 CLAVE: controlar error real
  if (!res.ok) {
    throw new Error(result.message || "Error al registrarse");
  }

  return result;
};