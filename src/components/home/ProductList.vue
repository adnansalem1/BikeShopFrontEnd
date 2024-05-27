<template>
  <div>
    <h1>Product List</h1>
    <div>
      <label for="search">Search:</label>
      <input type="text" id="search" v-model="searchTerm" @input="filterProducts" />
    </div>
    <ul v-if="filteredProducts.length > 0">
      <li v-for="product in filteredProducts" :key="product.id">
        {{ product.name }} - {{ product.price }}€
      </li>
    </ul>
    <p v-else>No products found.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [
        { id: 1, name: "Bike 1", price: 500 },
        { id: 2, name: "Bike 2", price: 700 },
        { id: 3, name: "Bike 3", price: 900 }
      ],
      searchTerm: ""
    };
  },
  computed: {
    filteredProducts() {
      if (this.searchTerm === "") {
        return [];
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
    }
  }
};
</script>