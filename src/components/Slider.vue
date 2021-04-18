<template>
  <div>
    <Loader v-if="loading"/>
    <section v-else class="slider">
      <div class="slider__slides" :style="'margin-left: -' + activeSlide*100 + '%'">
        <article v-for="slide in slides" class="slide">
          <div class="slide__background">
            <img :src="'img/slider_img' + slide.src" alt="">
          </div>
          <div class="slide__main">
            <h2 class="slide__title">{{ slide.title }}</h2>
            <p v-for="content in slide.contents" class="slide__content">{{ content }}</p>
          </div>
        </article>
      </div>
      <div class="slider__nav_dots">
        <button v-for="(slide, index) in slides" :class="index === activeSlide ? 'active' : ''" @click="goTo(index)"></button>
      </div>
      <div class="slider__nav_arrows">
        <img src="img/icons/arrow.svg" alt="" class="slider__arrow slider__arrow_left" @click="toLeft">
        <img src="img/icons/arrow.svg" alt="" class="slider__arrow slider__arrow_right" @click="toRight">
      </div>
    </section>
  </div>
</template>

<script>
import Loader from '@/components/app/Loading'
import axios from 'axios'

export default {
  name: 'slider',
  data: () => ({
    slides: [],
    activeSlide: null,
    loading: true
  }),
  methods: {
    goTo(index) {
      this.activeSlide = index;
    },
    toLeft() {
      if (this.activeSlide === 0) {
        this.activeSlide = this.slides.length - 1;
      } else {
        this.activeSlide--;
      }
    },
    toRight() {
      if (this.activeSlide === this.slides.length - 1) {
        this.activeSlide = 0;
      } else {
        this.activeSlide++;
      }
    }
  },
  mounted() {
    axios
        .get('/server/slides.json')
        .then(response => {
          this.slides = response.data.slides;
          this.activeSlide = 0;
          this.loading = false;
        })
        .catch(error => console.log(error));
  },
  components: {
    Loader
  }
}
</script>