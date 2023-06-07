<template>
  <nav class="navbar">
    <div class="navbar-logo">
      <img class="img-logo" src="../images/logo.png" alt="Logo" />
    </div>
    <div class="navbar-icons">
      <!-- Usuario logueado -->
      <router-link v-if="logued" to="/profile" class="navbar-icon">
        <i class="fas fa-user"></i>
      </router-link>
      <router-link v-if="logued" to="/cart" class="navbar-icon">
        <i class="fas fa-shopping-cart"></i>
      </router-link>
      <router-link v-if="logued" to="/login" class="navbar-icon">
        <i @click="logOut" class="fa-solid fa-right-from-bracket"></i>
      </router-link>
      <!-- Usuario no logueado -->
      <router-link v-if="!logued" to="/login" class="login">
        <p>Iniciar sesion</p>
      </router-link>
      <router-link v-if="!logued" to="/register" class="register">
        <p>Registrarse</p>
      </router-link>
    </div>
  </nav>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import "@fortawesome/fontawesome-free/css/all.css";
export default {
  methods: {
    ...mapMutations(["setLogued"]),
    changeValue() {
      this.setLogued(false);
    },
    logOut() {
      this.changeValue();
      this.$router.push("/");
    },
  },
  computed: {
    ...mapState(["logued"]),
  },
};
</script>

<style scoped>
.register {
  text-decoration: none;
  color: inherit;
  font-size: 20px;
  padding: 0.3rem 0.7rem;
}
.register:hover {
  transition: 0.5s;
  color: white;
  background-color: #4a4646;
  border-radius: 10%;
}
.login {
  text-decoration: none;
  color: inherit;
  font-size: 20px;
  padding: 0.3rem 0.7rem;
}
.login:hover {
  transition: 0.5s;
  color: white;
  background-color: #4a4646;
  border-radius: 10%;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f1f1f1;
}

.img-logo {
  width: 150px;
}

.navbar-icons {
  width: 21%;
  margin-left: 10px;
  font-size: 50px;
  display: flex;
  justify-content: space-around;
}

.navbar-icon {
  margin-left: 10px;
  color: #000;
  /* Estilos para los iconos */
}
</style>
