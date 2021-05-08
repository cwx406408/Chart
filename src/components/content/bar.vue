<template>
  <div>
    <chart :widthpx="widthpx" :heightpx="heightpx" 
         url="/api/data/bar" :interval="2000">
    </chart>
  </div>
</template>
<style scoped>

</style>

<script>
import chart from '../common/chart';
export default {
  name: 'barChart',
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