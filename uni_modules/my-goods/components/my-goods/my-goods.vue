<template>
  <view class="goods-item">
    <!-- 左侧的盒子 -->
    <view class="goods-item-left">
      <!-- 右侧单选框 -->
      <radio :checked="item.goods_state" color="#c00000" v-if="isShow" @click="clickHandle"></radio>
      <img :src="item.goods_small_logo|| defaultImg" alt="">
    </view>
    <!-- 右侧的盒子 -->
    <view class="goods-item-right">
      <view class="title">
        {{item.goods_name}}
      </view>
      <view class="price">
        ${{item.goods_price | tofixed}}
        <uni-number-box @change="changeHandle" v-if="shownum" :min="1" :value="item.goods_count"></uni-number-box>
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
      },
      isShow: {
        type: Boolean,
        default: false
      },
      shownum: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        defaultImg: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      }
    },
    filters: {
      // 把数字处理为带两位小数点的数字
      tofixed(num) {
        return Number(num).toFixed(2)
      }
    },
    methods: {
      clickHandle() {
        this.$emit('radioClick', {
          goods_id: this.item.goods_id,
          // 商品最新的勾选状态
          goods_state: !this.item.goods_state
        })
      },
      changeHandle(val) {
        this.$emit('changeHandle', {
          goods_id: this.item.goods_id,
          goods_count: +val
        })
      }
    }
  }
</script>
<style lang="scss">
<<<<<<< HEAD
  .goods-item {
    display: flex;
    flex-wrap: nowrap;
    padding: 10px 5px;
    .goods-item-left {
=======
 
    .goods-item {
>>>>>>> 090f6e6f4b0c0f37c2e296181f4067f66e7f0df5
      display: flex;
      justify-content: space-between;
      align-items: center;
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: red;
        font-size: 16px;
      }
    }
<<<<<<< HEAD
  }
</style>
=======
  
</style>
>>>>>>> 090f6e6f4b0c0f37c2e296181f4067f66e7f0df5
