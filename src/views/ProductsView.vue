<template>
  <main class="wrapper">
    <h1>Products</h1>

    <div class="card-container">
      <ProductCart
        v-for="(product, index) in inventory"
        v-bind:key="product.id"
        class="card"
        v-bind:index="index"
        :product="product"
        :addToCart="addToCart"
      />
    </div>
  </main>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Component, Prop } from 'vue-property-decorator'
import ProductCart from '@/components/ProductCart.vue'
import { Product } from '@/types'

@Options({
  name: 'ProductsView',
  components: {
    ProductCart
  }
})

export default class ProductsView extends Vue {
  @Prop(Object) readonly inventory: Product[] | undefined
  @Prop({ type: Function }) readonly addToCart!: (itemName: string, quantity: number) => void | undefined
}
</script>
