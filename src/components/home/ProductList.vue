<template>
  <div>
    <h1 class="heading">Product List</h1>
    <div class="search-container">
      <input
          v-model="searchQuery"
          placeholder="Search for a product..."
          class="input-field"
      />
    </div>
    <ul>
      <li v-for="product in filteredProducts" :key="product.id" class="product-item">
        {{ product.name }} - {{ product.beschreibung }} - {{ product.preis }} €
        <button @click="deleteProduct(product.id)" class="delete-button">Delete</button>
      </li>
    </ul>
    <p v-if="filteredProducts.length === 0">Kein Produkt gefunden</p>
    <div class="form-container">
      <h2>Add New Product</h2>
      <form @submit.prevent="addProduct">
        <input
            v-model="newProduct.name"
            placeholder="Name"
            class="input-field"
            required
        />
        <input
            v-model="newProduct.beschreibung"
            placeholder="Description"
            class="input-field"
            required
        />
        <input
            v-model="newProduct.preis"
            type="number"
            placeholder="Price"
            class="input-field"
            required
        />
        <button type="submit" class="add-button">Add Product</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      newProduct: {
        name: "",
        beschreibung: "",
        preis: null,
      },
      products: [],
      filteredProducts: [],
    };
  },
  methods: {
    filterProducts() {
      console.log("Filtering products based on query:", this.searchQuery);
      const lowerCaseQuery = this.searchQuery.toLowerCase();
      this.filteredProducts = this.products.map(p => ({ ...p })).filter(product => {
        console.log("Checking product:", product);
        return (
            product.name.toLowerCase().includes(lowerCaseQuery) ||
            product.beschreibung.toLowerCase().includes(lowerCaseQuery) ||
            product.preis.toString().includes(lowerCaseQuery)
        );
      });
      console.log("Filtered products:", this.filteredProducts);
    },
    async addProduct() {
      if (
          this.newProduct.name &&
          this.newProduct.beschreibung &&
          this.newProduct.preis !== null
      ) {
        try {
          const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/anzeigen`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.newProduct),
          });
          const addedProduct = await response.json();
          this.products.push(addedProduct);
          this.newProduct.name = "";
          this.newProduct.beschreibung = "";
          this.newProduct.preis = null;
          this.filterProducts();
        } catch (error) {
          console.error("Error adding product:", error);
        }
      }
    },
    async deleteProduct(id) {
      try {
        await fetch(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/anzeigen/${id}`, {
          method: "DELETE",
        });
        this.products = this.products.filter((product) => product.id !== id);
        this.filterProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    },
    async loadProducts() {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/anzeigen`);
        const products = await response.json();
        console.log("Received data:", products);
        this.products = products;
        console.log("Loaded products:", this.products);
        this.filterProducts();
      } catch (error) {
        console.error("Error loading products:", error);
      }
    },
  },
  watch: {
    searchQuery() {
      this.filterProducts();
    },
  },
  async mounted() {
    await this.loadProducts();
  },
};
</script>

<style scoped>
@import './style.css';
</style>