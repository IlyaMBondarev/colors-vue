<template>
  <div>
    <Slider/>
    <div class="catalog container">
      <Filters/>
      <CatalogMain/>
    </div>
  </div>
</template>

<script>
import Slider from '@/components/Slider';
import Filters from '@/components/Filters';
import CatalogMain from '@/components/CatalogMain';

export default {
  name: 'Catalog',
  components: {
    Slider,
    Filters,
    CatalogMain
  }
}
</script>
