<template>
    <div :class="className" :style="{height:height, width:width}"></div>
</template>

<script>
    import echarts from 'echarts'
    import 'echarts/theme/macarons'
    import { debounce } from '@/utils/tools'
    import dayjs from 'dayjs'
    import { getDeclareStatistics } from '../../api/api'

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
                default: '430px'
            },
            w: {
                type: Number
            }
        },
        watch: {
            height () {
                this.piechart && this.piechart.resize()
            },
            w () {
                this.piechart && this.piechart.resize()
            }
        },
        data () {
            return {
                chart: null
            }
        },
        mounted () {
            setTimeout(() => {
                this.initChart()
            }, 0)
            this.pieResizeHandle = debounce(() => {
                this.piechart ? this.piechart.resize() : null
            }, 50)
            window.addEventListener('resize', this.pieResizeHandle)
        },
        beforeDestroy () {
            this.piechart
                ? window.removeEventListener('resize', this.pieResizeHandle)
                : null
            this.piechart.dispose()
            this.piechart = null
        },
        methods: {
            initChart () {
                this.piechart = echarts.init(this.$el, 'macarons')
                let para = {
                    type: dayjs().format('YYYY-MM-DD')
                };
                getDeclareStatistics(para).then((res) => {
                    let newNum = 0, //新装数量
                        seriesNum = 0, //维修数量
                        removeNum = 0; //拆除数量
                    res.data.data.records.forEach((item, index) => {
                        if (item.key == "new_build_start") {//新装
                            newNum += parseInt(item.value);
                        }
                        if (item.key == "vindicate_remove_start") {//拆除
                            removeNum += parseInt(item.value);
                        }
                        if (item.key == "vindicate_start") {//维修
                            seriesNum += parseInt(item.value);
                        }
                    });
                    this.piechart.setOption({
                        tooltip: {
                            trigger: 'item',
                            formatter: '{a} <br/>{b} : {c} 单 ({d}%)'
                        },
                        legend: {
                            left: 'center',
                            bottom: '0',
                            data: ['新装', '拆除', '维修']
                        },
                        calculable: true,
                        series: [
                            {
                                name: '订单统计',
                                type: 'pie',
                                roseType: 'radius',
                                radius: [15, '70%'],
                                center: ['50%', '50%'],
                                data: [{
                                    value: newNum,
                                    name: '新装'
                                },
                                    {
                                        value: removeNum,
                                        name: '拆除'
                                    },
                                    {
                                        value: seriesNum,
                                        name: '维修'
                                    }],
                                animationEasing: 'cubicInOut',
                                animationDuration: 2600
                            }
                        ]
                    })

                });


            }
        }
    }
</script>
