<template>
  <div class="about">
    <h1>This is bar page</h1>
    <div>
      <e-chart :options="bar"></e-chart>
    </div>
  </div>
</template>

<script>
import ECharts from "vue-echarts/components/ECharts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/dataset";

export default {
  components: {
    "e-chart": ECharts
  },

  data() {
    return {
      bar: {
        title: { text: "柱状图 example" },
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ["Product", "2015", "2016", "2017"],
            ["Matcha Latte", ...randomize()],
            ["Milk Tea", ...randomize()],
            ["Cheese Cocoa", ...randomize()],
            ["Walnut Brownie", ...randomize()]
          ]
        },
        xAxis: { type: "category" },
        yAxis: {},
        series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }]
      }
    };
  }
};

function randomize() {
  return [0, 0, 0].map(() => Math.round(300 + Math.random() * 700) / 10);
}
</script>