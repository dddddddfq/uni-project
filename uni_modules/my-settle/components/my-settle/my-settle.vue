<template>
  <view class="my-settle">
    <view class="bottom-box">
      <view class="left-box">
        <label class="radio">
          <radio :checked="stateTotal" color="#c00000" @click="click()" /><text>全选</text>
        </label>
      </view>
      <view class="center-box">
        合计: <text class="countprice">${{checkedGoodsAmount}}</text>
      </view>
      <view class="right-box">
        结算({{total}})
      </view>
    </view>
  </view>
</template>
<script>
  import {
    mapMutations,
    mapGetters
  } from 'vuex'
  export default {
    data() {
      return {

      }
    },
    props: ['total', 'count'],
    computed: {
      ...mapGetters('cart', ['stateTotal', 'checkedGoodsAmount',])
    },
    methods: {
      ...mapMutations('cart', ['changeState','updateAllGoodsState']),
      click() {
        this.updateAllGoodsState(!this.stateTotal)
      }
    }
  }
</script>
<style lang="scss">
  .bottom-box {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 50px;
    width: 100%;
    background-color: #eee;
    padding: 0 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;

    .radio {
      display: flex;
      align-items: center;
    }

    .center-box {
      .countprice {
        color: #c00000;
        font-weight: bold;
      }
    }

    .right-box {
      height: 50px;
      background-color: #c40004;
      line-height: 50px;
      color: white;
      text-align: center;
      padding: 0 10px;
      min-width: 100px;
    }
  }
</style>
