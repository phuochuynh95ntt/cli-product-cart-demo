<template>
  <main class="wrapper">
    <h1>Products</h1>

    <div class="card-container">
      <ProductCart
            v-for="(product, index) in $store.state.products"
            v-bind:key="product.id"
            class="card"
            v-bind:index="index"
            :product="product"
          />
    </div>
  </main>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import ProductCart from '@/components/ProductCart.vue'

@Options({
  name: 'ProductsView',
  components: {
    ProductCart
  }
})

export default class ProductsView extends Vue {
}
</script>
