<template>
  <div>
    <div v-if="dataBook" class="book-item">
      <div class="book-content">
        <div class="book-image">
          <img :src="dataBook.imagen" alt="" class="img-fluid" />
        </div>
        <div class="book-details">
          <h2>{{ dataBook.titulo }}</h2>
          <hr class="divider" />
          <p class="description">{{ dataBook.descripcion }}</p>
          <!-- Botones -->
          <div class="buttons">
            <div v-if="dataBook.cantidad <= 0">
              <p class="outStock">Fuera de Stock</p>
              <button class="buy-button" disabled>Comprar</button>
              <button class="buy-button" disabled>Añadir a carrito</button>
            </div>
            <div v-else="dataBook.cantidad > 10">
              <p class="stock">En Stock</p>
              <button class="buy-button">Comprar</button>
              <button class="buy-button">Añadir a carrito</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getBooks from "../helper/getBooks";

export default {
  data() {
    return {
      dataBook: null,
    };
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    async fetchBooks() {
      const bookId = this.$route.params.id;
      const url = `https://libreria-node-production.up.railway.app/api/libros/${bookId}`;
      getBooks(url).then((data) => {
        this.dataBook = data;
      });
    },
  },
};
</script>

<style scoped>
.stock {
  color: green;
}
.outStock {
  color: red;
}
.book-item {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
}

.book-item .book-content {
  display: flex;
  align-items: center;
}

.book-item img {
  width: 200px;
  margin-right: 20px;
}

.book-item .book-details {
  flex: 1;
}

.book-item h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.book-item .divider {
  border-top: 1px solid #ccc;
  margin-bottom: 10px;
}

.book-item p {
  margin-bottom: 10px;
}

.book-item .buttons {
  display: flex;
  align-items: center;
}

.book-item .buy-button {
  background-color: #3ed440;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}

.book-item .buy-button:disabled {
  background-color: #ff0000;
  cursor: not-allowed;
}
.description {
  width: 50%;
}
</style>
