import axios from "axios";

// Función para llamar a la API con token de portador en el encabezado
async function getBooks(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return error;
  }
}

export default getBooks;
