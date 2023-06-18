<template>
  <div class="error-container">
    <h1 class="animated bounce">404</h1>
    <p class="animated fadeIn">
      ¡Oops! La página que estás buscando no se encuentra.
    </p>
    <router-link to="/" class="animated fadeIn"
      >Volver a la página de inicio</router-link
    >
  </div>
</template>

<style>
.error-container {
  text-align: center;
  margin-top: 100px;
}

h1 {
  font-size: 72px;
}

p {
  font-size: 24px;
  margin-bottom: 30px;
}

.router-link {
  font-size: 18px;
}

.animated {
  animation-duration: 1s;
}

.bounce {
  animation-name: bounce;
}

.fadeIn {
  animation-name: fadeIn;
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
