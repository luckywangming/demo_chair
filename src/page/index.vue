<template>
  <div class="container">
    <div id="canvas-box"></div>
    <ul v-show="!assembleShow" class="btn">
      <li @click="setZz">
        <img src="../assets/images/btn_zz.png" alt />
        <!-- <span>组装</span> -->
      </li>
      <li @click="setColor">
        <img v-show="!isColor" src="../assets/images/btn_color.png" alt />
        <img v-show="isColor" src="../assets/images/btn_color_on.png" alt />
        <!-- <span>颜色</span> -->
      </li>
    </ul>
    <div v-show="colorSetShow" class="color_operate">
      <img @click="colorPrev" class="prev" src="../assets/images/arraw_left.png" alt />
      <ul>
        <li @click="chooseColor(1)" :class="{'on':colorNum == 1}" class="on1"></li>
        <li @click="chooseColor(2)" :class="{'on':colorNum == 2}" class="on2"></li>
        <li @click="chooseColor(3)" :class="{'on':colorNum == 3}" class="on3"></li>
        <li @click="chooseColor(4)" :class="{'on':colorNum == 4}" class="on4"></li>
        <!-- <li @click="chooseColor(5)" :class="{'on':colorNum == 5}" class="on5"></li> -->
      </ul>
      <img @click="colorNext" class="next" src="../assets/images/arraw_right.png" alt />
    </div>
    <transition name="fade">
      <loading v-if="loadingShow" @loaded="loaded" :pct="pct"></loading>
    </transition>
    <transition name="fade">
      <div v-show="assembleShow" class="assemble">
        <img @click="slideLeft" class="left" src="../assets/images/as_left.png" alt />
        <img @click="slideRight" class="right" src="../assets/images/as_right.png" alt />
        <img @click="slideBack" class="back" src="../assets/images/back.png" alt />
        <div class="slider">
          <div class="slide_num">
            <span>{{slideNum}}</span> /
            <span>4</span>
          </div>
          <div class="hd">
            <p :style="{'width':slideNum * 25 + '%'}" class="ol"></p>
            <span :style="{'left':slideNum * 25 + '%'}"></span>
          </div>
        </div>
        <div class="slide_img">
          <img :src="slideImg" alt />
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import Loading from "../components/loading";
import TWEEN from "@tweenjs/tween.js";
export default {
  name: "index",
  components: {
    Loading
  },
  data() {
    return {
      viewer: null,
      loadingShow: true,
      assembleShow: false,
      isColor: false,
      colorNum: 0,
      pct: 0,
      colorSetShow: false,
      slideImg: require("../assets/images/login_chair.png"),
      slideNum: 0,
      paths: {
        s: "../chair/tm.txt",
        m: "../chair/models/m.json",
        t: [
          "../chair/textures/t_1.txt",
          "../chair/textures/t_2.txt",
          "../chair/textures/t_3.txt",
          "../chair/textures/t_4.txt",
          "../chair/textures/t_5.txt",
          "../chair/textures/t_6.txt",
          "../chair/textures/t_7.txt",
          "../chair/textures/t_8.txt",
          "../chair/textures/t_9.txt",
          "../chair/textures/t_10.txt",
          "../chair/textures/t_11.txt",
          "../chair/textures/t_12.txt",
          "../chair/textures/t_13.txt",
          "../chair/textures/t_14.txt",
          "../chair/textures/t_15.txt",
          "../chair/textures/t_16.txt",
          "../chair/textures/t_17.txt",
          "../chair/textures/t_18.txt",
          "../chair/textures/t_19.txt",
          "../chair/textures/t_20.txt",
          "../chair/textures/t_21.txt",
          "../chair/textures/t_22.txt",
          "../chair/textures/t_23.txt",
          "../chair/textures/t_24.txt",
          "../chair/textures/t_25.txt"
        ],
        e: "../chair/envmap/e.txt",
        a: "../chair/animations/a_1.json"
      }
    };
  },
  async mounted() {
    this.modelInit();

    // Setup the animation loop.
    function animate() {
      requestAnimationFrame(animate);
      if (TWEEN) {
        TWEEN.update();
      }
    }
    requestAnimationFrame(animate);
  },
  watch: {
    assembleShow(newVal, oldVal) {
      if (!newVal) {
        let img = "";
        if (this.$util.isMobile()) {
          img = require("../assets/images/bg_mobile.png");
        } else {
          img = require("../assets/images/bg_pc.jpg");
        }
        this.viewer.setBackgroud(img);
      } else {
        this.viewer.setBackgroud("#ece9e2");
      }
    },
    slideNum(newVal, oldVal) {
      this.slideImg = require("../assets/images/t" + newVal + ".png");
      if (newVal == 1) {
        this.tweenPlay({
          x: -0.5395352294829904,
          y: 0.1265228169831309,
          z: 1.7947637587155707
        });
      }
      if (newVal == 2) {
        this.tweenPlay({
          x: 0.22114344246660667,
          y: 0.5009127018671391,
          z: 1.7967930542028687
        });
      }
      if (newVal == 3) {
        this.tweenPlay({
          x: -1.8340668753409135,
          y: -0.22671514222251093,
          z: 0.3362769360716519
        });
      }
      if (newVal == 4) {
        this.tweenPlay({
          x: -1.1289462210960377,
          y: -0.06800481038638052,
          z: 1.4997129766414505
        });
      }
    }
  },
  methods: {
    tweenPlay(pos) {
      let tween = new TWEEN.Tween(this.viewer.camera.position) // Create a new tween that modifies 'coords'.
        .to(pos, 1000) // Move to (300, 200) in 1 second.
        .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
        .onUpdate(() => {
        })
        .start(); // Start the tween immediately.
    },
    slideLeft() {
      let _this = this;
      if (this.slideNum > 1) {
        this.slideNum--;
      } else {
        this.slideNum = 4;
      }
      this.viewer.selectPlay(this.slideNum);
    },
    slideRight() {
      if (this.slideNum < 4) {
        this.slideNum++;
      } else {
        this.slideNum = 1;
      }
      this.viewer.selectPlay(this.slideNum);
    },
    slideBack() {
      this.colorSetShow = false;
      this.isColor = false;
      this.assembleShow = false;
      this.viewer.selectPlay(5);
    },
    chooseColor(val) {
      this.colorNum = val;
      this.viewer.selectMat(val);
    },
    colorPrev() {
      if (this.colorNum <= 1) {
        this.colorNum = 4;
      } else {
        this.colorNum--;
      }
      this.viewer.selectMat(this.colorNum);
    },
    colorNext() {
      if (this.colorNum == 4) {
        this.colorNum = 1;
      } else {
        this.colorNum++;
      }
      this.viewer.selectMat(this.colorNum);
    },
    setZz() {
      this.colorSetShow = false;
      this.isColor = false;
      this.assembleShow = true;
      this.slideNum = 1;
      this.viewer.selectPlay(1);
      // this.$router.push({
      //   path:'assemble'
      // })
    },
    setColor() {
      this.isColor = true;
      this.colorSetShow = true;
      this.assembleShow = false;
    },
    loaded() {
      this.loadingShow = false;
      let J = {
        x: -1.144779300540247,
        y: -0.19154690853073236,
        z: 1.4768457507662704
      };
      let J2 = {
        x: 0.4037941272750677,
        y: 0.0027579098200858857,
        z: 1.8344552143296158
      };
      let tween2 = new TWEEN.Tween(this.viewer.camera.position) // Create a new tween that modifies 'coords'.
        .to(J2, 3000) // Move to (300, 200) in 1 second.
        .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
        .onUpdate(() => {});
      let tween1 = new TWEEN.Tween(this.viewer.camera.position) // Create a new tween that modifies 'coords'.
        .to(J, 1000) // Move to (300, 200) in 1 second.
        .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
        .onUpdate(() => {})
        .start()
        .chain(tween2);
    },
    modelInit() {
      let _this = this;
      _this.viewer = new AMRTViewer(
        "canvas-box",
        //options
        {
          scaleFactor: -1,
          enablePan: true,
          mScaleFactor: 1.5
        },
        //plugins
        {
          HotspotPlugin: {},
          // FullScreenPlugin:{}

          OperatePlugin: {}
        }
      );
      _this.viewer.setLoadingPage(
        function(pct) {
          _this.pct = pct;
        },
        function() {}
      );
      _this.viewer.onInited = function() {
        _this.viewer.loadModel(_this.paths);
        //监听网格加载完成
        _this.viewer.onMeshLoaded.add(function() {
          //设置背景
          let img = "";
          if (_this.$util.isMobile()) {
            img = require("../assets/images/bg_mobile.png");
          } else {
            img = require("../assets/images/bg_pc.jpg");
          }
          _this.viewer.setBackgroud(img);
          //初始化UI
          _this.initUI();
        });
        var curHotspot;
        //监听所有贴图加载完成
        _this.viewer.onTextureLoaded.add(function() {
          // _this.viewer.mainObj.traverse(function(obj){
          //   console.log(obj)
          // })
        });
        //动画加载完成
        _this.viewer.onAnimationLoaded.add(function() {
          // _this.viewer.playAnim(true);
          _this.viewer.selectPlay(5);
        });
      };
    },
    initUI() {
      let _this = this;
      var startEventType =
          document.ontouchstart !== null ? "mousedown" : "touchstart",
        moveEventType =
          document.ontouchmove !== null ? "mousemove" : "touchmove",
        endEventType = document.ontouchend !== null ? "mouseup" : "touchend";

      //窗口大小改变事件(有的浏览器只执行一次，有的执行两次。为防止不能拿到(特别是只执行一次的时候)准确的值，故延迟执行尺寸改变操作)
      var isResizing = false;
      window.addEventListener(
        "resize",
        function() {
          if (!isResizing) {
            setTimeout(function() {
              if (_this.viewer.scene) {
                // setSceneBg();
                // viewer.setBackgroud("#1e1e28");
              }
              let img = "";
              if (_this.$util.isMobile()) {
                img = require("../assets/images/bg_mobile.png");
              } else {
                img = require("../assets/images/bg_pc.jpg");
              }
              isResizing = false;
            }, 100);
          }
          isResizing = true;
        },
        false
      );
    }
  }
};
</script>

