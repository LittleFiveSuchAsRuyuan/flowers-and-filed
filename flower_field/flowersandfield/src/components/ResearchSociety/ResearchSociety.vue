                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     <template>
  <div class="researchsociety-box" v-if="data">
    <div class="society-banner" ref="wrapperScroll">
      <ul class="header-t" ref="bg" >
        <li v-for="item in data.speech.concat(data.speech[0])" class="li-style">
          <img :src="item.imageUrl"  class="header-lli">
        </li>
      </ul>
    </div>
    <div class="free-box">
      <p class="txt-p">限时免费</p>
      <ul class="free-ul">
        <li v-for="free in data.free" class="free-li">
          <img :src="free.imgUrl" class="icon">
          <span class="text-p">
            <p class="hearder-p">{{free.title}}</p>
            <p class="inr-p">{{free.content}}</p>
            <p class="typeName-p">#{{free.typeName}}</p>
            <p class="readCount-p">{{free.readCount}}人观看</p>
          </span>
        </li>
      </ul>
    </div>
    <div class="international-box">
      <p class="txt-p1">最新内容</p>
      <ul>
        <li v-for="international in data.international" class="international-li">
          <a href="#"><img :src="international.imgUrl"></a>
          <p class="introduce">{{international.title}}</p>
          <p class="price-p">&yen{{international.price}}.00</p>
          <p class="readcount-p">{{international.readCount}}人观看</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import IScroll from "iscroll"
import {mapActions,mapMutations} from "vuex"
export default {
  name: 'app',
  data() {
    return {
      data: {
        type: Object
      }
    }
  },
  created() {
    let self = this
    this.$ajax.get('/api/speech')
      .then((response) => {
        console.log(response)
        response = response.data
        if (response.error === 0) {
          self.data = response
          console.log(self.data)
        }
      })
      .catch((error) => {
        alert(error)
      })
  },
  // updated() {
  //   console.log(this.data)
  //   if (this.data) {
  //     console.log(this.data)
  //     this.$nextTick(() => {
  //       if (!this.warpperScroll) {
  //         this.warpperScroll = new IScroll(this.$refs.wrapperScroll, {
  //           click: true,
  //           scrollX: true,
  //           scrollY: false,
  //           eventPassthrough: true,
  //         })
  //       } else {
  //         this.warpperScroll.refresh()
  //       }
  //     })
  //   }
  // },
  methods: {
    ...mapActions(['transitionEnd', 'transitionAgain', 'startHeaderTransition']),
    ...mapMutations(['RECEIVE_LENGTH'])
  },
  watch: {
    data(val) {
      if (val.speech) {
        this.RECEIVE_LENGTH(val.speech.length)
        this.$nextTick(function () {
          this.startHeaderTransition(this.$refs.bg)
          this.transitionEnd({
            obj: this.$refs.bg,
            callback: () => { this.transitionAgain({obj: this.$refs.bg, modules: 'header'}) }
          })
        })
      }
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
    margin: 0;
    padding: 0;
}
// [class ^='icon']{
//     background-position: 0 0;
//     background-image: url("../images/sprites.png");
//     background-size: 200px 200px;
// }
// .clearfix::before,.clearfix::after{
//     content: '';
//     display: block;
//     height: 0;
//     line-height: 0;
//     visibility: hidden;
//     clear: both;
// }
.society-banner {
    width: 375px;
    position: relative;
    overflow: hidden;
    height: 200px;
}
.society-banner ul:first-child {
    width: 100%;
    height: auto;
    overflow: hidden;
}
.society-banner ul:first-child li {
}
.society-banner ul:first-child li a {
    width: 100%;
    display: block;
}
.society-banner ul:first-child li a img {
    width: 375px;
    display: block;
}
.free-box {
    width: 600px;
}
.free-ul {
    width: 400px;
    height: 336px;
}
.icon {
    width: 166px;
    height: 102px;
    margin-left: 10px;
}
.text-p {
    height: 100px;
    width: 200px;
    float: right;
    margin-right: 10px;

}
.hearder-p {
    font-family: 'SimHei';
    width: 150px;
    font-size: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.inr-p {
    margin-top: 10px;
    text-align: left;
    color: #ccc;
    width: 155px;
    height: 37px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
.typeName-p {
    float: left;
    width: 66px;
    margin-top: 22px;
    font-size: 13px;
    color: #FFDEAD;
}
.readCount-p {
    text-align: center;
    padding-right: 30px;
    color: #ccc;
    width: 80px;
    margin-top: 22px;
    font-size: 13px;
    float: right;
}
.free-li {
    margin-top: 13px;
}
.txt-p {
    height: 26px;
    line-height: 26px;
    margin-left: 10px;
    font-family: 'SimHei';
    font-weight: 800;
    padding-top: 15px;
}
.txt-p1 {
    height: 26px;
    line-height: 26px;
    margin-left: 10px;
    font-family: 'SimHei';
    font-weight: 800;
    padding-top: 15px;
}
.international-box {
    margin-top: 6px;

    width: 100%;
    position: relative;
    overflow: hidden;
}
.international-box ul li img {
    width: 100%;
    display: block;
}
.price-p {
    width: 50%;
    float: left;
    color: #FFDEAD;
    font-size: 14px;
}
.readcount-p {
    width: 50%;
    float: right;
    text-align: right;
    color: #ccc;
    font-size: 14px;

}
.international-box ul:first-child li {
    margin-top: 1px;
    /*因为父类宽度是1000% 当前的10% 就等于页面宽度的100%*/
    width: 100%;
    height: auto;
}
.international-li {
    padding: 15px 10px 10px;
    border-bottom: solid 1px #ccc;
    height: 215px;
}
.introduce {
    height: 33px;
    line-height: 36px;
    font-size: 13px;

}
.researchsociety-box {
    margin-top: 40px;
    z-index: -1;
}
.header-t {
    width:375px;
}
.header-lli {
    height: 200px;
    width: 375px;
}
.li-style {
    width: auto;
    height: 200px;
}
</style>
