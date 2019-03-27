import axios from 'axios'
import { getToken } from '@/utils/auth'
import echarts from 'echarts';
export default {
    name: "entryExitStatistics",
    data() {
        return {
            inOutStockData:[],//出入库趋势图
            screenWidth: window.innerWidth,
            selectForm:{
                storagenameFour:[0],//出入库趋势图
                prodFour:'B',////出入库趋势图
            },
            storages: [],//当前登录人的库房——级联树
            props:{
                value:'id',
                label:'name',
                children:'children'
            },
            storagesFour:[{
                value: 'B',
                label: '全部物资'
              }, {
                value: 'P',
                label: '设备'
              }, {
                value: 'C',
                label: '卡'
              }, {
                value: 'A',
                label: '配件'
              }]
        }
    },
    methods: {
        getClientWidth() {
            $('#h5_entryExitStatistics').css("width", document.body.clientWidth + 'px');
        },
        // 出入库趋势统计
        inOutStockCount (storageID,prod) {
            console.log(storageID)
            let params = {
                storageid : storageID == undefined ? 0 : storageID,
                    type: prod == undefined ? 'B' : prod,
            }
            let url = '/sto/stoStat/query/inout'
            axios({
                method: 'get',
                url,
                params: params,
                headers: {
                    'Authorization': 'Bearer ' + getToken()
                },
            }).then((res) => {
                console.log(res);
                this.inOutStockData = res.data.data
                this.chartColumnFuc();//加载图表
            }).catch((error) => {
                console.log(error)
            })
        },
        handleChangeFour(value) {
            this.inOutStockCount(this.selectForm.storagenameFour[this.selectForm.storagenameFour.length-1],this.selectForm.prodFour);
        },
        handleChange(value) {
            this.stoProdCount(value[value.length-1]);
        },
        // 选择物资时
        chooseProd(value) {
            this.inOutStockCount(this.selectForm.storagenameFour[this.selectForm.storagenameFour.length-1],value);
        },
        getStorages(){
            let url = '/sto/stoStat/query/storageTree'
            axios({
                method: 'get',
                url,
                headers: {
                    'Authorization': 'Bearer ' + getToken()
                }
            }).then((res) => {
                this.storages=this.getTreeData(res.data.data);// 调用递归方法，去除级联数据后将数据赋值给级联选择器
            }).catch((error) => {
            })
        },
        
        // 递归方法，处理级联选择器最后一级为空数组的bug
        getTreeData(data){
            for(var i=0;i<data.length;i++){
                if(data[i].children.length<1){
                    data[i].children=undefined;// children若为空数组，则将children设为undefined
                }else {
                    this.getTreeData(data[i].children);// children若不为空数组，则继续 递归调用 本方法
                }
            }
            return data;
        },
        chartColumnFuc(){
            var that=this;
            var myChart = echarts.init(document.getElementById('entryExitStatistics'));
            let timescope = this.inOutStockData.map((item, index) => {
                return item.createdate;
            });
            let instoData = this.inOutStockData.map((item, index) => {
                return item.numberin;
            });
            let outstoData = this.inOutStockData.map((item, index) => {
                return item.numberout;
            });
           
            let option={
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    x: 40,
                    x2: 40,
                    left:'15%'
                },
                legend: {
                    data: ['入库量', '出库量'],
                },
                calculable: true,
                dataZoom: {
                    show: true,
                    realtime: false,
                    startValue:dayjs(timescope[timescope.length-1]).subtract(7, 'day').format('YYYY-MM-DD'),//开始日期-前7天
                    endValue:dayjs(timescope[timescope.length-1]).format('YYYY-MM-DD')
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: true,
                    data: timescope
                }],
                yAxis: [{
                    type: 'value'
                }],
                series: [{
                        name: '入库量',
                        type: 'line',
                        smooth: true,
                        data: instoData
                    },
                    {
                        name: '出库量',
                        type: 'line',
                        smooth: true,
                        data: outstoData
                    }
                ]
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
        this.inOutStockCount();//获取库存统计数据
    },
    watch: {
        screenWidth(val) {
           this.getClientWidth();
        }
    }
}