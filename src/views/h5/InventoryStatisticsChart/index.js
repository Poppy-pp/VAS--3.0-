// import { getStoProdCount,getStorages } from './service'
import axios from 'axios'
import { getToken } from '@/utils/auth'
import echarts from 'echarts';
export default {
    name: "inventoryStatistics",
    data() {
        return {
            stoProdData: {},//库存统计
            screenWidth: window.innerWidth,
            selectForm:{
                storagename:[0],//库存统计-——级联选择器显示
            },
            storages: [],//当前登录人的库房——级联树
            props:{
                value:'id',
                label:'name',
                children:'children'
            },
        }
    },
    methods: {
        getClientWidth() {
            $('#h5_inventoryStatistics').css("width", document.body.clientWidth + 'px');
        },
        // 库存统计
        stoProdCount (storageID) {
            console.log(storageID)
            let params = {
                storageId: storageID == undefined ? 0 : storageID
            }
            let url = '/sto/stoStat/query/storageProductStatistics'
            axios({
                method: 'get',
                url,
                params: params,
                headers: {
                    'Authorization': 'Bearer ' + getToken()
                }
            }).then((res) => {
                this.stoProdData = res.data.data
                this.chartColumnFuc();//加载图表
            }).catch((error) => {
            })
        },
        // 级联选择器选择库房——库存统计
        handleChange(value) {
            this.stoProdCount(value[value.length-1]);
        },
        getStorages(){
            let url = '/sto/stoStat/query/storageTree'
            axios({
                method: 'get',
                url,
                headers: {
                    'Authorization': 'Bearer ' + getToken()
                },
                responseType: 'blob',//下载文件
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
            /*库存统计 start*/
            var myChart = echarts.init(document.getElementById('inventoryStatistics'));
            let value1 = this.stoProdData.wiredProdcutNum,
                value2 = this.stoProdData.wifiProductNum,
                value3 = this.stoProdData.cardNum,
                value4 = this.stoProdData.partsNum,
                value1_insto = this.stoProdData.wiredProdcutNum_INSTO,//有线在库
                value1_onway = this.stoProdData.wiredProdcutNum_ONWAY,//有线在途
                value2_insto = this.stoProdData.wifiProductNum_INSTO,//无线在库
                value2_onway = this.stoProdData.wifiProductNum_ONWAY,//无线在途
                value3_insto = this.stoProdData.cardNum_INSTO,//卡在库
                value3_onway = this.stoProdData.cardNum_ONWAY;//卡在途
            let option = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'center',
                    data: ['有线','无线','卡','配件'],
                    orient :'horizontal'
                },
                series : [
                    {
                        name: '库存数量',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:[
                            {value:value1, name:'有线'},
                            {value:value2, name:'无线'},
                            {value:value3, name:'卡'},
                            {value:value4, name:'配件'},
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            myChart.resize();
            window.addEventListener('resize', () => {
               myChart.resize();
            })
        },
        //获取传过来得token
        getToken(){

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
        this.stoProdCount();//获取库存统计数据
    },
    created() {
        this.getToken();
    },
    watch: {
        screenWidth(val) {
           this.getClientWidth();
        }
    }
}