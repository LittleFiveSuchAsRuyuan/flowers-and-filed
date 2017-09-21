<template>
   <div class="dj">
     <div v-show="showOrhidden">
    <h1>正在开发中,请谅解********</h1>
     </div>
       <div></div>
         <div></div>
<div class="box" v-if="data" v-show="!showOrhidden">
  <div v-if="data.communityHomePageFirstPlateView" class="fl-banner" ref="imgScroll">
    <ul :class="'length-'+data.communityHomePageFirstPlateView.articleForFirstPlateViews.length">
      <li width='300' height='300' class="li-style" v-for="item in data.communityHomePageFirstPlateView.articleForFirstPlateViews" @click="isShow(true),changeId(item)">
        <img width="300" height="180" :src="item.imgUrl">
        <p class="enName-style">{{item.enName}}</p><br>
        <p class="cnName-style">{{item.cnName}}</p>
      </li>
    </ul>
  </div>

  <div v-if="data.communityHomePageSecondPlateView" class="div-bg">
    <div class="border-1px"></div>
    <p class="PlateView" v-if="data.communityHomePageSecondPlateView">{{data.communityHomePageSecondPlateView.name}}</p>
    <div v-if="data.communityHomePageFirstPlateView" class="specail-banner" ref="wrapperScroll">
      <ul class="special-box">
        <li v-for="special in data.communityHomePageSecondPlateView.categoryForSecondPlateViews" class="special-img">
          <a>
            <img :src="special.img" class="img-radius">
          </a>
          <span class="specail-introduce"><p class="p" line-height>{{special.name}}</p></span>
        </li>
      </ul>
    </div>
  </div>
  <div v-if="data.communityHomePageWaterFallPlateView">
    <p class="PlateView">{{data.communityHomePageWaterFallPlateView.name}}</p>
    <div v-if="data.communityHomePageWaterFallPlateView.articleForWaterFallPlateViews" height:auto class="main">
      <ul class="recommend-ul">
        <li class="recommend-li" v-for="recommend in data.communityHomePageWaterFallPlateView.articleForWaterFallPlateViews">
          <img :src="recommend.coverImg" class="recommend-img">
          <p class="recommend-name">{{recommend.name}}</p><br>
          <span><p class="span-p">#{{recommend.cateName}}</p><p class="span-p2"><img  class="span-eye"  src="./js/eye58.png">{{recommend.readCount}}</p></span>
        </li>
      </ul>
    </div>
  </div>
</div>
</div>
</template>

