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
            <tr v-for="(cartItem, i) in $store.state.cart"
                v-bind:key="i">
              <td>
                <i :class="$store.getters.getItemIcon(cartItem.name)"></i>
            </td>
              <td>{{cartItem.name}}</td>
              <td>${{ $store.getters.getPrice(cartItem.name) }}</td>
              <td class="center">{{cartItem.quantity}}</td>
              <td>${{ calculateLineTotal(cartItem) }}</td>
              <td class="center">
                <button class="btn btn-light cart-remove" v-on:click="$store.dispatch('HandleRemoveCart', cartItem.name)">
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
import { Cart } from '@/types'

@Options({
  name: 'PastOrderView',
  components: {
  }
})

export default class PastOrders extends Vue {
  calculateLineTotal (cartItem: Cart): string {
    return (this.$store.getters.getPrice(cartItem.name) * cartItem.quantity).toFixed(2)
  }
}
</script>
