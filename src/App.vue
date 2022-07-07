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

  <router-view v-bind:inventory="inventory" :addToCart="addToCart"  v-bind:cart="cart" :removeCartItem="removeItem" />

  <SideBar
    v-if="showSidebar"
    v-bind:toggle="toggleSidebar"
    v-bind:cart="cart"
    :inventory="inventory"
    :removeCartItem="removeItem"
  />
</template>

<script lang="ts">
// @ is an alias to /src
import { Options, Vue } from 'vue-class-component'
import { Product, Cart } from '@/types'
import SideBar from '@/components/SideBar.vue'
import food from './food.json'

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
  inventory: Product[] = food
  cart: Cart[] = []
  showSidebar = false

  addToCart (itemName: string, quantity: number): void {
    const myCart = this.cart.find((p) => p.name === itemName)
    if (!myCart) {
      this.cart.push({
        name: itemName,
        quantity: quantity
      })
    } else {
      myCart.quantity += quantity
    }
  }

  toggleSidebar (): void {
    this.showSidebar = !this.showSidebar
  }

  removeItem (itemName: string): void {
    const myCart = this.cart.find((p) => p.name === itemName)
    if (!myCart) return
    this.cart.splice(this.cart.indexOf(myCart), 1)
  }

  totalQuantity (): number {
    if (!this.cart.length) return 0
    return this.cart.reduce((acc, curr, index) => {
      return acc + curr.quantity
    }, 0)
  }
}
</script>
