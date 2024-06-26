import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ProductHome from '@/components/ProductHome.vue';

describe('ProductHome.vue', () => {
    it('sollte Produkte basierend auf dem Suchquery filtern', async () => {
        const wrapper = mount(ProductHome, {
            data() {
                return {
                    searchQuery: 'bike',
                    items: [
                        { id: 1, name: 'Mountain Bike', beschreibung: 'Robustes Mountainbike', preis: 500 },
                        { id: 2, name: 'City Bike', beschreibung: 'Komfortables Stadtfahrrad', preis: 300 }
                    ]
                };
            }
        });
        await wrapper.vm.filterProducts();
        expect(wrapper.vm.filteredProducts).toHaveLength(1);
        expect(wrapper.vm.filteredProducts[0].name).toBe('Mountain Bike');
    });
});

describe('ProductHome.vue', () => {
    it('sollte ein neues Produkt zur Liste hinzufügen', async () => {
        const wrapper = mount(ProductHome, {
            data() {
                return {
                    newProduct: { name: 'Speed Bike', beschreibung: 'Schnelles Rennrad', preis: 900 },
                    products: []
                };
            }
        });
        await wrapper.vm.addProduct();
        expect(wrapper.vm.products).toHaveLength(1);
        expect(wrapper.vm.products[0].name).toBe('Speed Bike');
    });
});

describe('ProductHome.vue', () => {
    it('sollte ein bestehendes Produkt aktualisieren', async () => {
        const wrapper = mount(ProductHome, {
            data() {
                return {
                    products: [{ id: 1, name: 'Touring Bike', beschreibung: 'Langlebiges Tourenrad', preis: 700 }],
                    editingProduct: { id: 1, name: 'Touring Bike', beschreibung: 'Sehr langlebiges Tourenrad', preis: 800 }
                };
            }
        });
        await wrapper.vm.saveProduct();
        expect(wrapper.vm.products[0].beschreibung).toBe('Sehr langlebiges Tourenrad');
        expect(wrapper.vm.products[0].preis).toBe(800);
    });
});

describe('ProductHome.vue', () => {
    it('sollte ein Produkt aus der Liste entfernen', async () => {
        const wrapper = mount(ProductHome, {
            data() {
                return {
                    products: [
                        { id: 1, name: 'Mountain Bike', beschreibung: 'Robustes Mountainbike', preis: 500 },
                        { id: 2, name: 'City Bike', beschreibung: 'Komfortables Stadtfahrrad', preis: 300 }
                    ]
                };
            }
        });
        await wrapper.vm.deleteProduct(1);
        expect(wrapper.vm.products).toHaveLength(1);
        expect(wrapper.vm.products[0].id).toBe(2);
    });
});

describe('ProductHome.vue', () => {
    it('sollte die Suchanfrage ändern und Filter anwenden', async () => {
        const wrapper = mount(ProductHome, {
            data() {
                return {
                    searchQuery: '',
                    items: [{ id: 1, name: 'Road Bike', beschreibung: 'Schnelles Straßenrad', preis: 1200 }]
                };
            }
        });
        await wrapper.setData({ searchQuery: 'Road' });
        await wrapper.vm.filterProducts();
        expect(wrapper.vm.filteredProducts).toHaveLength(1);
        expect(wrapper.vm.filteredProducts[0].name).toBe('Road Bike');
    });
});

