<template>
  <view>
    <view class="scroll-view-container">
      <!-- 左侧视图 -->
      <scroll-view scroll-y class="scroll-view-left" :style="{height:wh+'px'}">
        <block v-for="(item,i) in cateList" :key="i">
          <view :class="['scroll-view-left-item',i===active?'active':'']" @click="onChange(i)">
            {{item.cat_name}}
          </view>
        </block>

      </scroll-view>
      <scroll-view scroll-y="true" class="scroll-view-right" :style="{height:wh+'px'}" :scroll-top="scrolltop">
        <view class="cate-lv2" v-for="(item,i) in cateLv2" :key="i">
          <view class="cate-title">
            / {{item.cat_name}} /
          </view>
          <view class="cate-lv2-list">
            <view class="cate-lv2-item" v-for="(item2,i2) in item.children" :key="i2" @click="goGoodsList(item2)">
              <!-- <image :src="item2.cat_icon"></image> -->
              <image src="https://static.botue.com/ugo/uploads/pic_floor02_2@2x.png"></image>
              <text>{{item2.cat_name}}</text>
            </view>
          </view>

        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        cateList: [],
        active: 0,
        wh,
        cateLv2: [],
        scrolltop: 0
      };
    },
    onLoad() {
      const stsInfo = uni.getSystemInfoSync()
      this.wh = stsInfo.windowHeight
      this.getCateList()
    },
    methods: {
      async getCateList() {
        let res = await uni.$http.get('/api/public/v1/categories')
        if (res.statusCode !== 200) {
          return uni.$showMessage()
        }
        this.cateList = res.data.message
        this.cateLv2 = res.data.message[0].children
      },
      onChange(i) {
        this.active = i
        //动态改变catelv2的数据
        this.cateLv2 = this.cateList[i].children
        this.scrolltop = this.scrolltop === 0 ? 1 : 0
      },
      goGoodsList(item) {
        // console.log(item)
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
        })
      }
    }
  }
</script>

<style lang="scss">
  .scroll-view-container {
    display: flex;

    .scroll-view-left {
      width: 120px;

      .scroll-view-left-item {
        width: 100%;
        line-height: 60px;
        text-align: center;
        background-color: #eee;
        font-size: 12px;

        &.active {
          background-color: #fff;
          position: relative;

          &::before {
            content: '';
            display: block;
            width: 4rpx;
            height: 30px;
            background-color: red;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
          }
        }

      }
    }
  }

  .cate-lv2 {
    .cate-title {
      font-weight: bold;
      font-size: 14px;
      text-align: center;
      margin-bottom: 15rpx;
    }

    .cate-lv2-list {
      display: flex;
      flex-wrap: wrap;


      .cate-lv2-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 33.33%;

        image {
          width: 80px;
          height: 80px;
        }

        text {
          padding: 10px 0;
          font-size: 12px;
        }
      }
    }
  }
</style>
