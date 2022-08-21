<template>
  <view>
    <view class="address">
      <view class="address-choose-box" v-if="JSON.stringify(address)==='{}'">
        <button type="primary" size="mini" class="btnChooseAddress" @click="btnClick">请选择收货地址+</button>
      </view>
      <!-- 渲染收货地址盒子 -->
      <view class="address-info-box" v-else @click="btnClick">
        <view class="row1">
          <view class="row1-left">
            <text>收货人:</text> <text>{{address.userName}}</text>
          </view>
          <view class="row1-right">
            手机号: <text>{{address.telNumber}}</text>
          </view>
        </view>
        <view class="row2">
          <view class="row2-left">
            <view class="row2-left">收货地址：{{addStr}}</view>
          </view>

        </view>

      </view>
      <!-- 边框线模块-->
      <image src="/static/cart_border@2x.png" class="border-image"></image>
    </view>
  </view>
</template>
<script>
  import {
    mapMutations,
    mapState,
    mapGetters
  } from 'vuex'
  export default {
    data() {
      return {
        // address: {}
      }
    },
    computed: {
      ...mapState('user', ['address']),
      ...mapGetters('user', ['addStr'])
    },
    methods: {
      ...mapMutations('user', ['AddAddress']),
      async btnClick() {
        const [err, succ] = await uni.chooseAddress()
        if (err === null && succ.errMsg === "chooseAddress:ok") {
          this.AddAddress(succ)
        }
      }
    }
  }
</script>
<style lang="scss">
  .address {
    .border-image {
      display: block;
      height: 5px;
      width: 100%;
    }

    .address-choose-box {
      padding: 20px;
      display: flex;
      height: 90px;
      align-items: center;
      justify-content: center;
    }

    .address-info-box {
      padding: 20px;
      font-size: 12px;

      .row1 {
        display: flex;
        justify-content: start;
        margin-bottom: 10px;

        .row1-left {
          margin-right: 20px;
        }
      }
    }
  }
</style>
