<template>
  <div>
    <chart :widthpx="widthpx" :heightpx="heightpx" :options="options">
    </chart>
  </div>
</template>
<style scoped>

</style>

<script>
import chart from '../common/chart';
import {request} from '../../network/request'
export default {
  name: 'scatterChart',
  components: {
    chart
  },
  data() {
    return {
      options: {},
      timer: null
    }
  },
  props: {
    interval: {
      type: Number,
      default: 2000
    },
    url: '',
    widthpx: {
      type: Number,
      default: 0
    },
    heightpx: {
      type: Number,
      default: 0,
    },
    autoFresh: false
  },

  methods: {
    createData(url) {
      //请求数据
      request({
        url: url
      }).then(res => {
        
        //组装数据
        this.options = {
          dataset: {
            dimensions: ['Year', 'Amount'],
            source: res.dataset.source
          },
          series: [{
            //name: "demo",
            type: "scatter",
            symbolSize: function(params){
                return (params[0] * 10) + (params[1] * 0.01);
              },
            encode: {
                x: 'Year',
                y: 'Amount',
                tooltip: [0, 1]
            },         
          }],
          title: {
            text: "ECharts Demo",
            left: 'center'
          },
          xAxis: [{type: 'value', name: res.dataset.dimensions[0], axisLabel: {rotate: 50, interval: 0}}],
          yAxis: [{type: 'value', name: res.dataset.dimensions[1]}],
          
          tooltip: {}
        };
      }).catch(err => {
        console.log(err);
      });
    },

    clearTimer() {
      if(this.timer){
        clearInterval(this.timer);
        this.timer = null;
      }
    },

    setTimer() {
      if(!this.timer){
        this.timer = setInterval(() => {
          this.createData(this.url);
        }, this.interval);
      }
    },

    setAutoFresh(isAuto) {
      if(isAuto){
        this.setTimer();
      }else{
        this.clearTimer()
      }
    }
  },
  mounted() {
    this.createData(this.url);
    this.setAutoFresh(this.autoFresh);
  },
  watch: {
    autoFresh: function(newValue) {
      this.setAutoFresh(newValue);
    }
  }
}
</script>