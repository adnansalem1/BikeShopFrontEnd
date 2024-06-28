<template>
  <div class="products-home">
    <h1>{{ $t('message.products') }}</h1>
    <div class="search-container">
      <input
          v-model="searchQuery"
          :placeholder="$t('message.searchProduct')"
          class="form-control"
      />
    </div>
    <div class="filter-container">
      <div class="dropdown" @click="toggleDropdown('sortDropdown')">
        <button class="btn btn-outline-primary dropdown-toggle" type="button" id="sortDropdown" aria-expanded="false">
          {{ $t('message.sortBy') }}
        </button>
        <div class="dropdown-menu" :class="{ show: dropdowns.sortDropdown }" aria-labelledby="sortDropdown">
          <a class="dropdown-item" @click="updateSortKey('name')">{{ $t('message.name') }}</a>
          <a class="dropdown-item" @click="updateSortKey('preis')">{{ $t('message.price') }}</a>
        </div>
      </div>
      <div class="dropdown" @click="toggleDropdown('orderDropdown')">
        <button class="btn btn-outline-primary dropdown-toggle" type="button" id="orderDropdown" aria-expanded="false">
          {{ $t('message.order') }}
        </button>
        <div class="dropdown-menu" :class="{ show: dropdowns.orderDropdown }" aria-labelledby="orderDropdown">
          <a class="dropdown-item" @click="updateSortOrder('asc')">{{ $t('message.ascending') }}</a>
          <a class="dropdown-item" @click="updateSortOrder('desc')">{{ $t('message.descending') }}</a>
        </div>
      </div>
    </div>
    <ul class="list-group">
      <li v-for="product in filteredProducts" :key="product.id" class="list-group-item">
        {{ product.name }} - {{ product.beschreibung }} : {{ product.preis }} €
      </li>
    </ul>
    <p v-if="filteredProducts.length === 0">{{ $t('message.noProductsFound') }}</p>
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
      filteredProducts: [],
      dropdowns: {
        sortDropdown: false,
        orderDropdown: false
      }
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
    },
    updateSortKey(key) {
      this.sortKey = key;
    },
    updateSortOrder(order) {
      this.sortOrder = order;
    },
    toggleDropdown(dropdown) {
      this.dropdowns[dropdown] = !this.dropdowns[dropdown];
      // Close other dropdowns
      for (const key in this.dropdowns) {
        if (key !== dropdown) {
          this.dropdowns[key] = false;
        }
      }
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
      const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/anzeigen`);
      if (response.ok) {
        this.items = await response.json();
        this.filterProducts(); // Filter and sort after loading
      } else {
        console.error('Error loading products:', response.status);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  }
};
</script>

<style scoped>
.products-home {
  max-width: 1800px;
  margin: 0 auto;
  padding: 1rem;
}
h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--main-text-color);
}
.search-container {
  margin-bottom: 1rem;
}
.filter-container {
  margin-bottom: 1rem;
  display: flex;
  gap: 1rem;
}
.list-group-item {
  margin-bottom: 0.5rem;
}
p {
  color: red;
}
.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: none;
  float: left;
  min-width: 10rem;
  padding: 0.5rem 0;
  margin: 0.125rem 0 0;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
}
.dropdown-menu.show {
  display: block;
}
.dropdown-item {
  display: block;
  width: 100%;
  padding: 0.25rem 1.5rem;
  clear: both;
  font-weight: 400;
  color: #212529;
  text-align: inherit;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
}
.dropdown-item:hover {
  color: #fff;
  text-decoration: none;
  background-color: #007bff;
}
.dropdown-item:focus, .dropdown-item:active {
  color: #fff;
  text-decoration: none;
  background-color: #007bff;
}
.dropdown-toggle {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #007bff;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  background-color: transparent;
  border: 1px solid #007bff;
  border-radius: 0.25rem;
}
.dropdown-toggle:hover {
  color: #fff;
  text-decoration: none;
  background-color: #007bff;
}
.dropdown-toggle:focus {
  color: #fff;
  text-decoration: none;
  background-color: #007bff;
}
.dropdown-toggle:active {
  color: #fff;
  text-decoration: none;
  background-color: #007bff;
}

</style>