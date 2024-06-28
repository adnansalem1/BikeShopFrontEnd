// src/i18n.ts
import { createI18n } from 'vue-i18n';

const messages = {
    en: {
        message: {
            home: 'Home',
            products: 'Products',
            darkMode: 'Dark Mode',
            searchProduct: 'Search for a product...',
            sortBy: 'Sort by',
            order: 'Order',
            ascending: 'Ascending',
            descending: 'Descending',
            noProductsFound: 'No products found',
            name: 'Name',
            description: 'Description',
            price: 'Price',
            addProduct: 'Add Product',
            save: 'Save',
            cancel: 'Cancel',
            edit: 'Edit',
            delete: 'Delete',
            productAdded: 'Product successfully added!',
            productUpdated: 'Product successfully updated!',
            productDeleted: 'Product successfully deleted!',
            editingCanceled: 'Editing successfully cancelled!',
            addNewProduct: 'Add New Product',
            message: 'Message',
            newProduct: 'New Product'
        }
    },
    de: {
        message: {
            home: 'Startseite',
            products: 'Produkte',
            darkMode: 'Dunkelmodus',
            searchProduct: 'Nach einem Produkt suchen...',
            sortBy: 'Sortieren nach',
            order: 'Reihenfolge',
            ascending: 'Aufsteigend',
            descending: 'Absteigend',
            noProductsFound: 'Kein Produkt gefunden',
            name: 'Name',
            description: 'Beschreibung',
            price: 'Preis',
            addProduct: 'Produkt hinzufügen',
            save: 'Speichern',
            cancel: 'Abbrechen',
            edit: 'Bearbeiten',
            delete: 'Löschen',
            productAdded: 'Produkt erfolgreich hinzugefügt!',
            productUpdated: 'Produkt erfolgreich aktualisiert!',
            productDeleted: 'Produkt erfolgreich gelöscht!',
            editingCanceled: 'Bearbeitung erfolgreich abgebrochen!',
            addNewProduct: 'Neues Produkt hinzufügen',
            message: 'Nachricht',
            newProduct: 'Neues Produkt'
        }
    }
};

const i18n = createI18n({
    locale: 'de',
    fallbackLocale: 'en',
    messages,
});

export default i18n;