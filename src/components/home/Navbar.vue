<script setup lang="ts">

</script>

<template>
  <header class="header">
    <div class="wrapper">
      <nav>
        <RouterLink to="/ProductList" class="nav-link">Products</RouterLink>
      </nav>
    </div>
  </header>
  <div id="app">
    <ul>
      <li v-for="item in items" :key="item.name">
        {{ item.name }} - {{ item.beschreibung }} - {{ item.preis }} €
      </li>
    </ul>
    <RouterView />
  </div>
</template>

<style scoped>

</style>