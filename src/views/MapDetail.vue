<template>
  <e-charts ref="chart" :options="map" @click="handleClick" @dblclick="handleDbClick"></e-charts>
</template>

<script>
import ECharts from "vue-echarts/components/ECharts";
import "echarts/lib/chart/map";
import "echarts/lib/component/geo";
import "echarts/lib/component/title";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/toolbox";

import china from "@/china.json";
import cityMap from "@/map/cityMap.json";

const provinces = {
  // 23个省
  // 台湾: "taiwan", // 没有地图
  河北: "hebei",
  山西: "shanxi",
  辽宁: "liaoning",
  吉林: "jilin",
  黑龙江: "heilongjiang",
  江苏: "jiangsu",
  浙江: "zhejiang",
  安徽: "anhui",
  福建: "fujian",
  江西: "jiangxi",
  山东: "shandong",
  河南: "henan",
  湖北: "hubei",
  湖南: "hunan",
  广东: "guangdong",
  海南: "hainan",
  四川: "sichuan",
  贵州: "guizhou",
  云南: "yunnan",
  陕西: "shanxi1",
  甘肃: "gansu",
  青海: "qinghai",
  // 5个自治区
  新疆: "xinjiang",
  广西: "guangxi",
  内蒙古: "neimenggu",
  宁夏: "ningxia",
  西藏: "xizang",
  // 4个直辖市
  北京: "beijing",
  天津: "tianjin",
  上海: "shanghai",
  重庆: "chongqing",
  // 2个特别行政区
  香港: "xianggang",
  澳门: "aomen"
};

const special = ["北京", "天津", "上海", "重庆", "香港", "澳门"];
let mapdata = [];

ECharts.registerMap("china", china);

const stack = ["china"];
const registeredMap = ["china"];

export default {
  components: {
    ECharts
  },
  data() {
    return {
      ECharts,
      timer: null,
      map: {
        title: {
          text: "ECharts4 中国地图下钻"
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}"
        },
        geo: {
          map: "china"
        },
        animationDuration: 1000,
        animationEasing: "cubicOut",
        animationDurationUpdate: 1000,
        series: [
          {
            name: "地图",
            type: "map",
            roam: false,
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: "#999",
                  fontSize: 13
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  color: "#fff",
                  fontSize: 13
                }
              }
            },
            itemStyle: {
              normal: {
                areaColor: "#323c48",
                borderColor: "dodgerblue"
              },
              emphasis: {
                areaColor: "darkorange"
              }
            },
            data: []
          }
        ]
      }
    };
  },
  methods: {
    mockData() {
      return [];
    },
    handleClick(params) {
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        //如果点击的是34个省、市、自治区，绘制选中地区的二级地图
        if (params.name in provinces) {
          const provinceName = provinces[params.name];
          try {
            if (!registeredMap.includes(provinceName)) {
              const { data: province } = await this.axios.get(
                `/map/province/${provinceName}.json`
              );

              ECharts.registerMap(provinceName, province);
              registeredMap.push(provinceName);
            }
            stack.push(provinceName);
            this.map.geo.map = provinceName;
          } catch (e) {
            console.log(e);
          }
          return;
        }

        // 显示县级地图
        const cityName = cityMap[params.name];
        if (!cityName) return;
        if (!registeredMap.includes(cityName)) {
          const { data: city } = await this.axios.get(
            `/map/city/${cityName}.json`
          );
          ECharts.registerMap(cityName, city);
          registeredMap.push(cityName);
        }
        this.map.geo.map = cityName;

        stack.push(cityName);
        return;
      }, 200);
    },

    // 双击返回上一层级
    async handleDbClick() {
      this.timer && clearTimeout(this.timer);
      if (stack.length === 1) {
        return;
      }
      stack.pop();
      const provinceName = stack[stack.length - 1];
      this.map.geo.map = provinceName;
    }
  }
};
</script>

<style scoped>
</style>