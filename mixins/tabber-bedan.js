import {
  mapGetters
} from 'vuex'
export default {
  computed: {
    ...mapGetters('cart', ['total'])
  },
  onShow() {
    uni.setTabBarBadge({
      index: 2,
      text: this.total + '' || ''
    })
  },
  watch: {
    total: {
      handler(newVal) {
        uni.setTabBarBadge({
          index: 2,
          text: newVal + ''
        })
      },
      immediate: true
    }
  }
}
