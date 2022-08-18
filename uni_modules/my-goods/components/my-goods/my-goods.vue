<template>
  <view class="goods-item">
    <!-- 左侧的盒子 -->
    <view class="goods-item-left">
      <img :src="item.goods_small_logo|| defaultImg" alt="">
    </view>
    <!-- 右侧的盒子 -->
    <view class="goods-item-right">
      <view class="title">
        {{item.goods_name}}
      </view>
      <view class="price">
        ${{item.goods_price.toFixed(2)}}
      </view>

    </view>
  </view>
</template>
<script>
  export default {
    name: '',
    props: {
      item: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        defaultImg: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      }
    }
  }
</script>
<style lang="scss">
  .goods-list {
    .goods-item {
      display: flex;
      flex-wrap: nowrap;
      padding: 10px 5px;

      .goods-item-left {
        img {
          width: 100px;
          height: 100px;
          display: block;

        }
      }

      .goods-item-right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 0 8px;

        .title {
          font-size: 14px;
        }

        .price {
          color: red;
          font-size: 16px;
        }
      }
    }
  }
</style>
