<template>
  <header class="top-bar spread">
    <nav class="top-bar-nav">
      <router-link to="/" class="top-bar-link">
        <i class="icofont-spoon-and-fork"></i>
        <span>Home</span>
      </router-link>
      <router-link to="/products" class="top-bar-link">
        <span>Products</span>
      </router-link>
      <router-link to="/past-orders" class="top-bar-link">
        <span>Past Orders</span>
      </router-link>
    </nav>
    <div v-on:click="toggleSidebar" class="top-bar-cart-link">
      <i class="icofont-cart-alt icofont-1x"></i>
      <span>Cart ({{ totalQuantity() }})</span>
    </div>
  </header>

  <router-view />

  <SideBar
    v-if="showSidebar"
    v-bind:toggle="toggleSidebar"
  />
</template>

<script lang="ts">
// @ is an alias to /src
import { Options, Vue } from 'vue-class-component'
import SideBar from '@/components/SideBar.vue'

enum FoodType {
  vegetable,
  fruit,
  meat
}

@Options({
  components: {
    SideBar
  }
})

export default class App extends Vue {
  showSidebar = false

  toggleSidebar (): void {
    this.showSidebar = !this.showSidebar
  }

  totalQuantity (): number {
    return this.$store.getters.getTotalQuantityInCart
  }
}
</script>