<style lang="stylus" scoped>
.assemble {
  cursor: pointer;

  .slide_img {
    position: absolute;
    top: 11px;
    right: 10px;
    width: 87px;
    height: 87px;
    border: 2px solid #a5a199; /* no */
    text-align: center;
    padding: 5px;
    box-sizing: border-box;
    line-height: 87px; /* no */
    background-color: #d4cfc4;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 62px;
      max-height: 100%;
    }
  }

  .slider {
    position: fixed;
    bottom: 20px;
    width: 100%;
    padding: 0 25px;
    box-sizing: border-box;

    .slide_num {
      position: absolute;
      top: -35px;
      left: 50%;
      transform: translateX(-50%);
      color: #7d7457;
      font-weight: bold;
      font-size: 16px; /* no */
    }

    .hd {
      height: 3px; /* no */
      background: #c9c2b2;
      position: relative;
      border-radius: 4px;

      .ol {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: #fff;
        transition: all 1s ease;
      }

      span {
        position: absolute;
        width: 22px; /* no */
        height: 22px; /* no */
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        background-color: #fff;
        transition: all 1s ease;
        border-radius: 50%;
      }
    }
  }

  &>img {
    width: 41px;
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    max-width: 40px; /* no */
  }

  .left {
    left: 10px;
  }

  .right {
    right: 10px;
  }

  .back {
    top: 40px;
    left: 10px;
  }
}

