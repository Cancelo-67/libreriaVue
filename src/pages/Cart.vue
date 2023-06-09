<template>
  <div>
    <h2>Carrito de compras</h2>

    <div v-if="dataUser">
      <div v-for="item in dataUser.cart" :key="item.id" class="cart-item">
        <div class="item-details">
          <h3>{{ item.title }}</h3>
          <img :src="item.image" alt="" />
          <p class="p-amount">Cantidad: {{ item.amount }}</p>
          <p class="p-price">Precio unidad: {{ item.price }}€</p>
        </div>
        <div class="item-actions">
          <button class="btn btn-outline-primary" @click="decreaseAmount(item)">
            -
          </button>
          <button class="btn btn-outline-primary" @click="increaseAmount(item)">
            +
          </button>
          <button class="btn btn-danger" @click="removeCart(item)">
            Eliminar
          </button>
        </div>
      </div>
      <div class="total">
        <p>Total: {{ calculateTotal() }}€</p>
        <button class="btn btn-primary" @click="buy">Realizar compra</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userId: localStorage.getItem("userLogued"),
      dataUser: null,
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    async getUser() {
      try {
        const response = await axios.get(
          `https://libreria-node-production.up.railway.app/api/usuarios/${this.userId}`
        );
        this.dataUser = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async updateCart() {
      try {
        await axios.put(
          `https://libreria-node-production.up.railway.app/api/usuarios/${this.userId}`,
          this.dataUser
        );
      } catch (error) {
        console.log(error);
      }
    },
    decreaseAmount(item) {
      if (item.amount > 1) {
        item.amount--;
        this.updateCart();
      }
    },
    increaseAmount(item) {
      item.amount++;
      this.updateCart();
    },
    removeCart(item) {
      const index = this.dataUser.cart.indexOf(item);
      if (index !== -1) {
        this.dataUser.cart.splice(index, 1);
        this.updateCart();
      }
    },
    calculateTotal() {
      let total = 0;
      for (const item of this.dataUser.cart) {
        total += item.price * item.amount;
      }
      return total;
    },
    buy() {
      console.log("Compra realizada");
    },
  },
};
</script>

<style scoped>
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8%;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
}

.item-details {
  flex: 1;
}

.item-actions button {
  margin-left: 5px;
}

.total {
  margin-top: 20px;
  text-align: right;
}
.p-price {
  font-size: 20px;
}
.p-amount {
  font-size: 20px;
}
</style>
