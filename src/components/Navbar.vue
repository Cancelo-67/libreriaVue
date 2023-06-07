<template>
  <nav class="navbar">
    <div class="navbar-logo">
      <router-link to="/">
        <img class="img-logo" src="../images/logo.png" alt="Logo" />
      </router-link>
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
        <i
          class="fa-duotone fa-right-from-bracket"
          style="--fa-primary-color: #000000; --fa-secondary-color: #000000"
        ></i>
      </router-link>
      <!-- Usuario no logueado -->
      <router-link v-if="!logued" to="/login" class="">
        <p>Register</p>
      </router-link>
      <router-link v-if="!logued" to="/login" class="">
        <p>Login</p>
      </router-link>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from "vuex";
import "@fortawesome/fontawesome-free/css/all.css";
export default {
  methods: {
    ...mapActions(["logout"]),
    logout() {
      this.logout();
    },
  },
  computed: {
    ...mapState(["logued"]),
  },
};
</script>

<style scoped>
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
  margin-left: 10px;
  font-size: 50px;
  /* Estilos para el contenedor de los iconos */
}

.navbar-icon {
  margin-left: 10px;
  color: #000;
  /* Estilos para los iconos */
}
</style>
