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
          <button @click="saveProduct" class="button save-button">Save</button>
          <button @click="cancelEdit" class="button cancel-button">Cancel</button>
        </div>
        <div v-else>
          {{ product.name }} - {{ product.beschreibung }} - {{ product.preis }} €
          <button @click="editProduct(product)" class="button edit-button">Edit</button>
          <button @click="deleteProduct(product.id)" class="button delete-button">Delete</button>
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
        <button type="submit" class="button add-button"> Hinzufügen</button>
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
@import '../../assets/style.css';

.button {
  background-color: #0c77e3;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;

  margin-left: 0.5rem;
}

.button:hover {
  background-color: #e2e6ea;
  border-color: #dae0e5;
}

.save-button {
  background-color: #28a745;
  border-color: #28a745;
  color: white;
  margin-right: 0.5rem;
}

.save-button:hover {
  background-color: #218838;
  border-color: #19c641;
}

.cancel-button {
  background-color: #dc3545;
  border-color: #dc3545;
  color: white;
}

.cancel-button:hover {
  background-color: #c82333;
  border-color: #bd2130;
}

.add-button {
  background-color: #007bff;
  border-color: #007bff;
  color: white;
}

.add-button:hover {
  background-color: #0069d9;
  border-color: #0062cc;
}

.delete-button {
  background-color: #dc3545;
  border-color: #dc3545;
  color: white;
}

.delete-button:hover {
  background-color: #c82333;
  border-color: #bd2130;
}

.edit-button {
  background-color: #17a2b8;
  border-color: #17a2b8;
  color: white;
}

.edit-button:hover {
  background-color: #138496;
  border-color: #117a8b;
}
</style>

<style scoped>
@import '../../assets/style.css';
</style>