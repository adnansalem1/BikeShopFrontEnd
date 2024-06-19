<template>
  <div>
    <h1>Product List</h1>
    <div>
      <label for="search">Search:</label>
      <input type="text" id="search" v-model="searchTerm" @input="filterProducts" />
    </div>
    <ul v-if="filteredProducts.length > 0">
      <li v-for="product in filteredProducts" :key="product.id">
        {{ product.name }} - {{ product.preis }}€
      </li>
    </ul>
    <p v-else>No products found.</p>
    <div>
      <h2>Add Product</h2>
      <form @submit.prevent="addProduct">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="newProduct.name" required />
        <label for="beschreibung">Description:</label>
        <input type="text" id="beschreibung" v-model="newProduct.beschreibung" required />
        <label for="preis">Price:</label>
        <input type="number" id="preis" v-model="newProduct.preis" required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      searchTerm: "",
      newProduct: {
        name: "",
        beschreibung: "",
        preis: 0
      }
    };
  },
  computed: {
    filteredProducts() {
      if (this.searchTerm === "") {
        return this.products;
      } else {
        return this.products.filter(product =>
            product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }
    }
  },
  methods: {
    filterProducts() {
      // Trigger the computed property to recompute the filtered products
      this.filteredProducts;
    },
    addProduct() {
      const endpoint = `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/anzeigen`;
      axios.post(endpoint, this.newProduct)
          .then(response => {
            console.log('Product added successfully:', response.data);
            this.products.push(response.data);
            this.newProduct = { name: "", beschreibung: "", preis: 0 };
          })
          .catch(error => {
            console.error('Error adding product:', error);
          });
    },
    loadProducts() {
      const endpoint = `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/anzeigen`;
      axios.get(endpoint)
          .then(response => {
            this.products = response.data;
          })
          .catch(error => {
            console.error('Error loading products:', error);
          });
    }
    submitForm() {
      axios.post('http://localhost:8080/anzeigen', this.product)
          .then(response => {
            alert('Produkt hinzugefügt!');
            console.log(response.data);
          })
          .catch(error => {
            console.error('Es gab einen Fehler beim Senden der Daten:', error);
          });
  },
  mounted() {
    this.loadProducts();
  }
};
</script>

<style scoped>
.header {
  line-height: 1.5;
  max-height: 100vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 100px;
}

html, body {
  background-color: #90ee90; /* Light green */
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>