<template>
  <div class="rating">
    <span
      v-for="star in stars"
      :key="star"
      :class="starClass(star)"
      @click="selectRating(star)"
    >
      &#9733;
    </span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      stars: [1, 2, 3, 4, 5],
      selectedRating: 0,
    };
  },
  mounted() {
    this.selectedRating = this.value;
  },
  methods: {
    starClass(star) {
      return {
        selected: star <= this.selectedRating,
      };
    },
    selectRating(star) {
      this.selectedRating = star;
      this.$emit("input", star); // Emitir el evento de actualización de calificación
    },
  },
};
</script>

<style scoped>
.rating {
  font-size: 2rem;
}

.selected {
  color: orange;
}
</style>
