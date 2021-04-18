<template>
  <main class="page">
    <ShadowBlock/>

    <Cart/>
    <header class="header">
      <div class="container">
        <div class="header__row">
          <div class="header__burger">
            <input id="burger" type="checkbox">
            <label for="burger">
              <span></span>
            </label>
            <div class="burger"></div>
          </div>
          <div class="header__left">
            <div class="header__logo">
              <router-link to="#"><img src="img/logo.svg" alt=""></router-link>
            </div>
            <nav class="header__navigation">
              <ul>
                <li><router-link to="#">Продукты</router-link></li>
                <li><router-link to="#">Цвета</router-link></li>
                <li><router-link to="#">Вдохновение</router-link></li>
                <li><router-link to="#">Советы</router-link></li>
                <li><router-link to="#">Найти магазин</router-link></li>
              </ul>
            </nav>
          </div>
          <div class="header__right">
            <div class="header__phone">
              <a href="tel:+74952217769">+7 (495) 221-77-69</a>
              <button class="header__callback_opener">Заказать звонок</button>
            </div>
            <div class="header__personal">
              <ul>
                <li>
                  <button class="header__search_opener"><img src="img/icons/search.svg" alt=""></button>
                </li>
                <li>
                  <button class="header__profile_opener"><img src="img/icons/profile.svg" alt=""></button>
                </li>
                <li>
                  <button class="header__favorites_opener"><img src="img/icons/favorites.svg" alt="">
                  </button>
                </li>
              </ul>
              <button @click="$store.state.active = 'cart'" class="header__cart_opener">{{ $store.getters.count }}</button>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="content">
      <Breadcrumbs/>
      <h2 class="mobile-title container">Краски</h2>

      <router-view/>

    </div>
    <footer class="footer">

    </footer>
  </main>
</template>

<script>
import ShadowBlock from '@/components/app/Shadow';
import Cart from '@/components/app/Cart';
import Breadcrumbs from '@/components/app/Breadcrumbs';

export default {
  name: "main-layout",
  components: {
    ShadowBlock,
    Cart,
    Breadcrumbs
  }
}
</script>