import Mock, { Random } from 'mockjs'

//使用mockjs模拟数据
Mock.mock('/api/data/bar', {
  ret: 0,
  data: {
    series:{
      name: "销量",
      type: "bar",
      data: [ 
        Random.natural(1, 100),
        Random.natural(1, 100),
        Random.natural(1, 100),
        Random.natural(1, 100),
        Random.natural(1, 100),
        Random.natural(1, 100)
      ]
    },
    title: {
      text: "ECharts 入门示例",
      left: 'center'
    },
    xAxis: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
    },
    yAxis: {},
    legend: {
      data: ["销量"],
      left: 'left'
    },
    tooltip: {
      trigger: 'axis'
    }
  }
});

//使用mockjs模拟数据
Mock.mock('/api/data/line', {
  ret: 0,
  data: {
    series:{
      name: "销量",
      type: "line",
      data: [ 
        Random.natural(1, 100),
        Random.natural(1, 100),
        Random.natural(1, 100),
        Random.natural(1, 100),
        Random.natural(1, 100),
        Random.natural(1, 100)
      ]
    },
    title: {
      text: "ECharts 入门示例",
      left: 'center'
    },
    xAxis: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
    },
    yAxis: {},
    legend: {
      data: ["销量"],
      left: 'left'
    },
    tooltip: {
      trigger: 'axis'
    }
  }
});

Mock.mock('/api/data/pie', {
  "ret": 0,
  data: {
    series:{
      name: "销量",
      type: "pie",
      data: [ 
        {name:"衬衫", value:Random.natural(1, 100)},
        {name:"羊毛衫", value:Random.natural(1, 100)},
        {name:"雪纺衫", value:Random.natural(1, 100)},
        {name:"裤子", value:Random.natural(1, 100)},
        {name:"高跟鞋", value:Random.natural(1, 100)},
        {name:"袜子", value:Random.natural(1, 100)}
      ]
    },
    title: {
      text: "ECharts 入门示例",
      left: 'center'
    },
    xAxis: null,
    yAxis: null,
    legend: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      orient: 'vertical',
      left: "left"
    },
    tooltip: {
      trigger: 'item'
    }
  }
});