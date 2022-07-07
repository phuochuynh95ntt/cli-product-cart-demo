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
import { Options, Vue } from 'vue-class-component'
import { Component, Prop } from 'vue-property-decorator'
import { Product } from '@/types'

export default class ProductCard extends Vue {
  public quantity = 0
  @Prop(Object) readonly product!: Product
  @Prop({ type: Function }) readonly addToCart!: (itemName: string, quantity: number) => void | undefined
  @Prop(Number) readonly index: number | undefined

  itemIcon (iconName: string) {
    var iconClass = 'icofont-10x icofont-' + iconName
    return iconClass
  }
}
</script>
