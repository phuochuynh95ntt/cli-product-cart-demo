<template>
  <div class="home">
    <div class="splash-container">
        <div class="splash">
          <h1>Splendid Food</h1>
        </div>
      </div>

      <main class="wrapper">

        <h2>Recommended</h2>

        <div class="recommended">
          <ProductCart
            v-for="(product, index) in $store.state.products.slice(0, 3)"
            v-bind:key="product.id"
            class="card"
            v-bind:index="index"
            :product="product"
          />
        </div>

      </main>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import ProductCart from '@/components/ProductCart.vue'

@Options({
  components: {
    ProductCart
  }
})

export default class HomeView extends Vue {
}
</script>