<script>
import IScroll from "iscroll"
export default {
  name: 'app',
  data() {
    return {
      data: {},
      showOrhidden:false,
      id:0,
      item:[]
    }
  },
  created() {
    let self = this
    this.$ajax.get('/api/data')
      .then((response) => {
        response = response.data
        if (response.error === 0) {
          self.data = response.data
          console.log(self.data)
        }
      })
      .catch((error) => {
        alert(error)
      })

    // window.onload=function(){
    //   function change() {
    //       var aDiv = document.getElementByClassName('recommend-li');
    //       // alert(aDiv.length);
    //       var windowCW = document.documentElement.clientWidth;  //窗口视口的宽度
    //       var n = Math.floor(windowCW/210);                     //一行能容纳多少个div，并向下取整
    //       if (n<=0) {return};
    //       // alert(n);
    //       var t = 0;
    //       var center = (windowCW - n*210)/2;                   //居中
    //       var arrH = [];                                       //定义一个数组存放div的高度
    //       for (var i = 0; i < aDiv.length; i++) {
    //           var j = i%n;
    //
    //           if (arrH.length==n) {                    //一行排满n个后到下一行
    //               var min = findMin(arrH);              //从最“矮”的排起，可以从下图的序号中看得出来，下一行中序号是从矮到高排列的
    //               aDiv[i].style.left =center + min*210 + "px";
    //               aDiv[i].style.top = arrH[min]+10 + "px";
    //               arrH[min] += aDiv[i].offsetHeight + 10;
    //               // alert(min);
    //           }else{
    //               arrH[j] = aDiv[i].offsetHeight;
    //               aDiv[i].style.left =center + 200*j+10*j + "px";
    //               aDiv[i].style.top = 0;
    //           }
    //
    //       };
    //   }
    //
    //     window.onscroll= function  () {
    //         // 页面总高度
    //         var bodyHeight = document.documentElement.offsetHeight;
    //         // 可视区高度
    //         var windowHeight = document.documentElement.clientHeight;
    //         //滚动条的高度
    //         var srcollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //         var srcollH = document.body.scrollHeight;
    //         // alert(srcollH);
    //     }
    //     function findMin(arr) {
    //     var m = 0;
    //     for (var i = 0; i < arr.length; i++) {
    //         m = Math.min(arr[m], arr[i]) == arr[m] ? m : i;
    //     }
    //     return m;
    // }

  },
  methods:{
    isShow(show){
      this.showOrhidden=show
    },
    changeId(item){
      this.id=item.id
    }
  },
  updated() {
    console.log(this.id)
    if (this.data.communityHomePageFirstPlateView) {
      console.log(this.data)
      this.$nextTick(() => {
        if (!this.imgScroll) {
          this.imgScroll = new IScroll(this.$refs.imgScroll, {
            click: true,
            scrollX: true,
            scrollY: false,
            eventPassthrough:true,
          })
        } else {
          this.imgScroll.refresh()
        }
      })
    }
    if (this.data.communityHomePageSecondPlateView) {
      console.log(this.data)
      this.$nextTick(() => {
        if (!this.warpperScroll) {
          this.warpperScroll = new IScroll(this.$refs.wrapperScroll, {
            click: true,
            scrollX: true,
            scrollY: false,
            eventPassthrough:true,
          })
        } else {
          this.warpperScroll.refresh()
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.loop(20);
.loop(@counter) when (@counter > 0) {
    .loop((@counter - 1));
    .length-@{counter} {
        width: ((@length+8) * @counter);
        height: 100%;
    }
}
@length: 300px;
* {
    font-family: '微软雅黑';
    margin: 0;
    padding: 0;
}
.box {
    flex: 1;
    overflow: hidden;
    background: #e1e1e1;
}
.fl-banner {
    margin-top: 2px;
    background: #f2eeee;
    width: 100%;
    position: relative;
    overflow: hidden;
    height: 260px;
    margin-left: 10px;
    .clearfix {
        height: 100%;
    }
}

.li-style {
    margin-left: 8px;
    float: left;
    width: 300px;
    height: 200px;
    flex: 0 0 57px;
}
.enName-style {
    width: 398px;
    font-size: 20px;
    margin: 12px 0 0 20px;
}
.cnName-style {
    width: 300px;
    font-size: 13px;
    margin-left: 18px;
    margin-top: -10px;
}
.border-1px {
    border-top: solid 1px #ccc;
    width: 88%;
    margin: auto;
    height: 1px;
    background: #ccc;
}
.div-bg {
    margin-left: 10px;
    background: #f2eeee;
    margin-top: -1px;
}
p {
    font-family: 'SimHei';
}
.PlateView {
    width: 300px;
    font-size: 17px;
    padding-left: 20px;
    margin: 20px 20px 10px 0;
}
.img-radius {
    border-radius: 5px;
    width: 98px;
    height: 90px;
}
.specail-banner {
    width: 100%;
    position: relative;
    overflow: hidden;
    height: 102px;

}
.special-box {
     margin-left: 16px;
      height: 100%;
      width: 838px;
}
.special-img {
    z-index: -1;
    margin-left: 4px;
    width: 98px;
    height: 90px;
    float: left;
    vertical-align: middle;
}
.specail-introduce {
    margin-top: -90px;
    width: 98px;
    display: block;
    height: 90px;
    line-height: 90px;
    text-align: center;
    vertical-align: center;
    .p {
        margin: auto;
        color: #FFFFFf;
    }
}
.recommend-ul {
    display: flex;
    width: auto;
    transition: 0.5s;
     flex-wrap: wrap;
     justify-content: flex-start;
    .recommend-li {
      flex: 0 0 auto;
       width: 170px;
       height: auto;
       align-items:stretch;
        align-items: center;
       flex-direction:row;
        border-radius: 5px;
        margin-top: 5px;
        margin-left: 5px;
        margin-right: 5px;
        background: #f2eeee;


    }
}
.recommend-img {
    width: 170px;
    height: auto;
    display: block;
    left: 0;
    top: 0;
    border-radius: 5px;
    margin-bottom: 10px;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;

}
.recommend-name {
    font-size: 10px;
    margin-left: 10px;
    height: 24px;
    line-height: 24px;
}
.span-p {
    font-size: 3px;
    float: left;
    margin-top: -15px;
    margin-left: 10px;
    width: auto;
    color: #ccc;
    margin-bottom: 4px;
}
.span-p2 {
    margin-top: -15px;
    font-size: 5px;
    margin-right: 10px;
    float: right;
    width: auto;
    color: #ccc;
    line-height: 16px;
}
.span-eye {
    float: left;
    width: 16px;
    height: 16px;
    line-height: 16px;
}
.main {
    display: flex;
    position: absolute;
}
.dj{
  margin-top: 40px;

}
</style>
