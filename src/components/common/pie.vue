<template>
<div>
  <el-button @click="setTimer">自动刷新</el-button>
  <el-button @click="clearTimer">停止刷新</el-button>
  <div id="chart" :style="styleData">
  </div>
</div>
  
</template>
  
<style scoped>
  div#chart {
    padding-top: 20px;
  }
</style> 

<script>
import {request} from '../../network/request'
export default {
  name: "pie",
  data() {
    return {
      chart: null,
      timer: null,
      mainDom: null,
      styleData: {}
    }
  },

  props: {
    interval: Number,
    url: String,
    widthpx: {
      type: Number,
      default: 0
    },
    heightpx: {
      type: Number,
      default: 0,
    }
  },

  methods: {
    drawChart(option) {
      // 使用刚指定的配置项和数据显示图表。
      this.chart && this.chart.setOption(option, true);
    },

    initChart(dom) {
    // 基于准备好的dom，初始化echarts实例
      this.chart = this.$echarts.init(dom);
    },
    clearTimer() {
      clearInterval(this.timer);
    },
    setTimer() {
      this.timer = setInterval(() => {
        request({
        url: this.url
        }).then(res => {
          this.chart && this.drawChart(res.data);
        }).catch(err => {
          console.log(err);
        });
      }, this.interval);
    }
  },

  watch: {
    heightpx: {
      handler: function() {
        this.styleData = {
          height: this.heightpx + 'px',
          width: this.widthpx + 'px'
        }
      }
    },
    widthpx: {
      handler: function() {
        this.styleData = {
          height: this.heightpx + 'px',
          width: this.widthpx + 'px'
        }
      }
    }
  },
  updated() {
    // this.styleData = {
    //   height: this.heightpx + 'px',
    //   width: this.widthpx + 'px'
    // }

    !this.mainDom && (this.mainDom = document.getElementById("chart"));

    if(!this.chart){
      this.mainDom && this.initChart(this.mainDom)
      request({
      url: this.url
      }).then(res => {
        this.chart && this.drawChart(res.data);
      }).catch(err => {
        console.log(err);
      });
    }else {
      this.chart.resize();
    }

    //console.log('subupdated')
  },
}
</script>