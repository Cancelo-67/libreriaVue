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
        <select v-model="selectedGenre" class="form-control">
          <option value="">Todos los géneros</option>
          <option value="Ficcion">Ficcion</option>
          <option value="Comic">Comic</option>
          <option value="Informatica">Informatica</option>
          <option value="Albumes Ilustrados">Albumes Ilustrados</option>
          <option value="Literatura y Ficcion">Literatura y Ficcion</option>
          <option value="+14 años">+14 años</option>
        </select>
        <select v-model="selectedYear" class="form-control">
          <option value="">Todos los años</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
        </select>
      </div>
    </div>

    <div class="book-list">
      <div class="book-group">
        <div
          v-for="(item, index) in paginatedBooks"
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

    <div class="pagination">
      <button
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        @click="setCurrentPage(pageNumber)"
        :class="{ active: currentPage === pageNumber }"
        class="page-number"
      >
        {{ pageNumber }}
      </button>
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
      selectedGenre: "",
      selectedYear: "",
      currentPage: 1,
      itemsPerPage: 10,
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
    setCurrentPage(pageNumber) {
      this.currentPage = pageNumber;
    },
  },
  computed: {
    filteredBooks() {
      if (this.searchTerm || this.selectedGenre || this.selectedYear) {
        const searchTermLower = this.searchTerm.toLowerCase();
        return this.books.filter((item) => {
          const matchesSearchTerm =
            item.titulo.toLowerCase().includes(searchTermLower) ||
            item.autor.toLowerCase().includes(searchTermLower);
          const matchesGenre = this.selectedGenre
            ? item.genero.toLowerCase() === this.selectedGenre.toLowerCase()
            : true;
          const matchesYear = this.selectedYear
            ? item.año.toString() === this.selectedYear.toString()
            : true;
          return matchesSearchTerm && matchesGenre && matchesYear;
        });
      } else {
        return this.books;
      }
    },
    totalPages() {
      return Math.ceil(this.filteredBooks.length / this.itemsPerPage);
    },
    paginatedBooks() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredBooks.slice(startIndex, endIndex);
    },
  },
};
</script>

<style scoped>
/* Carousel */

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
}

/* Barra de búsqueda */

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

/* Libros */

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
  flex: 0 0 240px;
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

/* Paginación */

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.page-number {
  font-size: 14px;
  padding: 8px;
  margin: 0 5px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.page-number.active {
  background-color: #ccc;
}
</style>