#canvas-box {
  width: 100vw;
  height: 100vh;
}

.color_operate {
  position: fixed;
  bottom: 90px; /* no */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  cursor: pointer;

  img {
    width: 30px;
    max-width: 40px; /* no */
    cursor: pointer;
  }

  ul {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 20px; /* no */

    li {
      width: 17px;
      height: 17px;
      max-width: 30px; /* no */
      max-height: 30px; /* no */
      border: 1px solid #fff;
      border-radius: 50%;

      &.on1 {
        background: rgba(132, 108, 90, 1);
        // background: rgba(0.8970588445663452,0.8970588445663452,0.8970588445663452,1);
        // "r":0.8970588445663452,"g":0.8970588445663452,"b":0.8970588445663452,"a":1.0
      }

      &.on2 {
        background: rgba(166, 166, 166, 1);
      }

      &.on3 {
        background: rgba(24, 24, 24, 1);
      }

      &.on4 {
        background: rgba(155, 160, 168, 1);
      }

      &.on {
        border-color: #ff0000;
      }
    }
  }
}

.btn {
  position: fixed;
  bottom: 25px; /* no */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:first-child {
      margin-right: 60px;
    }

    img {
      width: 95px;
      max-width: 100px; /* no */
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to { /* .fade-leave-active below version 2.1.8 */
  opacity: 0;
}
</style>