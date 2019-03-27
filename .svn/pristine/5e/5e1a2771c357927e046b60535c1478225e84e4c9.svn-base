<template>
    <div
            :class="className"
            :style="{height: height,width: width}">
    </div>
</template>

<script>
    import echarts from 'echarts'
    import 'echarts/theme/macarons'
    import { debounce, addReduceDate } from '@/utils/tools'
    import { getoaHomeBarStartList, getoaHomeBarEndList } from '../../api/api'


    export default {
        props: {
            className: {
                type: String,
                default: 'chart'
            },
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '380px'
            },
            autoResize: {
                type: Boolean,
                default: true
            },
            chartData: {
                type: Object
            },
            w: {
                type: Number
            }
        },
        data () {
            return {
                chart: null,
                updatefn: null
            }
        },
        mounted () {
            setTimeout(() => {
                this.initChart()
            }, 0)
            if (this.autoResize) {
                this.chartResizeHandle = debounce(() => {
                    this.chart ? this.chart.resize() : null
                }, 50)
                window.addEventListener('resize', this.chartResizeHandle)
            }

            const sidebarElm = document.getElementsByClassName('el-aside')[0]
            sidebarElm.addEventListener('transitionend', this.chartResizeHandle)
        },
        beforeDestroy () {
            this.chart && this.autoResize
                ? window.removeEventListener('resize', this.chartResizeHandle)
                : null

            const sidebarElm = document.getElementsByClassName('el-aside')[0]
            sidebarElm
                ? sidebarElm.removeEventListener('transitionend', this.chartResizeHandle)
                : null

            this.chart.dispose()
            this.chart = null
            clearInterval(this.updatefn)
        },
        watch: {
            chartData: {
                deep: true,
                handler (val) {
                    // this.setChartOptions(val)
                }
            },
            height () {
                this.chart && this.chart.resize()
            },
            w () {
                this.chart && this.chart.resize()
            }
        },
        methods: {
            initChart () {
                this.chart = echarts.init(this.$el, 'macarons')
                let para = {
                    showCount: 10000,
                    type: 'new_build_start'
                };
                //获取开始的订单
                getoaHomeBarStartList(para).then((res) => {
                    let yearData = [],
                        barData = [],
                        lineData = [];
                    res.data.data.records.forEach((item, index) => {
                        yearData.push(item.key);
                        lineData.push(item.value);
                    });
                    //获取完成的订单
                    let para = {
                        showCount: 10000
                    };
                    getoaHomeBarEndList(para).then((res) => {
                        res.data.data.records.forEach((item, index) => {
                            barData.push(item.value);
                        });
                        this.chart.setOption({
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'cross'
                                },
                                padding: [5, 10]
                            },
                            grid: {
                                left: 10,
                                right: 10,
                                bottom: 20,
                                top: 30,
                                containLabel: true
                            },
                            legend: {
                                data: ['新报订单', '完成订单'],
                            },
                            calculable: true,
                            dataZoom: {
                                show: true,
                                realtime: false,
                                startValue: addReduceDate(-20),
                            },
                            xAxis: {
                                type: 'category',
                                data: yearData,
                                boundaryGap: true,
                                axisTick: {
                                    show: false
                                }
                            },
                            yAxis: {
                                type: 'value',
                                axisTick: {
                                    show: false
                                }
                            },
                            series: [
                                {
                                    name: '新报订单',
                                    itemStyle: {
                                        normal: {
                                            color: '#FF005A',
                                            lineStyle: {
                                                color: '#FF005A',
                                                width: 2
                                            }
                                        }
                                    },
                                    smooth: true,
                                    type: 'line',
                                    data: lineData,
                                    animationDuration: 2800,
                                    animationEasing: 'cubicInOut'
                                },
                                {
                                    name: '完成订单',
                                    smooth: true,
                                    type: 'line',
                                    itemStyle: {
                                        normal: {
                                            color: '#3888fa',
                                            lineStyle: {
                                                color: '#3888fa',
                                                width: 2
                                            },
                                            areaStyle: {
                                                color: '#f3f8ff'
                                            }
                                        }
                                    },
                                    data: barData,
                                    animationDuration: 2800,
                                    animationEasing: 'quadraticOut'
                                }
                            ]
                        });
                    });
                });
            }
        }
    }
</script>
