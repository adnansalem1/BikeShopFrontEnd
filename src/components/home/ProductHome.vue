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
        <option class="dropdown btn btn-outline-success" value="name">Name</option>
        <option class="dropdown btn btn-outline-success btn" value="beschreibung">Beschreibung</option>
        <option class="dropdown btn btn-outline-success btn" value="preis">Preis</option>
      </select>
      <select v-model="sortOrder" @change="sortProducts">
        <option class="dropdown btn btn-outline-success btn" value="asc">Aufsteigend</option>
        <option class="dropdown btn btn-outline-success btn" value="desc">Absteigend</option>
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
      const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/anzeigen`) //fetch('http://localhost:8080/anzeigen') // URL anpassen an die eigene Backend-URL und den Endpunkt für die Produkte laden
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
.products-home {
  max-width: 800px;
  margin: 0 auto;
  accent-color: #19c641
  !important;
}
.search-container {
  margin-bottom: 1rem;
  align-items: center;
}
.input-field {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  margin-right: 1rem;
}

.filter-container {
  margin-bottom: 1rem;
  align-items: center;
}

select {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  margin-right: 1rem;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
}
p {
  color: red;
}

</style>