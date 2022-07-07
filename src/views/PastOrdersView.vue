<template>
    <main class="wrapper">
        <h1>Past Orders</h1>

        <table class="product-table">
          <thead>
            <tr>
              <td><span class="sr-only">Product Image</span></td>
              <td>Product</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Total</td>
              <td><span class="sr-only">Actions</span></td>
            </tr>
          </thead>
          <tbody>
            <!-- because cart here is an object of set key: value, not an array,
            so in the v-for, the first parameter is the value, the second parameter is key, and the lst parameter is running number -->
            <tr v-for="(cartItem, i) in cart"
                v-bind:key="i">
              <td>
                <i :class="itemIcon(cartItem.name)"></i>
            </td>
              <td>{{cartItem.name}}</td>
              <td>${{ getPrice(cartItem.name) }}</td>
              <td class="center">{{cartItem.quantity}}</td>
              <td>${{ getPrice(cartItem.name) * cartItem.quantity }}</td>
              <td class="center">
                <button class="btn btn-light cart-remove" v-on:click="removeCartItem(cartItem.name)">
                      &times;
                </button>
              </td>
            </tr>
          </tbody>
        </table>
    </main>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Component, Prop } from 'vue-property-decorator'
import { Product, Cart } from '@/types'

@Options({
  name: 'PastOrderView',
  components: {
  }
})

export default class PastOrders extends Vue {
    @Prop({ Object }) readonly cart!: Cart[]
    @Prop({ Object }) readonly inventory!: Product[]
    @Prop({ type: Function }) readonly removeCartItem!: (itemName: string) => void | undefined

    getPrice (itemKey: string): number {
      const prod = this.inventory.find((p) => p.name === itemKey)

      if (!prod) return 0
      return prod.price.USD
    }

    itemIcon (itemKey: string) {
      const prod = this.inventory.find((p) => p.name === itemKey)
      if (!prod) return 'icofont-carrot'

      var iconClass = 'icofont-' + prod.icon
      return iconClass
    }

    calculateTotal (): string {
      const total = this.cart.reduce((acc, curr, index) => {
        console.log(curr)
        return acc + curr.quantity * this.getPrice(curr.name)
      }, 0)

      return total.toFixed(2)
    }
}
</script>
