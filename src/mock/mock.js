import Mock, { Random } from 'mockjs'

//使用mockjs模拟数据
Mock.mock('/api/data/chart', option => {
  return {
    ret: 0,
    data: [ 
      {name:"衬衫", value:Random.natural(1, 100)},
      {name:"羊毛衫", value:Random.natural(1, 100)},
      {name:"雪纺衫", value:Random.natural(1, 100)},
      {name:"裤子", value:Random.natural(1, 100)},
      {name:"高跟鞋", value:Random.natural(1, 100)},
      {name:"袜子", value:Random.natural(1, 100)}
    ]
  }
});

//使用mockjs模拟数据
Mock.mock('/api/dataset/chart', option => {
  let arr = ['Year', 'Amount']
  for(let i=0; i<100; i++){
    arr.push([Random.float(0, 0), Random.natural(100, 1000)])
  }
  return {
    ret: 0,
    dataset: {
      dimensions: ['Year', 'Amount'],
      source: arr
    },
  }
});