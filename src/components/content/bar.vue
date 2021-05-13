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
  name: 'barChart',
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
        
        let tempData = [];
        let tempLegendData = [];

        res.data.forEach(element => {
          tempData.push(element.value);
          tempLegendData.push(element.name);
        });

        //组装数据
        this.options = {
          series: [{
            label: {
            show: true,
            // 标签的文字。
              formatter: '{c}'
            },
            name: "销量",
            type: "bar",
            data: tempData,
          }],
          title: {
            text: "ECharts Demo",
            left: 'center'
          },
          xAxis: {
          type: 'category',
          data: tempLegendData
          },
          yAxis: {
              type: 'value'
          },
      
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