<template>
  <div class="card">
    <div class="card-title">
      {{ product.name }}
    </div>
    <div class="card-body">
      <i :class="itemIcon(product.icon)"></i>
      <form>
        <div class="row">
          <div class="cell">
            <label>Type:</label>
          </div>
          <div class="cell">
            <em>{{ product.type }}</em>
          </div>
        </div>
        <div class="row">
          <div class="cell">
            <label>Price:</label>
          </div>
          <div class="cell">${{ product.price.USD }}</div>
        </div>
        <div class="row">
          <div class="cell">
            <label>Quantity:</label>
          </div>
          <div class="cell">
            <input type="number" v-model.number="quantity" />
          </div>
        </div>
      </form>
    </div>
    <div class="card-footer">
      <button @click="addToCart(product.name, quantity)" class="btn btn-light">
        Add to cart
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { Cart, Product } from '@/types'

export default class ProductCard extends Vue {
  public quantity = 0
  @Prop(Object) readonly product!: Product
  @Prop(Number) readonly index: number | undefined

  itemIcon (iconName: string) {
    const iconClass = 'icofont-10x icofont-' + iconName
    return iconClass
  }

  addToCart (itemKey:string, quantity: number): void {
    const newCart: Cart = {
      name: itemKey,
      quantity: quantity
    }

    this.$store.dispatch('HandleUpdateCart', newCart)
  }
}
</script>
