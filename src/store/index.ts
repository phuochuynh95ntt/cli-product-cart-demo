import { createStore } from 'vuex'
import food from '@/food.json'
import { Product, Cart } from '@/types'

export default createStore({
  state: {
    products: food as Product[],
    cart: new Array<Cart>()
  },
  getters: {
    getTotalQuantityInCart (state): number {
      if (!state.cart.length) return 0
      return state.cart.reduce((acc, curr) => {
        return acc + curr.quantity
      }, 0)
    },
    getTotalAmount: (state) => {
      if (!state.cart.length) return 0
      return state.cart.reduce((acc, curr) => {
        const prod = state.products.find(p => p.name === curr.name)
        if (prod) {
          return acc + (curr.quantity * prod.price.USD)
        }
        return acc
      }, 0)
    },
    getPrice: (state) => (intemKey: string): number => {
      const prod = state.products.find(p => p.name === intemKey)
      if (prod) return prod.price.USD
      return 0
    },
    getItemIcon (state) {
      return function (intemKey: string) {
        const prod = state.products.find(p => p.name === intemKey)
        if (prod) return 'icofont-' + prod.icon
        return 'icofont-carrot'
      }
    }
  },
  mutations: {
    updateCart (state, inputCart: Cart) {
      if (inputCart.quantity < 1.0) return
      const cart = state.cart.find(p => p.name === inputCart.name)
      if (!cart) state.cart.push(inputCart)
      else {
        cart.quantity += inputCart.quantity
      }
    },
    removeCart (state, itemKey: string): void {
      const cartToDelete = state.cart.find((p) => p.name === itemKey)
      if (!cartToDelete) return
      state.cart.splice(state.cart.indexOf(cartToDelete), 1)
    }
  },
  actions: {
    HandleUpdateCart (context, newCart: Cart) {
      context.commit('updateCart', newCart)
    },
    HandleRemoveCart (context, itemKey: string) {
      context.commit('removeCart', itemKey)
    }
  },
  modules: {
  }
})
