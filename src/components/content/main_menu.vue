<template>
  <div>
    <el-container :style="styleData" ref="mainContainer">
      <el-aside width="250px" style="background-color: rgb(238, 241, 246);">
          <el-menu :default-openeds="['1']" :default-active="'1-1'" @select="onSelect">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-data-analysis"></i>图表</template>
              <el-menu-item index="1-1"><i class="el-icon-s-data"></i>柱状图</el-menu-item>
              <el-menu-item index="1-2"><i class="el-icon-pie-chart"></i>饼状图</el-menu-item>
              <el-menu-item index="1-3"><i class="el-icon-s-marketing"></i>折线图</el-menu-item>
            </el-submenu>
            <el-menu-item index="2"><i class="el-icon-setting"></i>设置</el-menu-item>
          </el-menu>
        </el-aside>
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>主题
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>浅色模式</el-dropdown-item>
              <el-dropdown-item>深色色模式</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        
        <el-main id="mainContent">
          <div id="mainChart" @resize="resize"></div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }

  .charts {
    width: 100%;
    height: 100%;
  }

</style>

<script>
  import {request} from '../../network/request'
  export default {
    name: 'mainMenu',
    data() {
      return {
        clientHeight: Number,
        styleData: {},
        myChart: null,
        chartOption: {}
      }
    },
    mounted() {
      this.styleData = 'height:' + (document.documentElement.clientHeight-10) + 'px; ' + 'border: 1px solid #eee';
      
      window.onresize = function temp() {
        this.styleData = 'height:' + (document.documentElement.clientHeight-10) + 'px; ' + 'border: 1px solid #eee';
        const mainChart = document.getElementById("mainChart")

        mainChart.style.width = (document.getElementById("mainContent").clientWidth - 40) + 'px';
        mainChart.style.height = (document.getElementById("mainContent").clientHeight - 40) + 'px';
        let ev = new Event('resize');
        mainChart.dispatchEvent(ev);
      }

    },
    methods: {
      drawChart(option) {
        // 使用刚指定的配置项和数据显示图表。
        this.myChart && this.myChart.setOption(option);
      },

      initChart() {
      // 基于准备好的dom，初始化echarts实例
        this.myChart = this.$echarts.init(document.getElementById("mainChart"));
      },

      onSelect(index) {
        if(index === '1-1'){
          request({
          url: '/api/data/bar'
          }).then(res => {
            this.myChart && this.myChart.setOption(res.data, true);
          }).catch(err => {
            console.log(err);
          });
        
        }else if(index === '1-2'){
          request({
          url: '/api/data/pie'
          }).then(res => {
            this.myChart && this.myChart.setOption(res.data, true);
          }).catch(err => {
            console.log(err);
          });

        }else if(index === '1-3'){
          request({
          url: '/api/data/line'
          }).then(res => {
            this.myChart && this.myChart.setOption(res.data, true);
          }).catch(err => {
            console.log(err);
          });
        }else{
          request({
          url: '/api/data/bar'
          }).then(res => {
            this.myChart && this.myChart.setOption(res.data, true);
          }).catch(err => {
            console.log(err);
          });
        }
      },

      resize() {
        this.myChart.resize({
          animation: {
            duration: 1000,
            easing: 'linear'
          }
        });
      }
    },

    updated() {
      const mainChart = document.getElementById("mainChart")
      mainChart.style.width = (document.getElementById("mainContent").clientWidth - 40) + 'px';
      mainChart.style.height = (document.getElementById("mainContent").clientHeight - 40) + 'px';

      if(!this.myChart){
        this.initChart();
        request({
        url: '/api/data/bar'
        }).then(res => {
          this.myChart && this.myChart.setOption(res.data, true);
        }).catch(err => {
          console.log(err);
        });
      }else {
        this.myChart.resize();
      }
    },
  }
</script>