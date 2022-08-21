export default {
  namespaced: true,
  state: state => ({
    // 购物车的数组，用来存储购物车中每个商品的信息对象
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
  }),
  mutations: {
    addToCart(state, goods) {
      let result = state.cart.find(x => x.goods_id === goods.goods_id)
      if (!result) {
        state.cart.push(goods)
      } else {
        result.goods_count++
      }
      this.commit('cart/saveToCart')
    },
    saveToCart(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    updateGoodsState(state, good) {
      let res = state.cart.find(x => x.goods_id === good.goods_id)
      if (res) {
        res.goods_state = good.goods_state
        this.commit('cart/saveToCart')
      }
    },
    updateGoodsCount(state, good) {
      let res = state.cart.find(x => x.goods_id === good.goods_id)
      if (res) {
        res.goods_count = good.goods_count
        this.commit('cart/saveToCart')
      }

    },
    removeGoods(state, good) {
      state.cart = state.cart.filter(x => {
        return x.goods_id !== good.goods_id
      })
      this.commit('cart/saveToCart')
    },
    changeState(state, boolean) {
      state.cart.forEach(x => x.goods_state = boolean)
      this.commit('cart/saveToCart')
    },
    updateAllGoodsState(state, newState) {
      // 循环更新购物车中每件商品的勾选状态
      state.cart.forEach(x => x.goods_state = newState)
      // 持久化存储到本地
      this.commit('cart/saveToCart')
    },

  },

  getters: {
    total(state) {
      let c = 0
      state.cart.forEach(x => c = c + x.goods_count)
      return c
    },
    checkTotal(state) {
      return state.cart.filter(good => good.goods_state).reduce((total, item) => {
        return total += item.goods_count
      }, 0)
    },

    //计算所有商品价格综合
    checkedGoodsAmount(state) {
      return state.cart.filter(good => good.goods_state).reduce((pre, item) => {
        console.log(item)
        return pre += item.goods_count * item.goods_price
      }, 0).toFixed(2)
    },
    stateTotal(state) {
      return state.cart.every(x => x.goods_state == true)
    },
  }
}
