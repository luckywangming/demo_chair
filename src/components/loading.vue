<template>
  <div class="box">
    <div class="loading">
      <div class="can">
        <canvas id="canvas" :width="canvasW" :height="canvasW" style="background:transparent;">
          <p>you browser not support canvas!</p>
        </canvas>
        <img src="../assets/images/login_chair.png" alt />
      </div>
      <div class="tit">
        <p>----- 简约办公座椅组装教程 -----</p>
      </div>
      <div class="text">正在加载中{{parseInt(num)}}%</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["pct"],
  data() {
    return {
      ctx: null,
      ctxX: 0,
      ctxY: 0,
      rad: (Math.PI * 2) / 100,
      speed: 0.1,
      timer: null,
      num: 0,
      canvasW: 192
    };
  },
  mounted() {
    let _this = this;
    if(_this.$util.isMobile()){
      _this.canvasW = 96
    }
    let canvas = document.getElementById("canvas"); //获取canvas元素
    _this.ctx = canvas.getContext("2d");
    _this.ctxX =_this.canvasW / 2;
    _this.ctxY = _this.canvasW / 2;
    _this.intelvalData();
    // window.requestAnimationFrame(_this.drawFrame, canvas);
  },
  methods: {
    drawFrame() {
      let _this = this;
      window.requestAnimationFrame(_this.drawFrame, canvas);
      this.ctx.clearRect(0, 0, _this.ctxX * 2, _this.ctxY * 2);

      _this.whiteCircle();
      // _this.text(_this.speed);
      _this.blueCircle(_this.pct);
    },
    intelvalData() {
      let _this = this;
      clearInterval(_this.timer);
      _this.timer = setInterval(() => {
        _this.ctx.clearRect(0, 0, _this.ctxX * 2, _this.ctxY * 2);
        _this.num = _this.num + 0.5;
        if (_this.num == _this.pct && _this.pct != 100) {
          _this.num = _this.num - 0.5;
        }
        _this.whiteCircle();
        // _this.text(_this.speed);
        _this.blueCircle(_this.num);
        if (_this.num >= _this.pct && _this.num > 100) {
          _this.$emit("loaded");
          clearInterval(_this.timer);
        }
      }, 17);
    },
    blueCircle(n) {
      let _this = this;
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.strokeStyle = "#525868";
      this.ctx.lineWidth = 5;
      this.ctx.arc(
        _this.ctxX,
        _this.ctxY,
        _this.canvasW / 2 - 4,
        -Math.PI / 2,
        -Math.PI / 2 + n * _this.rad,
        false
      );
      this.ctx.stroke();
      this.ctx.restore();
    },
    whiteCircle() {
      let _this = this;
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.strokeStyle = "#b2b9cb";
      this.ctx.lineWidth = 5;
      this.ctx.arc(_this.ctxX, _this.ctxY, _this.canvasW / 2 - 4, 0, Math.PI * 2, false);
      this.ctx.stroke();
      this.ctx.closePath();
      this.ctx.restore();
    },
    text(n) {
      let _this = this;
      this.ctx.save();
      this.ctx.fillStyle = "#F47C7C";
      this.ctx.font = "40px Arial";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.fillText(n.toFixed(0) + "%", _this.ctxX, _this.ctxY);
      this.ctx.restore();
    }
  }
};
</script>
<style lang="stylus" scoped>
.box {
  background: #ece9e2;
  text-align: center;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .loading {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .text {
      color: #505666;
      font-size: 12px; /* no */
    }

    .tit {
      color: #525868;
      margin-bottom: 21px;

      p {
        font-size: 15px; /* no */
        font-weight: bold;
      }
    }

    .can {
      position: relative;
      width: 95px;
      margin-bottom: 29px;

      img {
        position: absolute;
        width: 44px;
        max-width:110px;/*no*/
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>