<template>
  <!-- PopUp usuario registrado correctamente -->
  <div class="popup" v-if="goodPopup">
    <div class="popup-content">
      <h2>Usuario registrado</h2>
      <p>Usuario registrado correctamente</p>
    </div>
  </div>
  <!-- Usuario no registrado -->
  <div class="popup" v-if="badPopup">
    <div class="popup-content">
      <h2>Usuario no registrado</h2>
      <p>El nombre de usuario o email ya existen</p>
    </div>
  </div>
  <div class="container">
    <h1>Registro de Usuario</h1>
    <form @submit.prevent="submitForm">
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
        <input type="text" id="lastname" v-model="formData.apellido" required />
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
      <router-link to="/login"
        ><p class="btn">¿Ya tienes una cuenta?</p></router-link
      >
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
        apellido: "",
        email: "",
        contrasena: "",
        favoritos: [],
      },
      users: [],
      goodPopup: false,
      badPopup: false,
    };
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
    async submitForm() {
      console.log(this.users);
      try {
        const userExists = this.users.some(
          (user) => user.nombreusuario === this.formData.nombreusuario
        );
        const emailExists = this.users.some(
          (user) => user.email === this.formData.email
        );

        if (userExists || emailExists) {
          this.badPopup = true;
          setTimeout(() => {
            this.badPopup = false;
          }, 1800);
        } else {
          this.goodPopup = true;
          setTimeout(() => {
            this.goodPopup = false;
            axios.post("http://localhost:9000/api/usuarios", this.formData);
            this.$router.push("/login");
          }, 1800);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 76vh;
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
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-content {
  background-color: #fff;
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
}
.question {
  text-decoration: none;
}
</style>
