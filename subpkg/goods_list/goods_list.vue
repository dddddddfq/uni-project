<template>
  <view>
    <view class="goods-list">
      <view v-for="(item,i) in goodsList" :key="i" @click="gotoDetail(item)">
        <my-goods :item="item">
        </my-goods>
      </view>

    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        queryObj: {
          // 查询关键词
          query: '',
          // 商品分类Id
          cid: '',
          // 页码值
          pagenum: 1,
          // 每页显示多少条数据
          pagesize: 10
        },
        // 商品列表的数据
        goodsList: [],
        // 总数量，用来实现分页
        total: 0,
        flag: false
      };
    },
    onLoad(options) {
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      this.getGoodslist()

    },
    methods: {
      async getGoodslist(cb) {
        this.flag = true
        let {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        this.flag = false
        cb && cb()
        if (res.meta.status !== 200) return uni.$showMessage()
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
      },
      gotoDetail(item) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      }
    },
    onReachBottom() {
      if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMessage('数据加载完毕!')
      if (this.flag) return
      this.queryObj.pagenum++
      this.getGoodslist()
    },
    onPullDownRefresh() {
      this.queryObj.pagenum = 1
      this.total = 0
      this.goodsList = []
      this.getGoodslist(() => {
        uni.stopPullDownRefresh()
      })
    }
  }
</script>

<style lang="scss">

</style>
