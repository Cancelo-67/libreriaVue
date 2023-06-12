<template>
  <div class="popup" v-if="goodPopup">
    <div class="popup-content">
      <h2>Usuario eliminado</h2>
      <p>La casa de las hojas se despide de {{ user.nombreusuario }}</p>
    </div>
  </div>
  <div class="profile">
    <div class="profile-header">
      <h2>Editar perfil</h2>
    </div>
    <div class="profile-form">
      <form @submit.prevent="updateUser">
        <div class="form-group">
          <label for="nombre">Nombre:</label>
          <input type="text" v-model="updatedUser.nombre" id="nombre" />
        </div>
        <div class="form-group">
          <label for="apellido">Apellido:</label>
          <input type="text" v-model="updatedUser.apellido" id="apellido" />
        </div>
        <div class="form-group">
          <label for="email">Correo electrónico:</label>
          <input type="email" v-model="updatedUser.email" id="email" />
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">Guardar cambios</button>
          <button @click="deleteAccount" class="btn btn-danger">
            Eliminar cuenta
          </button>
        </div>
      </form>
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
      user: {},
      updatedUser: {},
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
        this.updatedUser = { ...this.user };
      } catch (error) {
        console.log(error);
      }
    },
    async updateUser() {
      try {
        await axios.put(
          `https://libreria-node-production.up.railway.app/api/usuarios/${this.userId}`,
          this.updatedUser
        );
        alert("Perfil actualizado correctamente");
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

.profile-header {
  text-align: center;
  margin-bottom: 20px;
}

.profile-header h2 {
  font-size: 24px;
}

.profile-form {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 10px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 5px;
}

.form-actions {
  margin-top: 20px;
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
