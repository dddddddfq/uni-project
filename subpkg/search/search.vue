<template>
  <view>
    <view class="my-search">
      <uni-search-bar radius="19" placeholder="搜索" @confirm="search" @input="input" bgColor="#fff" cancelButton="none"
        focus></uni-search-bar>
    </view>

    <view class="search-list" v-if="kw.trim() !==''">
      <view class="search-item" v-for="(item,i) in searchResults" :key="i" @click="gotoGoodsdetail(item)">
        <text class="goods-title">{{item.goods_name}}</text>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>

    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <view class="history-first-box">
        <view class="history-title">搜索历史</view>
        <uni-icons type="trash" size="17" @click="clean"></uni-icons>
      </view>
      <view class="history-list">
        <uni-tag :inverted="true" :text="item" v-for="(item,i) in histories" :key="i" @click="gotoGoodsList(item)">
        </uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer: null,
        kw: '',
        searchResults: [],
        historyList: [],
      }
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    },
    methods: {
      input(e) {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.kw = e
          this.getSearchList()
        }, 500)
      },
      async getSearchList() {
        if (this.kw.trim()) {
          this.searchResults = []
        }
        let {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/qsearch', {
          query: this.kw.trim()
        })
        this.searchResults = res.message
        if (this.kw.trim() != '') {
          this.addHistory(this.kw)
        }
      },
      gotoGoodsdetail(item) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      },
      //向historylist中添加搜索过的关键词
      addHistory(val) {
        // this.historyList.push(val)
        let set = new Set(this.historyList)
        set.delete(val)
        set.add(val)
        this.historyList = Array.from(set)
        uni.setStorageSync('kw', JSON.stringify(this.historyList))
      },
      //清除所有的搜索历史
      clean() {
        console.log(1)
        this.historyList = []
        uni.setStorageSync('kw', '[]')
      },
      gotoGoodsList(kw) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?query=' + kw
        })
      }
    },
    computed: {
      histories() {
        return [...this.historyList].reverse()
      }
    }
  }
</script>

<style lang="scss">
  .my-search {
    background-color: #afd8e7;
  }

  .search-list {
    padding: 0 5px;

    .search-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      border-bottom: 1px solid #ccc;
      padding: 13px 0;

      .goods-title {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }

  .history-box {
    .history-first-box {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      padding: 7px;
      border-bottom: 1px solid #efefef;
    }

    .history-list {
      display: flex;
      flex-wrap: wrap;

      .uni-tag {
        margin-top: 5px;
        margin-left: 5px;
      }
    }
  }
</style>
