<template>
  <view>
    <view class="my-search" @click="myHandle" :style="{'background-color':bgcolor}">
      <view class="search-box" :style="{'border-radius':radius+'px'}">
        <uni-icons type="search" size="17" @input="input"></uni-icons>
        <text class="placeholder">搜索</text>

      </view>

    </view>
  </view>
</template>
<script>
  export default{
    props: {
      bgcolor: {
        type: String,
        default:'#afd8e7'
      },
      radius:{
        type:Number,
        default:18
      }
    },
    methods:{
      myHandle(){
        this.$emit('click')
      },
    input(e){
      console.log(e)
    }
    }
  }
</script>
<style lang="scss">
  .my-search {
    height: 60px;
    // background-color: #afd8e7;
    display: flex;
   align-items: center;
    padding: 0 10px;
    .search-box {
      width: 100%;
      height: 40px;
      // border-radius: 20px;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      .placeholder {
        font-size: 14px;
        margin-left: 5px;
      }
    }
  }
</style>
