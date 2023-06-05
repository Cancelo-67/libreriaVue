import axios from "axios";
// Función para hacer la petición POST
async function getToken() {
  try {
    const data = {
      // Aquí puedes especificar los datos que deseas enviar en el cuerpo de la solicitud
      username: "alejandro",
      password: "alex",
    };

    const response = await axios.post(
      "https://springapilibreria-production.up.railway.app/token",
      {},
      { auth: data }
    );
    return response.data; // Aquí puedes hacer algo con la respuesta recibida
  } catch (error) {
    return error;
  }
}

export default getToken;
