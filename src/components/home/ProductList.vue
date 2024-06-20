<template>
  <div>
    <h1 class="heading">Product List</h1>
    <div class="search-container">
      <input
          v-model="searchQuery"
          @input="filterProducts"
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
      products: [
        { id: 1, name: "Product 1", beschreibung: "Description 1", preis: 100 },
        { id: 2, name: "Product 2", beschreibung: "Description 2", preis: 200 },
      ],
      filteredProducts: [],
    };
  },
  methods: {
    async filterProducts() {
      this.filteredProducts = this.products.filter((product) =>
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    async addProduct() {
      if (
          this.newProduct.name &&
          this.newProduct.beschreibung &&
          this.newProduct.preis !== null
      ) {
        try {
          const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/anzeigen`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.newProduct)
          });
          const newProduct = await response.json();
          this.products.push({ ...newProduct, id: newProduct.id });
          this.newProduct.name = "";
          this.newProduct.beschreibung = "";
          this.newProduct.preis = null;
          this.filterProducts();
        } catch (error) {
          console.error('Error adding product:', error);
        }
      }
    },
    async deleteProduct(id) {
      try {
        await fetch(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/anzeigen/${id}`, {
          method: 'DELETE'
        });
        this.products = this.products.filter((product) => product.id !== id);
        this.filterProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    },
    async loadProducts() {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/anzeigen`);
        const products = await response.json();
        this.products = products;
        this.filterProducts();
      } catch (error) {
        console.error('Error loading products:', error);
      }
    }
  },
  mounted() {
    this.loadProducts();
  }
};
</script>

<style scoped>
@import './style.css';
</style>