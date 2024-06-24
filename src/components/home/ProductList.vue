<template>
  <div>
    <h1 class="heading">Fahrräder Liste</h1>
    <ul>
      <li v-for="product in filteredProducts" :key="product.id" class="product-item">
        <div v-if="editingProduct && editingProduct.id === product.id">
          <input
              v-model="editingProduct.name"
              placeholder="Name"
              class="input-field"
          />
          <input
              v-model="editingProduct.beschreibung"
              placeholder="Description"
              class="input-field"
          />
          <input
              v-model="editingProduct.preis"
              type="number"
              placeholder="Price"
              class="input-field"
          />
          <button @click="saveProduct" class="shadow-sm btn btn-outline-success">Speichern</button>
          <button @click="cancelEdit" class="shadow-sm btn btn-outline-danger">Abbrechen</button>
        </div>
        <div v-else>
          {{ product.name }} - {{ product.beschreibung }} - {{ product.preis }} €
          <button @click="editProduct(product)" class="shadow-sm btn btn-success me-1">Bearbeiten</button>
          <button @click="deleteProduct(product.id)" class="shadow-sm btn btn-danger">Löschen</button>
        </div>
      </li>
    </ul>
    <p v-if="filteredProducts.length === 0">Kein Produkt gefunden</p>
    <div class="form-container">
      <h2>Neue Fahrräder hinzufügen</h2>
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
        <button class="shadow-sm btn btn-outline-primary ">Hinzufügen</button>

      </form>
    </div>
  </div>
</template>

<script>
import {RouterLink} from "vue-router";

export default {
  components: {RouterLink},
  data() {
    return {
      searchQuery: "",
      newProduct: {
        name: "",
        beschreibung: "",
        preis: null,
      },
      editingProduct: null,
      products: [],
      filteredProducts: [],
    };
  },
  methods: {
    filterProducts() {
      const lowerCaseQuery = this.searchQuery.toLowerCase();
      this.filteredProducts = this.products.filter(product => {
        return (
            product.name.toLowerCase().includes(lowerCaseQuery) ||
            product.beschreibung.toLowerCase().includes(lowerCaseQuery) ||
            product.preis.toString().includes(lowerCaseQuery)
        );
      });
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
    editProduct(product) {
      this.editingProduct = { ...product };
    },
    async saveProduct() {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/anzeigen/${this.editingProduct.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.editingProduct),
        });
        const updatedProduct = await response.json();
        const index = this.products.findIndex(p => p.id === updatedProduct.id);
        this.products.splice(index, 1, updatedProduct);
        this.editingProduct = null;
        this.filterProducts();
      } catch (error) {
        console.error("Error saving product:", error);
      }
    },
    cancelEdit() {
      this.editingProduct = null;
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
        console.log("Geladene Produkte:", products);
        this.products = products;
        this.filterProducts();
      } catch (error) {
        console.error("Error loading products:", error);
      }
    }
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
.product-item {
  margin-bottom: 1rem;
}
.input-field {
  margin-right: 1rem;
}
.button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}
.save-button {
  background-color: #28a745;
  color: white;
}
.cancel-button {
  background-color: #dc3545;
  color: white;
}
.edit-button {
  background-color: #007bff;
  color: white;
}
.delete-button {
  background-color: #dc3545;
  color: white;
}
.add-button {
  background-color: #007bff;
  color: white;
}

</style>

<style scoped>
.heading {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.form-container {
  margin-top: 2rem;
}
</style>