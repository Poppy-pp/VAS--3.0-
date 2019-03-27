import axios from 'axios'
import {
    getToken
} from '@/utils/auth'
import echarts from 'echarts';
export default {
    name: "inventoryStatistics",
    data() {
        return {
            outStockData: [], //出库统计
            screenWidth: window.innerWidth,
            selectForm: {
                outboundstoragename: [0], //出库统计
                outboundmonth: dayjs().format('YYYY-MM'), //出库统计
            },
            storages: [], //当前登录人的库房——级联树
            props: {
                value: 'id',
                label: 'name',
                children: 'children'
            },
        }
    },
    methods: {
        getClientWidth() {
            $('#h5_outboundStatistical').css("width", document.body.clientWidth + 'px');
        },
        // 出库统计
        outStockCount(storageID, date) {
            let params = {
                storageid: storageID == undefined ? 0 : storageID,
                date: date
            }
            let url = '/sto/stoStat/query/outstock/count'
            axios({
                method: 'get',
                url,
                params: params,
                headers: {
                    'Authorization': 'Bearer ' + getToken()
                }
            }).then((res) => {
                this.outStockData = res.data.data
                this.chartColumnFuc(); //加载图表
            }).catch((error) => {})
        },
        getStorages() {
            let url = '/sto/stoStat/query/storageTree'
            axios({
                method: 'get',
                url,
                headers: {
                    'Authorization': 'Bearer ' + getToken()
                },
                responseType: 'blob', //下载文件
            }).then((res) => {
                this.storages = this.getTreeData(res.data.data); // 调用递归方法，去除级联数据后将数据赋值给级联选择器
            }).catch((error) => {})
        },
        // 递归方法，处理级联选择器最后一级为空数组的bug
        getTreeData(data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].children.length < 1) {
                    data[i].children = undefined; // children若为空数组，则将children设为undefined
                } else {
                    this.getTreeData(data[i].children); // children若不为空数组，则继续 递归调用 本方法
                }
            }
            return data;
        },
        handleChangeStorage(value) { //出库统计——选择库房
            this.outStockCount(value[value.length - 1], dayjs(this.selectForm.outboundmonth).format('YYYY-MM'));
        },
        handleDate(value) { //出库统计——选择日期
            this.outStockCount(this.selectForm.outboundstoragename[this.selectForm.outboundstoragename.length - 1], dayjs(value).format('YYYY-MM'));
        },
        chartColumnFuc() {
            var that = this;
            /*库存统计 start*/
            var myChart = echarts.init(document.getElementById('outboundStatistical'));
            let installData = this.outStockData == null ? 0 : this.outStockData[0].value,
                lossData = this.outStockData == null ? 0 : this.outStockData[1].value,
                allocationData = this.outStockData == null ? 0 : this.outStockData[2].value;
            let option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    bottom: -5,
                    left: 'center',
                    data: ['安装量', '损失量', '调拨出库量']
                },
                series: [{
                    name: '出库统计',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [{
                            value: installData,
                            name: '安装量'
                        },
                        {
                            value: lossData,
                            name: '损失量'
                        },
                        {
                            value: allocationData,
                            name: '调拨出库量'
                        },
                    ],
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            myChart.resize();
            window.addEventListener('resize', () => {
                myChart.resize();
            })
        }
    },
    mounted() {
        const that = this
        this.getClientWidth();
        window.onresize = () => {
            return (() => {
                this.screenWidth = window.innerWidth
            })()
        }
        this.getStorages();
        this.outStockCount(); //获取库存统计数据
    },
    watch: {
        screenWidth(val) {
            this.getClientWidth();
        }
    }
}