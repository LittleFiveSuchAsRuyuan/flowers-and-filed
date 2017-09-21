<template>
<div id="app">
  <div class="tab" v-show="!showOrhidden">
    <div class="tab-item">
      <router-link to="/interestgroup" class="right">兴趣组</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/researchsociety" class="left">研究社</router-link>
        <a href="#"><img src="./img/sprites.png" class="search-img"></a>
  </div>
</div>
  <router-view></router-view>
</div>
</template>
<script>
export default {
  name: 'app',
  data() {
    return {
      data: {},
          showOrhidden:false,
    }
  },
  created() {
    let self = this
    this.$ajax.get('/api/data')
      .then((response) => {
        response = response.data
        if (response.error === 0) {
          self.data = response.data
        }
      })
      .catch((error) => {
        alert(error)
      })
  },
  methods:{
    isShow(show){
      this.showOrhidden=show
    },
    changeId(item){
      this.id=item.id
    }
  },
}
</script>

<style lang="less">
@import "common/less/mixin";
#app {
    overflow: hidden;
    .tab {
       display: flex;
        position: fixed;
      background: white;
      z-index: 1;
        display: flex;
        width: 100%;
        height: 40px;
        line-height: 40px;
        max-width: 640px;
        min-width: 300px;
        border-bottom: solid 1px #ccc;
    }
    .tab-item {
        flex: 1 0 50%;
        text-align: center;
        & > a {
            display: block;
            font-size: 14px;
            color: rgb(77, 85, 93);
            &.active {
                color: #cc33cc;
                border-bottom: solid 2px black;
            }
        }
    }
    .left {
        margin-left: 15px;
        float: left;
    }
    .right {
        margin-right: 15px;
        float: right;
    }
    .search-img {
        float: right;
        width: 42px;
        height: 30px;
        margin-top: 2px;
        margin-left: 2px;
    }
}

</style>
