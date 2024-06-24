<<template>
  <div class="products-home">
    <h1>Fahrräder</h1>
    <div class="search-container">
      <input
          v-model="searchQuery"
          placeholder="Suche nach einem Produkt..."
          class="input-field"
      />
    </div>
    <div class="filter-container">
      <select v-model="sortKey" @change="sortProducts">
        <option value="name">Name</option>
        <option value="preis">Preis</option>
      </select>
      <select v-model="sortOrder" @change="sortProducts">
        <option value="asc">Aufsteigend</option>
        <option value="desc">Absteigend</option>
      </select>
    </div>
    <ul>
      <li v-for="product in filteredProducts" :key="product.id">
        {{ product.name }} - {{ product.beschreibung }} - {{ product.preis }} €
      </li>
    </ul>
    <p v-if="filteredProducts.length === 0">Kein Produkt gefunden</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      sortKey: 'name',
      sortOrder: 'asc',
      items: [],
      filteredProducts: []
    };
  },
  methods: {
    filterProducts() {
      let result = this.items;
      if (this.searchQuery) {
        const lowerCaseQuery = this.searchQuery.toLowerCase();
        result = result.filter(product => {
          return (
              product.name.toLowerCase().includes(lowerCaseQuery) ||
              product.beschreibung.toLowerCase().includes(lowerCaseQuery) ||
              product.preis.toString().includes(lowerCaseQuery)
          );
        });
      }
      this.sortProducts(result);
    },
    sortProducts(result = this.filteredProducts) {
      result.sort((a, b) => {
        let modifier = 1;
        if (this.sortOrder === 'desc') modifier = -1;
        if (a[this.sortKey] < b[this.sortKey]) return -1 * modifier;
        if (a[this.sortKey] > b[this.sortKey]) return 1 * modifier;
        return 0;
      });
      this.filteredProducts = result;
    }
  },
  watch: {
    searchQuery() {
      this.filterProducts();
    },
    sortKey() {
      this.sortProducts();
    },
    sortOrder() {
      this.sortProducts();
    }
  },
  async mounted() {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/anzeigen/`);
      if (response.ok) {
        this.items = await response.json();
        this.filterProducts(); // Filter und Sortierung nach dem Laden
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
.search-container, .filter-container {
  margin-bottom: 20px;
  text-align: center;
}
.input-field, select {
  padding: 8px;
  margin-right: 10px;
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