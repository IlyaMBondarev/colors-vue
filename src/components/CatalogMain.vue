<template>
  <div class="catalog__main">
    <Loader v-if="loading"/>
    <div v-else class="catalog__top">
      <p class="catalog__count">{{ amount }} товар{{ ending }}</p>
      <p class="catalog__filters_opener" @click="openFilters()">Фильтры</p>
      <div class="catalog__sort" @click="toggleSort()">
        <p><span>{{ sortType || 'Сортировать по' }}</span> <img src="img/icons/arrow_down.svg" alt=""></p>
        <div class="catalog__sort_list">
          <ul class="catalog__sort_menu" :class="$store.state.active === 'sort' ? 'active' : ''">
            <li :class="sortType === 'Сначала дорогие' ? 'active' : ''" @click="sort('expensive')">Сначала дорогие</li>
            <li :class="sortType === 'Сначала недорогие' ? 'active' : ''" @click="sort('cheap')">Сначала недорогие</li>
            <li :class="sortType === 'Сначала популярные' ? 'active' : ''" @click="sort('popular')">Сначала популярные</li>
            <li :class="sortType === 'Сначала новые' ? 'active' : ''" @click="sort('new')">Сначала новые</li>
          </ul>
        </div>
      </div>
    </div>
    <section class="products">
      <article class="products__item product" v-for="item in productItems">
        <div class="product__image">
          <img :src="'img/products/' + item.src" alt="">
        </div>
        <p class="product__name">
          <router-link to="#">{{ item.title }}</router-link>
        </p>
        <div class="product__bottom">
          <p class="product__price">
            <span>{{ item.price }}</span> ₽
          </p>
          <button class="product__add" @click="updateCart({item: item, func: 'add'})">
            <img src="img/icons/plus.svg" alt="">
          </button>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import Loader from "@/components/app/Loading";

export default {
  name: 'catalog',
  data: () => ({
    sortType: '',
    loading: true,
    ending: 'ов'
  }),
  methods: {
    openFilters() {
      this.$store.commit("setActive", 'filter');
    },
    toggleSort() {
      if (this.$store.state.active === 'sort') {
        this.$store.commit("setActive", '');
      } else {
        this.$store.commit("setActive", 'sort');
      }
    },
    sort(typeOfSort) {
      if (typeOfSort === 'expensive') {
        this.sortType = 'Сначала дорогие';
      } else if (typeOfSort === 'cheap') {
        this.sortType = 'Сначала недорогие';
      } else if (typeOfSort === 'popular') {
        this.sortType = 'Сначала популярные';
      } else if (typeOfSort === 'new') {
        this.sortType = 'Сначала новые';
      }
      this.$store.commit('sortProducts', typeOfSort);
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
    await this.$store.dispatch("getProducts");
    this.ending = this.filterEnding();
    this.loading = false;
  },
  computed: {
    productItems() {
      return this.$store.getters.filteredProducts
    },
    amount() {
      return this.$store.getters.amount
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