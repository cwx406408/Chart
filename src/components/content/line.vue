<template>
  <div>
    <chart :widthpx="widthpx" :heightpx="heightpx" 
         url="/api/data/line" :interval="2000">
    </chart>
  </div>
</template>
<style scoped>

</style>

<script>
import chart from '../common/chart';
export default {
  name: 'lineChart',
  components: {
    chart
  },
  props: {
    widthpx: {
      type: Number,
      default: 0
    },
    heightpx: {
      type: Number,
      default: 0,
    }
  }
}
</script>