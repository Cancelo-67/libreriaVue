<template>
  <div>
    <div v-for="(item, index) in datos" :key="index">
      <p>{{ item.imagen }}</p>
    </div>
  </div>
</template>

<script>
import getBooks from "../helper/getBooks";

export default {
  data() {
    return {
      datos: null,
    };
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    fetchBooks() {
      const bookId = this.$route.params.id; // Obtener la bookId de los parámetros de ruta
      const url = `http://localhost:9000/api/libros/${bookId}`;
      getBooks(url).then((data) => {
        this.datos = data;
      });
    },
  },
};
</script>

<style scoped></style>
