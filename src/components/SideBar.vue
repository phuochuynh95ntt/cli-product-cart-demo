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
                        <tr v-for="(cartItem, i) in $store.state.cart" :key="i">
                            <td><i :class="itemIcon(cartItem.name)" class="icofont-3x"></i></td>
                            <td>{{ cartItem.name }}</td>
                            <td>${{ $store.getters.getPrice(cartItem.name) }}</td>
                            <td class="center">{{ cartItem.quantity }}</td>
                            <td>${{ calculateLineTotal(cartItem) }}</td>
                            <td class="center">
                                <button @click="$store.dispatch('HandleRemoveCart', cartItem.name)" class="btn btn-light cart-remove">
                                    &times;
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <p class="center" v-if="!$store.state.cart.length">
                    <em>No items in cart</em>
                </p>
                <div class="spread">
                    <span><strong>Total:</strong> ${{ $store.getters.getTotalAmount.toFixed(2) }} </span>
                    <button class="btn btn-light">Checkout</button>
                </div>
            </div>
        </div>
    </aside>
</template>

<script lang="ts" >
import { Options, Vue } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { Cart } from '@/types'

@Options({
  name: 'SideBar'
})

export default class SideBar extends Vue {
    @Prop({ type: Function }) readonly toggle!: () => void | undefined

    calculateLineTotal (cartItem: Cart): string {
      return (this.$store.getters.getPrice(cartItem.name) * cartItem.quantity).toFixed(2)
    }

    itemIcon (itemKey: string): string {
      return this.$store.getters.getItemIcon(itemKey)
    }
}
</script>
