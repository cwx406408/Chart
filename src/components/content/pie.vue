<template>
  <div>
    <el-button @click="setTimer">自动刷新</el-button>
    <el-button @click="clearTimer">停止刷新</el-button>
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
  name: 'pieChart',
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
      default: 1000
    },
    url: '',
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
    createPieData(url) {
      //请求数据
      request({
        url: url
      }).then(res => {
        
        //组装数据
        this.options = {
          series: [{
            name: "销量",
            type: "pie",
            data: res.data,
            radius: '70%'
          }],
          title: {
            text: "ECharts Demo",
            left: 'center'
          },
          xAxis: null,
          yAxis: null,
          legend: {
            orient: 'vertical',
            left: "left"
          },
          tooltip: {
            trigger: 'item'
          }
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
          this.createPieData(this.url);
        }, this.interval);
      }
    }
  },
  mounted() {
    this.createPieData(this.url);
  },
}
</script>