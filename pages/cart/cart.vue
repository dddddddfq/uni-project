<template>
  <view v-if="cart.length !== 0">
    <!-- 收货地址模块-->
    <my-address></my-address>
    <view class="cart-title">
      <!-- 购物车商品列表的标题区域 -->
      <view class="cart-title">
        <!-- 左侧的图标 -->
        <uni-icons type="shop" size="18"></uni-icons>
        <!-- 描述文本 -->
        <text class="cart-title-text">购物车</text>
      </view>
    </view>
    <uni-swipe-action>
      <block v-for="(item,i) in cart">
        <uni-swipe-action-item :right-options="options" @click="swipeClickHandle(item)">
          <my-goods :item="item" :isShow="true" :key="item.goods_id" @radioClick="radioClickHandle"
            @changeHandle="changeHandle" :shownum="true"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    <my-settle :total="checkTotal" :count='stateTotal'></my-settle>
  </view>
  <!-- 空白购物车区域 -->
  <view class="empty-cart" v-else>
    <image src="/static/cart_empty@2x.png" class="empty-img"></image>
    <text class="tip-text">空空如也~</text>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations,
    mapGetters
  } from 'vuex'
  import tabber from '@/mixins/tabber-bedan.js'
  export default {
    mixins: [tabber],
    data() {
      return {
        options: [{
          text: '删除',
          style: {
            backgroundColor: 'red'
          }
        }]
      };
    },
    computed: {
      ...mapState('cart', ['cart']),
      ...mapGetters('cart', ['checkTotal', 'total'])
    },
    onLoad() {
      console.log(this.checkTotal);
    },
    methods: {
      ...mapMutations('cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoods']),
      radioClickHandle(e) {
        this.updateGoodsState(e)
      },
      changeHandle(e) {
        this.updateGoodsCount(e)
      },
      swipeClickHandle(good) {
        this.removeGoods(good)
      }
    },


  }
</script>

<style lang="scss">
  .cart-title {
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-left: 5px;
    border-bottom: 1px solid #efefef;

    .cart-title-text {
      margin-left: 10px;
    }
  }

  .empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 150px;

    .empty-img {
      width: 90px;
      height: 90px;
    }

    .tip-text {
      font-size: 12px;
      color: gray;
      margin-top: 15px;
    }

  }
</style>
