<template>
  <div>
    <el-container :style="styleData" ref="mainContainer">
      <el-aside width="250px" style="background-color: rgb(238, 241, 246);">
          <el-menu :default-openeds="['1']" :default-active="'1-1'" @select="onSelect">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-data-analysis"></i>图表</template>
              <el-menu-item index="1-1"><i class="el-icon-s-data"></i>柱状图</el-menu-item>
              <el-menu-item index="1-2"><i class="el-icon-pie-chart"></i>折线图</el-menu-item>
              <el-menu-item index="1-3"><i class="el-icon-s-marketing"></i>饼状图</el-menu-item>
              <el-menu-item index="1-4"><i class="el-icon-s-grid"></i>散点图</el-menu-item>
            </el-submenu>
            <el-menu-item index="2"><i class="el-icon-setting"></i>设置</el-menu-item>
          </el-menu>
        </el-aside>
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-switch style="margin-right: 20px"
            v-model="autoFresh"
            active-text="自动刷新"
            inactive-text="停止刷新">
          </el-switch>
          <el-dropdown @command="switchMode">
            <i class="el-icon-s-opportunity" style="margin-right: 5px"></i>主题
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="light">浅色模式</el-dropdown-item>
              <el-dropdown-item command="dark">深色模式</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        
        <el-main id="mainContent">
          <barchart id="bar" v-if="chartType === 'bar'" :autoFresh="autoFresh" :widthpx="width" :heightpx="height" url="/api/data/chart">
          </barchart>
          <linechart id="line" v-else-if="chartType === 'line'" :autoFresh="autoFresh" :widthpx="width" :heightpx="height" url="/api/data/chart">
          </linechart>
          <piechart id="pie" v-else-if="chartType === 'pie'" :autoFresh="autoFresh" :widthpx="width" :heightpx="height" url="/api/data/chart">
          </piechart>
          <scatter id="pie" v-else-if="chartType === 'scatter'" :autoFresh="autoFresh" :widthpx="width" :heightpx="height" url="/api/dataset/chart">
          </scatter>
          <div id="setting" v-else-if="chartType === ''">这是设置页面</div>
         
          <!-- <chart v-else :interval="2000" url="/api/data/bar" :widthpx="width" :heightpx="height"></chart> -->
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
  import barchart from './bar'
  import linechart from './line'
  import piechart from './pie'
  import scatter from './scatter'
  export default {
    name: 'mainMenu',
    components: {
      piechart,
      barchart,
      linechart,
      scatter
    },
    data() {
      return {
        clientHeight: Number,
        styleData: {},
        chartOption: {},
        timer: null,
        width: 0,
        height: 0,
        chartType: 'bar',
        autoFresh: false
      }
    },
    mounted() {
      this.styleData = 'height:' + (document.documentElement.clientHeight-10) + 'px; ' + 'border: 1px solid #eee';
      window.onresize = () => {
        this.styleData = 'height:' + (document.documentElement.clientHeight-10) + 'px; ' + 'border: 1px solid #eee';
        
        this.width = document.getElementById("mainContent").clientWidth - 40;
        this.height = document.getElementById("mainContent").clientHeight - 40;
      }
    },
    updated() {
      this.width = document.getElementById("mainContent").clientWidth - 40;
      this.height = document.getElementById("mainContent").clientHeight - 40;
    },
    methods: {
      onSelect(index) {
        switch(index){
          case '1-1': this.chartType = 'bar';break;
          case '1-2': this.chartType = 'line';break;
          case '1-3': this.chartType = 'pie';break;
          case '1-4': this.chartType = 'scatter';break;
          default: this.chartType = '';break;
        }
      },
      switchMode(command){
        if((command === 'dark' && this.$store.state.dark === 0)
        || (command === 'light' && this.$store.state.dark === 1)){
          this.$store.commit('switchMode')
        }
        
      }
    },
  }
</script>