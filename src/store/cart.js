import axios from "axios";

export default {
  state: {
    cart: [],
    count: 0,
    total: 0,
  },
  mutations: {
    setCart(state, cartInfo) {
      cartInfo.cart.forEach(item => {
        state.cart.push(item);
      })
      state.count = cartInfo.count;
      state.total = cartInfo.total;
    },
    updateCart(state, updateInfo) {
      if (updateInfo.func === 'decrement') {
        state.count--;
        state.total -= updateInfo.item.price;
        if (updateInfo.item.count === 1) {
          state.cart.splice(updateInfo.index, 1)
        } else {
          state.cart[updateInfo.index].count--;
        }
      } else if (updateInfo.func === 'increment') {
        state.cart[updateInfo.index].count++;
        state.count++;
        state.total += updateInfo.item.price;
      } else if (updateInfo.func === 'remove') {
        state.count -= updateInfo.item.count;
        state.total -= updateInfo.item.count * updateInfo.item.price;
        state.cart.splice(updateInfo.index, 1)
      } else if (updateInfo.func === 'clear') {
        state.count = 0;
        state.total = 0;
        state.cart.splice(0, state.cart.length);
      } else if (updateInfo.func === 'add') {
        const index = state.cart.findIndex(item => item.id === updateInfo.item.id);
        if (index >= 0) {
          state.cart[index].count++;
        } else {
          updateInfo.item.count = 1;
          state.cart.push(updateInfo.item);
        }
        state.count++;
        state.total += updateInfo.item.price;
      }
    }
  },
  actions: {
    async getCart({commit}) {
      await axios
        .get('/server/cart.json')
        .then(response => {
          const cart = response.data.cartItems;
          const count = response.data.count;
          const total = response.data.total;
          commit("setCart", {cart: cart, count: count, total: total});
        })
        .catch(error => console.log(error));
    },
    updateCart({commit}, updateInfo) {
      commit('updateCart', updateInfo);
    },
  },
  getters: {
    cart: s => s.cart,
    count: s => s.count,
    total: s => s.total
  }
}