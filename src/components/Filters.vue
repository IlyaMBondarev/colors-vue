<template>
  <aside class="filters" :class="$store.state.active === 'filter' ? 'active' : ''">
    <div class="filters__closer" @click="closeFilters()"><span></span></div>
    <div class="filter" :class="filters.includes('new') ? 'filter__on' : ''" @click="updateFilters('new')">
      <div class="filter__switcher"></div>
      <span class="filter__name">Новинки</span>
    </div>
    <div class="filter" :class="filters.includes('available') ? 'filter__on' : ''" @click="updateFilters('available')">
      <div class="filter__switcher"></div>
      <span class="filter__name">Есть в наличии</span>
    </div>
    <div class="filter" :class="filters.includes('contract') ? 'filter__on' : ''" @click="updateFilters('contract')">
      <div class="filter__switcher"></div>
      <span class="filter__name">Контрактные</span>
    </div>
    <div class="filter" :class="filters.includes('exclusive') ? 'filter__on' : ''" @click="updateFilters('exclusive')">
      <div class="filter__switcher"></div>
      <span class="filter__name">Эксклюзивные</span>
    </div>
    <div class="filter" :class="filters.includes('sale') ? 'filter__on' : ''" @click="updateFilters('sale')">
      <div class="filter__switcher"></div>
      <span class="filter__name">Распродажа</span>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'filters',
  data: () => ({
    filters: [],
  }),
  methods: {
    closeFilters() {
      this.$store.commit("setActive", '');
    },
    updateFilters(filter) {
      this.closeFilters();
      this.filters.includes(filter) ?
          this.filters = this.filters.filter(a => a !== filter) :
          this.filters.push(filter);
      this.$store.commit("filterProducts", this.filters);
      this.$store.commit('sortProducts', this.$store.state.sort);
    }
  }
}
</script>