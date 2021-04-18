import axios from "axios";

export default {
  state: {
    sort: '',
    products: [],
    amount: 0,
    filteredProducts: []
  },
  mutations: {
    setProducts(state, products) {
      products.forEach(item => {
        state.products.push(item);
        state.filteredProducts.push(item);
      })
      state.amount = state.filteredProducts.length;
    },
    filterProducts(state, filters) {
      if (filters.length === 0) {
        state.filteredProducts.splice(0, state.filteredProducts.length);
        state.products.forEach(item => {
          state.filteredProducts.push(item);
        })
      } else if (filters.includes('available')) {
        state.filteredProducts = state.products.filter(item => {
          if (item.number <= 0) {
            return false;
          }
          let include = true;
          filters.forEach(filter => {
            if (filter !== 'available' && !(item.types.includes(filter))) {
              include = false;
            }
          })
          return include;
        })
      } else {
        state.filteredProducts = state.products.filter(item => {
          let include = true;
          filters.forEach(filter => {
            if (!(item.types.includes(filter))) {
              include = false;
            }
          })
          return include;
        })
      }
      state.amount = state.filteredProducts.length;
    },
    sortProducts(state, typeOfSort) {
      state.sort = typeOfSort;
      if (typeOfSort === 'expensive') {
        state.filteredProducts.sort((a, b) => a.price < b.price ? 1 : -1);
      } else if (typeOfSort === 'cheap') {
        state.filteredProducts.sort((a, b) => a.price > b.price ? 1 : -1);
      } else if (typeOfSort === 'popular') {
        state.filteredProducts.sort((a) => a.types.includes('exclusive') || a.types.includes('sale') ? 1 : -1);
      } else if (typeOfSort === 'new') {
        state.filteredProducts.sort((a) => a.types.includes('new') ? 1 : -1);
      }
    },
  },
  actions: {
    async getProducts({commit}) {
      await axios
        .get('/server/products.json')
        .then(response => {
          const products = response.data.products;
          commit("setProducts", products);
        })
        .catch(error => console.log(error));
    }
  },
  getters: {
    filteredProducts: s => s.filteredProducts,
    amount: s => s.amount,
  }
}