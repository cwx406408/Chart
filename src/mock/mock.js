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