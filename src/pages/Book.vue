<template>
  <div class="popup" v-if="popup">
    <div class="popup-content">
      <h2><strong>Libro añadido al carrito</strong></h2>
    </div>
  </div>
  <div class="star" v-if="star">
    <div class="star-content">
      <i class="fa-solid fa-star fa-2xl"></i>
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
          <ul>
            <li v-for="comment in comments" :key="comment._id">
              <div class="comment-container">
                <span v-if="comment._id !== editCommentId">
                  {{ comment.comentario }}
                </span>
                <span v-else>
                  <textarea
                    v-model="editedComment"
                    rows="2"
                    cols="30"
                  ></textarea>
                  <div>
                    <button @click="saveComment" class="btn btn-primary btn-sm">
                      Guardar cambios
                    </button>
                    <button
                      @click="cancelEdit"
                      class="btn btn-secondary btn-sm"
                    >
                      Cancelar
                    </button>
                  </div>
                </span>
                <div v-if="!editCommentId">
                  <button
                    @click="editComment(comment._id)"
                    v-if="comment.eliminate"
                    class="btn btn-warning btn-sm"
                  >
                    Editar
                  </button>
                  <button
                    @click="eliminateComment(comment._id)"
                    v-if="comment.eliminate"
                    class="btn btn-danger btn-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </li>
          </ul>
          <h3>Deja un comentario</h3>
          <form @submit.prevent="createComment" class="form-comment">
            <textarea
              v-model="newComment"
              rows="2"
              cols="30"
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
      editCommentId: null,
      editedComment: "",
      star: false,
    };
  },
  mounted() {
    this.getBook();
    this.getComments();
  },
  methods: {
    async getBook() {
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
        this.star = true;
        setTimeout(() => {
          this.star = false;
        }, 5000);

        await axios.put(
          `https://libreria-node-production.up.railway.app/api/usuarios/${this.userId}`,
          user
        );
      } catch (error) {
        console.log(error);
      }
    },
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
      try {
        await axios.delete(
          `https://libreria-node-production.up.railway.app/api/comentario/${idComment}`
        );
        this.getComments();
      } catch (error) {
        console.log(error);
      }
    },
    editComment(commentId) {
      this.editCommentId = commentId;
      const comment = this.comments.find(
        (comment) => comment._id === commentId
      );
      this.editedComment = comment.comentario;
    },
    saveComment() {
      const comment = this.comments.find(
        (comment) => comment._id === this.editCommentId
      );
      comment.comentario = this.editedComment;
      this.editCommentId = null;
      this.editedComment = "";
      axios.put(
        `https://libreria-node-production.up.railway.app/api/comentario/${comment._id}`,
        comment
      );
    },
    cancelEdit() {
      this.editCommentId = null;
      this.editedComment = "";
    },
  },
};
</script>

<style scoped>
/* Estilos previos */

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
  z-index: 999;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}
.star {
  display: flex;
  justify-content: end;
  position: fixed;
  top: 100px;
  left: 0;
  width: 90%;
  height: 100%;
  background-color: inherit;
  z-index: 999;
  transition-property: red;
  transition-duration: 1s;
  transition-delay: 2s;
}

.book-item {
  display: flex;
  justify-content: center;
}

.book-content {
  width: 800px;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.book-image {
  width: 40%;
}

.book-image img {
  width: 100%;
  height: auto;
}

.book-details {
  width: 55%;
}

.book-details h2 {
  font-size: 24px;
  margin-top: 0;
}

.divider {
  margin: 20px 0;
}

.description {
  font-size: 16px;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.outStock {
  font-weight: bold;
  color: red;
}

.stock {
  font-weight: bold;
  color: green;
}

.buy-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.comment-container {
  display: flex;
  flex-direction: column;
}
ul {
  padding: 0;
  list-style-type: none;
}

li {
  margin-bottom: 10px;
}
.form-comment {
  margin-bottom: 10%;
}
</style>
