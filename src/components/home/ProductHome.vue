<template>
  <div class="products-home">
    <h1>Produkte</h1>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }} - {{ item.beschreibung }} - {{ item.preis }} €
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  async mounted() {
    try {
      const response = await fetch('http://localhost:8080/anzeigen');
      if (response.ok) {
        this.items = await response.json();
      } else {
        console.error('Fehler beim Laden der Produkte:', response.status);
      }
    } catch (error) {
      console.error('Netzwerkfehler:', error);
    }
  }
};
</script>

<style scoped>
.products-home h1 {
  text-align: center;
  margin-bottom: 20px;
}
.products-home ul {
  list-style: none;
  padding: 0;
}
.products-home li {
  margin: 10px 0;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
}
</style>