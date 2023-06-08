<template>
  <div class="template_home">
    <div class="carousel">
      <div
        class="slide"
        :class="{ active: currentIndex === index }"
        v-for="(image, index) in images"
        :key="index"
      >
        <img :src="image" alt="Carousel Image" class="img-fluid" />
      </div>
      <div class="carousel-controls">
        <button class="prev btn btn-primary" @click="prevSlide">
          &#x21dc;
        </button>
        <button class="next btn btn-primary" @click="nextSlide">
          &#x21dd;
        </button>
      </div>
    </div>

    <div class="search-bar">
      <div class="input-group">
        <input
          type="text"
          v-model="searchTerm"
          class="form-control"
          placeholder="Buscar libros..."
        />
      </div>
    </div>

    <div class="book-list">
      <div class="book-group">
        <div
          v-for="(item, index) in filteredBooks"
          :key="index"
          class="book-item"
        >
          <img :src="item.imagen" alt="Book Image" class="img-thumbnail" />
          <div class="book-details">
            <p class="title">{{ item.titulo }}</p>
            <p class="author">{{ item.autor }}</p>
            <p class="">{{ item.precio + 0 }}€</p>
            <router-link :to="`/book/${item._id}`" class="navbar-icon">
              <p>Ver más...</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      images: [
        "https://www.popularlibros.com/images/bloques_sliders/168-es-banner_preventa-juegodetronos.webp",
        "https://www.popularlibros.com/images/bloques_sliders/160-es-banner_pua-lorenzo-silva.webp",
        "https://www.popularlibros.com/images/bloques_sliders/164-es-banner_losdestrozos-nuevo.webp",
      ],
      currentIndex: 0,
      books: [],
      searchTerm: "",
      url: "https://libreria-node-production.up.railway.app/api/libros/",
    };
  },
  created() {
    this.getBooks();
  },
  methods: {
    getBooks() {
      axios
        .get(this.url)
        .then((response) => {
          this.books = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    prevSlide() {
      this.currentIndex =
        (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
  },
  computed: {
    filteredBooks() {
      if (this.searchTerm) {
        const searchTermLower = this.searchTerm.toLowerCase();
        return this.books.filter((item) => {
          return (
            item.titulo.toLowerCase().includes(searchTermLower) ||
            item.autor.toLowerCase().includes(searchTermLower)
          );
        });
      } else {
        return this.books;
      }
    },
  },
};
</script>
<style scoped>
/* Carousel*/

.carousel {
  position: relative;
  width: 100%;
  height: 774px;
  overflow: hidden;
}

.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.slide.active {
  opacity: 1;
}

.carousel img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-controls {
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.carousel-controls .prev,
.carousel-controls .next {
  font-size: 24px;
  border-radius: 50%;
  padding: 8px 12px;
} /* Barra de búsqueda */
.search-bar {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.search-bar .input-group {
  width: 100%;
  max-width: 400px;
}

.search-bar input {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border-radius: 4px 0 0 4px;
}

.search-bar .input-group-append {
  display: flex;
}

.search-bar .btn {
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 0 4px 4px 0;
}

/* Libros*/

.book-list {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.book-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
}

.book-item {
  flex: 0 0 calc(25% - 10px);
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.book-item img {
  width: 100%;
  height: auto;
  object-fit: cover;
  margin-bottom: 10px;
}

.title {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
}

.author {
  font-size: 12px;
  color: #555;
}
</style>
