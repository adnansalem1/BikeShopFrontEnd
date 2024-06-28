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
              placeholder="Beschreibung"
              class="input-field"
          />
          <input
              v-model="editingProduct.preis"
              type="number"
              placeholder="Preis"
              class="input-field"
          />
          <button @click="saveProduct" class="shadow-sm btn btn-outline-success me-1">Speichern</button>
          <button @click="cancelEdit" class="shadow-sm btn btn-outline-danger">Abbrechen</button>
        </div>
        <div v-else>
          {{ product.name }} - {{ product.beschreibung }}: {{ product.preis }} €
          <button @click="editProduct(product)" class="shadow-sm btn btn-outline-success me-1">Bearbeiten</button>
          <button @click="deleteProduct(product.id)" class="shadow-sm btn btn-outline-danger">Löschen</button>
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
            placeholder="Beschreibung"
            class="input-field"
            required
        />
        <input
            v-model="newProduct.preis"
            type="number"
            placeholder="Preis"
            class="input-field"
            required
            min="0"
        />
        <button class="shadow-sm btn btn-outline-primary">Hinzufügen</button>
      </form>
    </div>
    <div aria-live="polite" aria-atomic="true" class="d-flex justify-content-center align-items-center" style="min-height: 200px;">
      <div class="toast-container position-fixed top-50 start-50 translate-middle p-3" style="z-index: 11">
        <div v-if="message" class="toast show" role="alert" aria-live="assertive" aria-atomic="true" ref="toast">
          <div class="toast-header">
            <strong class="me-auto">Nachricht</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div class="toast-body">
            {{ message }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import { Toast } from "bootstrap";  // Import Bootstrap's Toast

export default {
  components: { RouterLink },
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
      message: null,
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
          this.setMessage('Produkt erfolgreich hinzugefügt! ');
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
        this.setMessage('Produkt erfolgreich aktualisiert!');
      } catch (error) {
        console.error("Error saving product:", error);
      }
    },
    cancelEdit() {
      this.editingProduct = null;
      this.setMessage('Bearbeitung erfolgreich abgebrochen!');
    },
    async deleteProduct(id) {
      try {
        await fetch(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/anzeigen/${id}`, {
          method: "DELETE",
        });
        this.products = this.products.filter((product) => product.id !== id);
        this.filterProducts();
        this.setMessage('Produkt erfolgreich gelöscht!');
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
    },
    setMessage(message) {
      this.message = message;

      // Ensure the toast element is available
      this.$nextTick(() => {
        const toastEl = this.$refs.toast;
        if (toastEl) {
          const toast = new Toast(toastEl);
          toast.show();

          // Hide the toast after 3 seconds
          setTimeout(() => {
            toast.hide();
            this.message = null;
          }, 3000);
        } else {
          console.error("Toast element is not found");
        }
      });
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

.heading {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--main-text-color);
}
.form-container {
  margin-top: 2rem;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  padding: 0.5rem;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
}
.input-field {
  margin-right: 1rem;
  color: #495057;
}

.product-item {
  margin-bottom: 1rem;
  color: #495057;
  background-color: #f8f9fb;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border-bottom: 1px solid #ccc;
}
.input-field {
  margin-right: 1rem;
}
.form-container {
  margin-top: 2rem;
}

.toast-container {
  position: fixed;
  border-color: #28a745;
  color: #0c77e3;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.toast {
  background-color: #28a745;
  color: white;
}

.toast-header {
  background-color: #28a745;
  color: white;
}

.toast-body {
  background-color: #28a745;
  color: white;
}

@media (max-width: 576px) {
  .input-field {
    width: 100%;
  }
}

@media (min-width: 576px) {
  .input-field {
    width: 50%;
  }
}

@media (min-width: 768px) {
  .input-field {
    width: 33.33%;
  }
}

@media (min-width: 992px) {
  .input-field {
    width: 25%;
  }
}

@media (min-width: 1200px) {
  .input-field {
    width: 20%;
  }
}
@media (min-width: 1400px) {
  .input-field {
    width: 16.67%;
  }
}

@media (min-width: 1600px) {
  .input-field {
    width: 14.28%;
  }
}

@media (min-width: 1800px) {
  .input-field {
    width: 12.5%;
  }
}
</style>