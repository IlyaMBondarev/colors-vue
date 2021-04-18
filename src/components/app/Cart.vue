<template>
  <div class="cart" :class="$store.state.active === 'cart' ? 'active' : ''">
    <div class="cart__top">
      <div class="cart__title">Корзина</div>
      <button @click="cartClose()" class="cart__closer"><img src="img/icons/close.svg" alt=""></button>
    </div>
    <Loader v-if="loading"/>
    <div v-else class="cart__main">
      <div class="cart__table-top">
        <p class="cart__count">{{ count }} товар{{ ending }}</p>
        <button @click="updateCart({func: 'clear'})" class="cart__clear">очистить список</button>
      </div>
      <table class="cart__table">
        <tr class="cart__item cart-item" v-for="(item, index) in cartItems">
          <td class="cart-item__image">
            <img :src="'img/products/' + item.src" alt="">
          </td>
          <td class="cart-item__info">
            <router-link to="#" class="cart-item__title">{{ item.title }}</router-link>
            <p class="cart-item__price"><span>{{ item.price }}</span> ₽</p>
          </td>
          <td class="cart-item__decrement">
            <button @click="updateCart({item:item, index:index, func: 'decrement'})"><img src="img/icons/minus.svg" alt=""></button>
          </td>
          <td class="cart-item__count">{{ item.count }}</td>
          <td class="cart-item__increment">
            <button @click="updateCart({item:item, index:index, func: 'increment'})"><img src="img/icons/plus.svg" alt=""></button>
          </td>
          <td class="cart-item__remove">
            <button @click="updateCart({item:item, index:index, func: 'remove'})"><img src="img/icons/close.svg" alt=""></button>
          </td>
        </tr>
      </table>
    </div>
    <div class="cart__bottom">
      <div class="cart__total">
        <p>Итого</p>
        <p class="total">{{ total }}₽</p>
      </div>
      <button class="cart__submit">Оформить заказ</button>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/app/Loading";

export default {
  name: 'cart',
  data: () => ({
    loading: true,
    ending: 'ов'
  }),
  methods: {
    cartClose() {
      this.$store.commit("setActive", '')
    },
    filterEnding() {
      if (this.count % 10 === 1 && Math.floor((this.count % 100)/10) !== 1) {
        return '';
      } else if ((this.count % 10 === 2 || this.count % 10 === 3 || this.count % 10 === 4) && Math.floor((this.count % 100)/10) !== 1) {
        return 'а';
      }
      return 'ов'
    },
    updateCart(updateInfo) {
      this.$store.dispatch('updateCart', updateInfo);
      this.ending = this.filterEnding();
    },
  },
  async mounted() {
    await this.$store.dispatch("getCart");
    this.ending = this.filterEnding();
    this.loading = false;
  },
  computed: {
    cartItems() {
      return this.$store.getters.cart
    },
    count() {
      return this.$store.getters.count
    },
    total() {
      return this.$store.getters.total
    },
  },
  components: {
    Loader
  }
}
</script>