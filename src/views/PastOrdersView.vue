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
            <tr v-for="(quantity, key, i) in cart"
                v-bind:key="i">
              <td>
                <i :class="itemIcon(key)"></i>
            </td>
              <td>{{key}}</td>
              <td>${{ getPrice(key) }}</td>
              <td class="center">{{quantity}}</td>
              <td>${{ getPrice(key) * quantity }}</td>
              <td class="center">
                <button class="btn btn-light cart-remove" v-on:click="remove_cart_item(key)">
                      &times;
                </button>
              </td>
            </tr>
          </tbody>
        </table>
    </main>
</template>

<script>
export default {
  name: 'PastOrderView',
  data () {
    return {
      icon: 'raddish'
    }
  },
  props: ['cart', 'inventory', 'remove_cart_item'],
  methods: {
    getPrice (name) {
      const prod = this.inventory.find((p) => p.name === name)
      return prod.price.USD
    },
    itemIcon (name) {
      const prod = this.inventory.find((p) => p.name === name)
      var iconClass = 'icofont-3x icofont-' + prod.icon
      console.log(prod.icon)
      return iconClass
    },
    calculateTotal () {
      // const names = Object.keys(this.cart)
      // const total = Object.values(this.cart).reduce((acc, curr, index) => {
      //   return acc + (curr * this.getPrice(names[index]))
      // }, 0)

      // each time looping through curr = [key, value]
      const total = Object.entries(this.cart).reduce((acc, curr, index) => {
        console.log(curr)
        return acc + curr[1] * this.getPrice(curr[0])
      }, 0)

      return total.toFixed(2)
    }
  }
}
</script>
