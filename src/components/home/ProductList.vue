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
    filterProducts() {
      this.filteredProducts = this.products.filter((product) =>
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    addProduct() {
      if (
          this.newProduct.name &&
          this.newProduct.beschreibung &&
          this.newProduct.preis !== null
      ) {
        const newId = this.products.length + 1;
        this.products.push({ ...this.newProduct, id: newId });
        this.newProduct.name = "";
        this.newProduct.beschreibung = "";
        this.newProduct.preis = null;
        this.filterProducts();
      }
    },
    deleteProduct(id) {
      this.products = this.products.filter((product) => product.id !== id);
      this.filterProducts();
    },
  },
  mounted() {
    this.filteredProducts = this.products;
  },
};
</script>

<style scoped>
@import './style.css';
</style>