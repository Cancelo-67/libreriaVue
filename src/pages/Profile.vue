<template>
  <div class="popup" v-if="goodPopup">
    <div class="popup-content">
      <h2>Usuario eliminado</h2>
      <p>La casa de las hojas se despide de {{ user.nombreusuario }}</p>
    </div>
  </div>
  <div class="profile">
    <h1 class="profile-title">Perfil de {{ user.nombreusuario }}</h1>
    <div class="profile-info">
      <p><strong>Nombre:</strong> {{ user.nombre }}</p>
      <p><strong>Apellido:</strong> {{ user.apellido }}</p>
      <p><strong>Correo electrónico:</strong> {{ user.email }}</p>
      <button @click="deleteAccount" class="btn btn-danger">
        Eliminar cuenta
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      userId: localStorage.getItem("userLogued"),
      user: {}, // Agrega una propiedad para almacenar los datos del usuario
      goodPopup: false,
    };
  },
  methods: {
    ...mapMutations(["setLogued"]),
    changeValue() {
      this.setLogued(false);
    },
    async getUser() {
      try {
        const response = await axios.get(
          `https://libreria-node-production.up.railway.app/api/usuarios/${this.userId}`
        );
        this.user = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    deleteAccount() {
      this.goodPopup = true;
      setTimeout(() => {
        axios.delete(
          `https://libreria-node-production.up.railway.app/api/usuarios/${this.userId}`
        );
        this.changeValue();
        this.$router.push("/login");
        localStorage.removeItem("userLogued");
        this.goodPopup = false;
      }, 1800);
    },
  },
  created() {
    this.getUser();
  },
  computed: {
    ...mapState(["logued"]),
  },
};
</script>

<style>
.profile {
  max-width: 600px;
  margin: 69px auto 0;
  padding: 30px;
  background-color: #f8f8f8;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.profile-info {
  margin-top: 20px;
}

.profile-info p {
  margin-bottom: 10px;
}

.profile-info strong {
  font-weight: bold;
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
