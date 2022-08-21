<template>
  <view>
    <!-- //轮播图模块 -->
    <swiper :indicator-dots="true" :interval="3000" :duration="1000" circular>
      <swiper-item v-for="(item,index) in swiperList" :key="index">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+ item.goods_id">
          <image :src="item.image_src" alt=""></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 分类导航栏模块 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item,index) in navList" :key="index" @click="navClickHandler(item)">
        <image :src="item.image_src" mode="" class="nav-img"></image>
      </view>

    </view>
    <!--  楼层模块 -->
    <view class="floor">
      <view class="floor-item" v-for="(item,index) in floorList" :key="index">
        <image :src="item.floor_title.image_src" alt="" class="floor-title"></image>
        <view class="floor-img-box">
          <navigator class="right-box" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" :style="{ width :item.product_list[0].image_width +'rpx'}"
              mode="widthFix">
            </image>
          </navigator>
          <view class="left-box">
            <navigator :url="item2.url" class="left-item" v-for="(item2,i2) in item.product_list" :key="i2">
              <image :src="item2.image_src" v-if="i2!==0" :style="{width:item2.image_width +'rpx'}" mode="widthFix">
              </image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import tabber from '@/mixins/tabber-bedan.js'
  export default {
    mixins: [tabber],
    data() {
      return {
        swiperList: [],
        navList: [],
        floorList: [],
      };
    },
    onLoad() {
      this.getSwiper()
      this.getNavlist()
      this.getFloorList()
    },
    methods: {
      async getSwiper() {
        let {
          data: res
        } = await uni.$http.get('/api/public/v1/home/swiperdata');
        if (res.meta.status !== 200) {
          return uni.$showMessage();
        }
        this.swiperList = res.message;
      },
      async getNavlist() {
        let {
          data: res
        } = await uni.$http.get('/api/public/v1/home/catitems');
        if (res.meta.status !== 200) return uni.$showMessage()
        this.navList = res.message;
      },
      navClickHandler(item) {
        if (item.name === '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      async getFloorList() {
        let {
          data: res
        } = await uni.$http.get('/api/public/v1/home/floordata')
        if (res.meta.status !== 200) return uni.$showMessage()
        res.message.forEach(floor => {
          return floor.product_list.forEach(prod => {
            return prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1];
          })
        })
        this.floorList = res.message
      }
    }
  }
</script>

<style lang="scss">
  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;

    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }

  .floor-title {
    width: 100%;
    height: 60rpx;
    margin: 10rpx 0;
  }

  .floor-img-box {
    display: flex;
    padding-left: 15rpx;

    .left-box {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }
  }
</style>
