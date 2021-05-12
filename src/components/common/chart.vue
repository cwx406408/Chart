<template>
<div>
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
export default {
  name: "chart",
  data() {
    return {
      chart: null,
      mainDom: null,
      styleData: {},
    }
  },

  computed: {
    mode() {
      if(this.$store.state.dark === 0){
        return 'light';
      }

      return 'dark';
    }

  },

  props: {
    widthpx: {
      type: Number,
      default: 0
    },
    heightpx: {
      type: Number,
      default: 0,
    },
    options: {}
  },
  methods: {
    drawChart(option) {
      // 使用刚指定的配置项和数据显示图表。
      this.chart && this.chart.setOption(option, true);
    },

    initChart(dom) {
    // 基于准备好的dom，初始化echarts实例
      this.chart = this.$echarts.init(dom, this.mode);
    }
  },

  watch: {
    heightpx: {
      handler: function() {
        this.styleData = {
          height: this.heightpx + 'px',
          width: this.widthpx + 'px'
        }
        //this.chart && this.chart.resize();
      }
    },
    widthpx: {
      handler: function() {
        this.styleData = {
          height: this.heightpx + 'px',
          width: this.widthpx + 'px'
        }
        //this.chart && this.chart.resize();
      }
    },
    options: {
      handler: function() {
        this.chart && this.drawChart(this.options);
      }
    },
    mode: {
      handler: function() {
        this.chart && this.$echarts.dispose(this.chart);
        this.mainDom && this.initChart(this.mainDom);
        this.chart && this.drawChart(this.options);
      }
    }
  },
  mounted() {
    this.mainDom = document.getElementById("chart");

    if(!this.chart){
      this.mainDom && this.initChart(this.mainDom);
    }

    this.styleData = {
      height: this.heightpx + 'px',
      width: this.widthpx + 'px'
    }
  },

  updated() {
    this.chart && this.chart.resize({
      animation: {
        duration: 500,
        easing: 'linear'
      }
    });
  },
  beforeDestroy() {
    this.chart && this.$echarts.dispose(this.chart);
  }
}
</script>