<template>
  <div class="container">
    <h1>Registro de Usuario</h1>
    <form @submit.prevent="submitForm(users)">
      <div class="form-group">
        <label for="username">Nombre de usuario</label>
        <input
          type="text"
          id="username"
          v-model="formData.nombreusuario"
          required
        />
      </div>
      <div class="form-group">
        <label for="name">Nombre</label>
        <input type="text" id="name" v-model="formData.nombre" required />
      </div>
      <div class="form-group">
        <label for="lastname">Apellidos</label>
        <input
          type="text"
          id="lastname"
          v-model="formData.apellidos"
          required
        />
      </div>
      <div class="form-group">
        <label for="email">Correo electrónico</label>
        <input type="email" id="email" v-model="formData.email" required />
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input
          type="password"
          id="password"
          v-model="formData.contrasena"
          required
        />
      </div>
      <button type="submit">Registrarse</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      formData: {
        nombreusuario: "",
        nombre: "",
        apellidos: "",
        email: "",
        contrasena: "",
        favoritos: [],
      },
      users: [],
    };
  },
  computed() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get("http://localhost:9000/api/usuarios/");
        this.users = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async submitForm(users) {
      try {
        if (users === []) {
          axios.post("http://localhost:9000/api/usuarios", this.formData);
        } else {
          if (
            this.users.find(
              (user) => user.nombreusuario === this.formData.nombreusuario
            )
          ) {
            this.$router.push("/login");
          } else {
            console.log("Usuario no creado");
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
}

input {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
