<template>
  <div class="popup" v-if="popup">
    <div class="popup-content">
      <h2><strong>Libro añadido al carrito</strong></h2>
    </div>
  </div>
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
              <button @click="cart" class="buy-button" disabled>
                Añadir a carrito
              </button>
            </div>
            <div v-else>
              <p class="stock">En Stock</p>
              <button class="buy-button">Comprar</button>
              <button @click="addToCart" class="buy-button">
                Añadir a carrito
              </button>
            </div>
          </div>
          <!-- Comentarios -->
          <h3>Comentarios</h3>
          <ul v-for="comment in comments">
            <li :key="comment._id">
              {{ comment.comentario }}
              <button
                @click="eliminateComment(comment._id)"
                v-if="comment.eliminate"
                class="btn btn-danger btn-sm"
              >
                Eliminar comentario
              </button>
            </li>
          </ul>
          <h3>Deja un comentario</h3>
          <form @submit.prevent="createComment">
            <textarea
              v-model="newComment"
              rows="4"
              cols="50"
              placeholder="Escribe tu comentario"
            ></textarea>
            <button type="submit" class="btn btn-primary">
              Enviar comentario
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import getBooks from "../helper/getBooks";

export default {
  data() {
    return {
      dataBook: null,
      bookId: this.$route.params.id,
      userId: localStorage.getItem("userLogued"),
      amountBooks: 0,
      popup: false,
      newComment: "",
      comments: [],
    };
  },
  mounted() {
    this.fetchBooks();
    this.getComments();
  },
  methods: {
    async fetchBooks() {
      const url = `https://libreria-node-production.up.railway.app/api/libros/${this.bookId}`;
      getBooks(url).then((data) => {
        this.dataBook = data;
      });
    },
    async addToCart() {
      try {
        const response = await axios.get(
          `https://libreria-node-production.up.railway.app/api/usuarios/${this.userId}`
        );

        const user = response.data;
        const existBookBook = user.cart.find(
          (item) => item.title === this.dataBook.titulo
        );
        if (existBookBook) {
          existBookBook.amount++;
        } else {
          user.cart.push({
            title: this.dataBook.titulo,
            image: this.dataBook.imagen,
            price: this.dataBook.precio,
            amount: 1,
          });
        }
        this.popup = true;
        setTimeout(() => {
          this.popup = false;
        }, 1800);
        await axios.put(
          `https://libreria-node-production.up.railway.app/api/usuarios/${this.userId}`,
          user
        );
      } catch (error) {
        console.log(error);
      }
    },
    //Extraer comentarios de la API
    async getComments() {
      this.comments = [];
      const response = await axios.get(
        "https://libreria-node-production.up.railway.app/api/comentario"
      );
      response.data.forEach((comment) => {
        if (comment.id_Libro === this.bookId) {
          this.comments.push(comment);
          if (comment.id_Usuario === this.userId) {
            comment.eliminate = true;
          }
        }
      });
    },
    //Post de los comentarios a la API
    createComment() {
      const goodComment = this.newComment.trim();

      if (goodComment === "") {
        console.log("Comentario vacío");
      } else {
        const createNewComment = {
          id_Usuario: this.userId,
          id_Libro: this.bookId,
          comentario: goodComment,
        };

        axios
          .post(
            "https://libreria-node-production.up.railway.app/api/comentario",
            createNewComment
          )
          .then(() => {
            this.getComments();
            this.newComment = "";
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    async eliminateComment(idComment) {
      axios
        .delete(
          `https://libreria-node-production.up.railway.app/api/comentario/${idComment}`
        )
        .then(() => {
          this.getComments();
        });
    },
  },
};
</script>

<style scoped>
.popup {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.popup-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
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

.stock {
  color: green;
}

.outStock {
  color: red;
}

.description {
  width: 50%;
}

ul {
  list-style-type: none;
}

h3 {
  margin-top: 20px;
  margin-bottom: 10px;
}

form textarea {
  width: 48%;
  padding: 10px;
  margin-bottom: 10px;
}

form button[type="submit"] {
  background-color: #3ed440;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
