<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="header">
    <div class="wrapper">
      <nav>
        <RouterLink to="/ProductList" class="nav-link">Products</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.header {
  line-height: 1.5;
  max-height: 100vh;
}

.wrapper {
  margin: 0 auto;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

.nav-link {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

.nav-link:first-of-type {
  border: none;
}

.nav-link.router-link-exact-active {
  color: var(--color-text);
}

.nav-link.router-link-exact-active:hover {
  background-color: transparent;
}

@media (min-width: 1024px) {
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 calc(var(--section-gap) / 2);
  }

  .wrapper {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .nav-link {
    padding: 1rem 1.5rem;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>