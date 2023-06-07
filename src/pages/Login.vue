<template>
  <div class="popup" v-if="goodPopup">
    <div class="popup-content">
      <h2>Usuario logueado</h2>
      <p>Bienvenido a La casa de las hojas, {{ formData.nombreusuario }}!</p>
    </div>
  </div>
  <div class="popup" v-if="badPopup">
    <div class="popup-content">
      <h2>Usuario incorrecto</h2>
      <p>Vuelva a introducir las credenciales</p>
    </div>
  </div>
  <div class="container">
    <h1>Inicio de Sesion</h1>
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
        <label for="password">Contraseña</label>
        <input
          type="password"
          id="password"
          v-model="formData.contrasena"
          required
        />
      </div>
      <router-link to="/register">
        <p class="btn">¿Aun no tienes cuenta?</p>
      </router-link>
      <button type="submit">Entrar</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      formData: {
        nombreusuario: "",
        contrasena: "",
      },
      users: [],
      goodPopup: false,
      badPopup: false,
    };
  },
  computed: {
    ...mapState(["logued"]),
  },
  methods: {
    ...mapMutations(["setLogued"]),
    changeValue() {
      this.setLogued(true);
    },
    async fetchUsers() {
      try {
        const response = await axios.get("http://localhost:9000/api/usuarios/");
        this.users = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async submitForm() {
      try {
        const userExists = this.users.some(
          (user) => user.nombreusuario === this.formData.nombreusuario
        );
        const passwordExists = this.users.some(
          (user) => user.contrasena === this.formData.contrasena
        );

        console.log(this.formData.contrasena);
        console.log(this.users);
        if (!userExists || !passwordExists) {
          this.badPopup = true;
          setTimeout(() => {
            this.badPopup = false;
          }, 1800);
        } else {
          this.goodPopup = true;
          setTimeout(() => {
            this.goodPopup = false;
            this.changeValue();
            this.$router.push("/");
          }, 2000);
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
  height: 60vh;
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
  border-radius: 10px;
  cursor: pointer;
}

button:hover {
  transition: 0.5s;
  border: none;
  background-color: #0056b3;
  border-radius: 20%;
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
</style>
