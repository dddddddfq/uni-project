<template>
  <view v-if="detailInfo.goods_name">
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
      <swiper-item v-for="(item,i) in detailInfo.pics" :key="item.id">
        <image :src="item.pics_big" @click="preview(i)"></image>
      </swiper-item>

    </swiper>
    <!-- 商品名称区域 -->
    <view class="goods-info-box">
      <view class="price">
        ${{detailInfo.goods_price}}
      </view>
      <view class="goods-info-main">
        <view class="title">
          {{detailInfo.goods_name}}
        </view>
        <view class="collection">
          <uni-icons type="star" size="25"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <view class="yf">
        快递:免运费
      </view>

    </view>
    <rich-text :nodes="detailInfo.goods_introduce"></rich-text>
    <view class="footer">
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
        @buttonClick="buttonClick" />
    </view>
  </view>

</template>

<script>
  import {
    mapState,
    mapMutations,
    mapGetters
  } from 'vuex'
  export default {
    data() {
      return {
        flag:false,
        detailInfo: [],
        options: [{
          icon: 'shop',
          text: '店铺',
          infoColor: "red"
        }, {
          icon: 'cart',
          text: '购物车',
          info: 0
        }],
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ]
      };
    },
    computed: {
      ...mapState({
        cart: state => state.cart.cart,
      }),
      ...mapGetters('cart', ['total'])
    },
    watch: {
      total(newVal) {
        const result = this.options.find(x => x.text === '购物车')
        if (result) {
          result.info = newVal
        }
      }
    },
    onLoad(options) {
      this.getDetailInfo(options.goods_id)
      this.options[1].info = this.total
    },
    methods: {
      ...mapMutations('cart', ['addToCart']),
      async getDetailInfo(id) {
        let {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/detail', {
          goods_id: id
        })
        if (res.meta.status !== 200) return uni.$showMessage()
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img/g, '<img style="display:block;" ')
          .replace(/webp/g, 'jpg')
        this.detailInfo = res.message
        this.flag=true

      },
      preview(i) {
        uni.previewImage({
          current: i,
          urls: this.detailInfo.pics.map(x => x.pics_big)
        })
      },
      onClick(e) {
        if (e.content.text == '购物车') {
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
      },
      buttonClick(e) {
        if (e.content.text === '加入购物车') {

          // 2. 组织一个商品的信息对象
          const goods = {
            goods_id: this.detailInfo.goods_id, // 商品的Id
            goods_name: this.detailInfo.goods_name, // 商品的名称
            goods_price: this.detailInfo.goods_price, // 商品的价格
            goods_count: 1, // 商品的数量
            goods_small_logo: this.detailInfo.goods_small_logo, // 商品的图片
            goods_state: true // 商品的勾选状态
          }

          // 3. 通过 this 调用映射过来的 addToCart 方法，把商品信息对象存储到购物车中
          this.addToCart(goods)

        }
      }
    }
  }
</script>

<style lang="scss">
  swiper {
    height: 750rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .goods-info-box {
    padding: 10px;
    padding-right: 0;

    .price {
      font-size: 18px;
      color: red;
      margin: 10px 0;
    }

    .goods-info-main {
      font-size: 12px;
      display: flex;
      justify-content: space-around;

      .title {
        font-size: 14px;
      }

      .collection {
        width: 80px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-left: 1px solid #5a564f;
      }
    }
  }

  .yf {
    margin-top: 4px;
    font-size: 12px;
    color: gray;
  }

  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
</style>
