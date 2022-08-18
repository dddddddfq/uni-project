<template>
  <view>
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
  export default {
    data() {
      return {
        detailInfo: [],
        options: [{
          icon: 'shop',
          text: '店铺',
          infoColor: "red"
        }, {
          icon: 'cart',
          text: '购物车',
          info: 2
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
    onLoad(options) {
      this.getDetailInfo(options.goods_id)
    },
    methods: {
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

      },
      preview(i) {
        uni.previewImage({
          current: i,
          urls: this.detailInfo.pics.map(x => x.pics_big)
        })
      },
      buttonClick(e) {
        console.log(e)
        if (e.content.text == '加入购物车') {
          uni.switchTab({
            url: '/pages/cart/cart'
          })
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
