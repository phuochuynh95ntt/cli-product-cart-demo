<template>
    <aside class="cart-container">
        <div class="cart">
            <h1 class="cart-title spread">
                <span>
                    Cart
                    <i class="icofont-cart-alt icofont-1x"></i>
                </span>
                <button @click="toggle" class="cart-close">&times;</button>
            </h1>

            <div class="cart-body">
                <table class="cart-table">
                    <thead>
                        <tr>
                            <th><span class="sr-only">Product Image</span></th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Total</th>
                            <th><span class="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(cartItem, i) in cart" :key="i">
                            <td><i :class="itemIcon(cartItem.name)" class="icofont-3x"></i></td>
                            <td>{{ cartItem.name }}</td>
                            <td>${{ getPrice(cartItem.name) }}</td>
                            <td class="center">{{ cartItem.quantity }}</td>
                            <td>${{ getPrice(cartItem.name) * cartItem.quantity }}</td>
                            <td class="center">
                                <button @click="removeCartItem(cartItem.name)" class="btn btn-light cart-remove">
                                    &times;
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <p class="center" v-if="!Object.keys(cart).length">
                    <em>No items in cart</em>
                </p>
                <div class="spread">
                    <!-- <span><strong>Total:</strong> \${{ cartTotal }} </span> equivalent to the below line-->
                    <span><strong>Total:</strong> ${{ calculateTotal() }} </span>
                    <button class="btn btn-light">Checkout</button>
                </div>
            </div>
        </div>
    </aside>
</template>

<script lang="ts" >
import { Options, Vue } from 'vue-class-component'
import { Component, Prop } from 'vue-property-decorator'
import { Product, Cart } from '@/types'

@Options({
  name: 'SideBar'
})

export default class SideBar extends Vue {
    @Prop({ type: Function }) readonly toggle!: () => void | undefined
    @Prop({ Object }) readonly cart!: Cart[]
    @Prop({ Object }) readonly inventory!: Product[]
    @Prop({ type: Function }) readonly removeCartItem!: (itemName: string) => void | undefined
    @Prop(Number) readonly index: number | undefined

    calculateTotal (): string {
      const total = this.cart.reduce((acc, curr, index) => {
        console.log(curr)
        return acc + curr.quantity * this.getPrice(curr.name)
      }, 0)

      return total.toFixed(2)
    }

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
}
</script>
