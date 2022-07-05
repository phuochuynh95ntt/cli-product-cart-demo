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
      <span>Cart ({{ totalQuantity }})</span>
    </div>
  </header>

  <router-view v-bind:inventory="inventory" :addToCart="addToCart"  v-bind:cart="cart" :remove_cart_item="removeItem"/>

  <SideBar
    v-if="showSidebar"
    v-bind:toggle="toggleSidebar"
    v-bind:cart="cart"
    :inventory="inventory"
    :remove_cart_item="removeItem"
  />
</template>

<script>
// @ is an alias to /src
import SideBar from '@/components/SideBar.vue'
import food from './food.json'

export default ({
  components: {
    SideBar
  },
  data () {
    return {
      showSidebar: false,
      inventory: food,
      cart: {}
    }
  },
  computed: {
    totalQuantity: {
      get () {
        if (!Object.keys(this.cart).length) return 0
        return Object.values(this.cart).reduce((acc, curr, index) => {
          return acc + curr
        }, 0)
      }
    }
    // totalQuantity() {
    //   if (!Object.keys(this.cart).length) return 0
    //   return Object.values(this.cart).reduce((acc, curr, index) => {
    //     return acc + curr
    //   }, 0)
    // }
  },
  methods: {
    addToCart (name, quantity) {
      // console.log(name, index)
      // if (!this.cart[name]) this.cart[name] = 0
      // this.cart[name] += this.inventory[index].quantity
      // this.inventory[index].quantity = 0
      // console.log(this.cart)
      if (!this.cart[name]) this.cart[name] = 0
      this.cart[name] += quantity
    },
    toggleSidebar () {
      this.showSidebar = !this.showSidebar
    },
    removeItem (name) {
      delete this.cart[name]
    }
  }
})
</script>
