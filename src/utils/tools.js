// 工具类方法
import { Message } from 'element-ui'
import province from './province.js'
import CryptoJS from 'crypto-js'//加密处理js
var SIGN_REGEXP = /([yMdhsm])(\1*)/g;

function padding(s, len) {
    var len = len - (s + '').length;
    for(var i = 0; i < len; i++) {
        s = '0' + s;
    }
    return s;
};


export const notify = function ({
                                    type = 'info',
                                    message = '',
                                    duration = 2000,
                                    showClose = false,
                                    onClose = function () {
                                    }
                                }) {
    Message({
        type,
        message,
        duration,
        showClose,
        onClose
    })
}

export const closeNotify = function () {
    Message.close()
}

export function debounce (func, wait = 1000, immediate = true) {
    let timeout
    let result
    return function (...args) {
        const context = this
        if (timeout) window.clearTimeout(timeout)
        if (immediate) {
            let callNow = !timeout
            timeout = setTimeout(() => {
                timeout = false
            }, wait)
            if (callNow) result = func.apply(context, args)
        } else {
            timeout = setTimeout(() => {
                func.apply(context, args)
            }, wait)
        }
        return result
    }
}

export const randomIntegerInRange = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min


//日期加减一天   days为1加一天  为负数加对应值
export function addReduceDate (days) {
    var date = new Date();
    var year, month, day;
    date.setDate(date.getDate() + days);
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    var s = year + '-' + (month < 10 ? ('0' + month) : month) + '-' + (day < 10 ? ('0' + day) : day);
    return s;
}

/*** 加密处理 ***/
export const encryption = (params) => {
    let {
        data,
        type,
        param,
        key
    } = params
    let result = JSON.parse(JSON.stringify(data))
    if (type === 'Base64') {
        param.forEach(ele => {
            result[ele] = btoa(result[ele])
        })
    } else {
        param.forEach(ele => {
            var data = result[ele]
            key = CryptoJS.enc.Latin1.parse(key)
            var iv = key
            var encrypted = CryptoJS.AES.encrypt(
                data,
                key,
                {
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.ZeroPadding
                }
            )
            result[ele] = encrypted.toString()
        })
    }
    return result
}



export default {
    beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        if (!isJPG && !isPNG) {
            this.$message.error('上传图片只能是 JPG或者PNG 格式!');
        }
        return isJPG || isPNG;
    },
    //数组倒序
    sortArray (array) {
        let temp = [],
            resList = array;
        for (var i = resList.length - 1; i > 0; i--) {
            temp.push(resList[i]);
        }
        return temp;
    },
    //树tree实现第三个参数为真 就选中所有子类状态
    setChecked (tree, data, checked, childCheck) {
        if (childCheck) {
            for (var i = 0, len = data.children.length; i < len; i++) {
                tree.setChecked(data.children[i].id, checked);
                if (data.children[i].children.length > 0) {
                    this.setChecked(tree, data.children[i], checked, childCheck);
                }
            }
        } else {
            tree.setChecked(data.id, checked);
        }
    },
    //树tree实现第三个参数为真 就选中所有子类状态 Vas Gis
    setCheckedTwo (tree, data, checked, childCheck) {
        if (childCheck) {
            for (var i = 0, len = data.children.length; i < len; i++) {
                tree.setChecked(data.children[i].id, checked);
                if (data.children[i].children.length > 0) {
                    this.setCheckedTwo(tree, data.children[i], checked, childCheck);
                }
            }
        } else {
            tree.setChecked(data.id, checked);
        }
    },
    //树tree实现第三个参数为真 就选中所有子类状态 分组
    setCheckedGroup (tree, data, checked, childCheck) {
        if (childCheck) {
            for (var i = 0, len = data.groups.length; i < len; i++) {
                tree.setChecked(data.groups[i].id, checked);
                if (!data.groups[i].groups == null) {
                    if (data.groups[i].groups.length > 0) {
                        this.setCheckedGroup(tree, data.groups[i], checked, childCheck);
                    }
                }
            }
        } else {
            tree.setChecked(data.id, checked);
        }
    },
    //判断当前数组中是否存在某个属性
    findElem (arrayToSearch, attr, val) {
        for (var i = 0; i < arrayToSearch.length; i++) {
            if (arrayToSearch[i][attr] == val) {
                return false;
            }
        }
        return true;
    },
    //自动生成批号
    getDateTime () {
        var d = new Date();
        var year = d.getFullYear() + "";
        var month = d.getMonth() + 1;
        var date = d.getDate();
        var day = d.getDay();
        var Hours = d.getHours();
        var Minutes = d.getMinutes();
        var Seconds = d.getSeconds();
        var c = year;
        c = month < 10 ? c + "0" + month : c + month;
        c = date < 10 ? c + "0" + date : c + date;
        c = Hours < 10 ? c + "0" + Hours : c + Hours;
        c = Minutes < 10 ? c + "0" + Minutes : c + Minutes;
        c = Seconds < 10 ? c + "0" + Seconds : c + Seconds;
        return c;
    },

    //获取当月最后一天
    getCurrentMonthLast () {
        var date = new Date();
        var currentMonth = date.getMonth();
        var nextMonth = ++currentMonth;
        var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
        var oneDay = 1000 * 60 * 60 * 24;
        return new Date(nextMonthFirstDay - oneDay);
    },
    //获取当月1号
    getDateMonthOne () {
        var date = new Date(),
            year = date.getYear() + 1900,
            month = date.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        return year + "-" + month + "-01";
    },
    //js转换金额为中文大写
    changeMoneyToChinese (money) {
        var cnNums = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); //汉字的数字
        var cnIntRadice = new Array("", "拾", "佰", "仟"); //基本单位
        var cnIntUnits = new Array("", "万", "亿", "兆"); //对应整数部分扩展单位
        var cnDecUnits = new Array("角", "分", "毫", "厘"); //对应小数部分单位
        //var cnInteger = "整"; //整数金额时后面跟的字符
        var cnIntLast = "元"; //整型完以后的单位
        var maxNum = 999999999999999.9999; //最大处理的数字

        var IntegerNum; //金额整数部分
        var DecimalNum; //金额小数部分
        var ChineseStr = ""; //输出的中文金额字符串
        var parts; //分离金额后用的数组，预定义
        if (money == "") {
            return "";
        }
        money = parseFloat(money);
        if (money >= maxNum) {
            $.alert('超出最大处理数字');
            return "";
        }
        if (money == 0) {
            //ChineseStr = cnNums[0]+cnIntLast+cnInteger;
            ChineseStr = cnNums[0] + cnIntLast
            //document.getElementById("show").value=ChineseStr;
            return ChineseStr;
        }
        money = money.toString(); //转换为字符串
        if (money.indexOf(".") == -1) {
            IntegerNum = money;
            DecimalNum = '';
        } else {
            parts = money.split(".");
            IntegerNum = parts[0];
            DecimalNum = parts[1].substr(0, 4);
        }
        if (parseInt(IntegerNum, 10) > 0) {//获取整型部分转换
            var zeroCount = 0,
                IntLen = IntegerNum.length;
            for (var i = 0; i < IntLen; i++) {
                var n = IntegerNum.substr(i, 1),
                    p = IntLen - i - 1,
                    q = p / 4,
                    m = p % 4;
                if (n == "0") {
                    zeroCount++;
                } else {
                    if (zeroCount > 0) {
                        ChineseStr += cnNums[0];
                    }
                    zeroCount = 0; //归零
                    ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
                }
                if (m == 0 && zeroCount < 4) {
                    ChineseStr += cnIntUnits[q];
                }
            }
            ChineseStr += cnIntLast;
            //整型部分处理完毕
        }
        if (DecimalNum != '') {//小数部分
            var decLen = DecimalNum.length;
            for (var i = 0; i < decLen; i++) {
                var n = DecimalNum.substr(i, 1);
                if (n != '0') {
                    ChineseStr += cnNums[Number(n)] + cnDecUnits[i];
                }
            }
        }
        if (ChineseStr == '') {
            //ChineseStr += cnNums[0]+cnIntLast+cnInteger;
            ChineseStr += cnNums[0] + cnIntLast;
        }
        /* else if( DecimalNum == '' ){
                        ChineseStr += cnInteger;
                        ChineseStr += cnInteger;
                    } */
        return ChineseStr;
    },
    //获取距离当前时间三年
    getDateThreeYers (date, num) {
        var pattern = "yyyy-MM-dd";
        return pattern.replace(SIGN_REGEXP, function ($0) {
            switch ($0.charAt(0)) {
                case 'y':
                    return padding(date.getFullYear() + num, $0.length);
                case 'M':
                    return padding(date.getMonth() + 1, $0.length);
                case 'd':
                    return padding(date.getDate(), $0.length);
                case 'w':
                    return date.getDay() + 1;
                case 'h':
                    return padding(date.getHours(), $0.length);
                case 'm':
                    return padding(date.getMinutes(), $0.length);
                case 's':
                    return padding(date.getSeconds(), $0.length);
            }
        });
    },
    // 随机数
    RndNum (n) {
        var rnd = "";
        for (var i = 0; i < n; i++) {
            rnd += Math.floor(Math.random() * 10);
        }
        return rnd;
    },
    getTimeAndRandom (n) {
        return this.getDateTime() + this.RndNum(n);
    },
    getQueryStringByName (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        var context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    },
    /* 初始化地址 */
    initProvince () {
        let prArry = [];
        province.forEach(function (obj) {
            let tmpobj = {},
                cityArry = [];
            tmpobj.label = obj.name;
            tmpobj.value = obj.name;
            obj.city.forEach(function (obj) {
                let tmpobj = {},
                    areaArry = [];
                tmpobj.label = obj.name;
                tmpobj.value = obj.name;
                obj.area.forEach(function (obj) {
                    let tmpobj = {};
                    tmpobj.label = obj;
                    tmpobj.value = obj;
                    areaArry.push(tmpobj);
                });
                tmpobj.children = areaArry;
                cityArry.push(tmpobj)
            });
            tmpobj.children = cityArry;
            prArry.push(tmpobj);
        });
        return prArry;
    },
    formatDate: {
        format (date, pattern) {
            var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
            var DEFAULT_PATTERN = 'yyyy-MM-dd';

            function padding (s, len) {
                var len = len - (s + '').length;
                for (var i = 0; i < len; i++) {
                    s = '0' + s;
                }
                return s;
            };
            pattern = pattern || DEFAULT_PATTERN;
            return pattern.replace(SIGN_REGEXP, function ($0) {
                switch ($0.charAt(0)) {
                    case 'y':
                        return padding(date.getFullYear(), $0.length);
                    case 'M':
                        return padding(date.getMonth() + 1, $0.length);
                    case 'd':
                        return padding(date.getDate(), $0.length);
                    case 'w':
                        return date.getDay() + 1;
                    case 'h':
                        return padding(date.getHours(), $0.length);
                    case 'm':
                        return padding(date.getMinutes(), $0.length);
                    case 's':
                        return padding(date.getSeconds(), $0.length);
                }
            });
        },
        parse (dateString, pattern) {
            var matchs1 = pattern.match(SIGN_REGEXP);
            var matchs2 = dateString.match(/(\d)+/g);
            if (matchs1.length == matchs2.length) {
                var _date = new Date(1970, 0, 1);
                for (var i = 0; i < matchs1.length; i++) {
                    var _int = parseInt(matchs2[i]);
                    var sign = matchs1[i];
                    switch (sign.charAt(0)) {
                        case 'y':
                            _date.setFullYear(_int);
                            break;
                        case 'M':
                            _date.setMonth(_int - 1);
                            break;
                        case 'd':
                            _date.setDate(_int);
                            break;
                        case 'h':
                            _date.setHours(_int);
                            break;
                        case 'm':
                            _date.setMinutes(_int);
                            break;
                        case 's':
                            _date.setSeconds(_int);
                            break;
                    }
                }
                return _date;
            }
            return null;
        },
        //获取字符串日期时间戳
        getDateStringTime (stringTime) {
            let timestamp = new Date(stringTime).getTime();
            return timestamp;
        }

    },


    //js转换小写
    changeToSmall (val) {
        return val.toLowerCase();
    },

    // 自定义加载Loading
    startLoading (_this, el) {
        let loading = _this.$loading({
            lock: true,
            text: '卖力加载中，请稍后~',
            spinner: 'el-icon-loading',
            target: document.querySelector(el),
        });
        return loading;
    },

    // 通过当前日期计算本周日期范围 - 周一日期
    getWeekScope (now) {
        var nowTime = now.getTime();
        var day = now.getDay();
        var oneDayLong = 24 * 60 * 60 * 1000;
        // 周一
        var MondayTime = nowTime - (day - 1) * oneDayLong;
        var monday = new Date(MondayTime);
        var year1 = monday.getFullYear();
        var month1 = monday.getMonth() + 1;
        var day1 = monday.getDate();
        var startTime = year1 + '/' + month1 + '/' + day1;
        // 周天
        var SundayTime = nowTime + (7 - day) * oneDayLong;
        var sunday = new Date(SundayTime);
        var year2 = sunday.getFullYear();
        var month2 = sunday.getMonth() + 1;
        var day2 = sunday.getDate();
        var endTime = year2 + '/' + month2 + '/' + day2;
        // 周一 至 周天
        var weekScope = startTime + ' ~ ' + endTime;
        return weekScope;
    },
    // 计算包含中文的字符串长度
    getChinaLength (str) {
        return str.replace(/[\u0391-\uFFE5]/g, "aa").length;
    },
    // 获取相对路径——文章管理
    // GetUrlRelativePath(url){
    // 　　　　var url = url.toString();
    // 　　　　var arrUrl = url.split("//");

    // 　　　　var start = arrUrl[1].indexOf("/");
    // 　　　　var relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符

    // 　　　　if(relUrl.indexOf("?") != -1){
    // 　　　　　　relUrl = relUrl.split("?")[0];
    // 　　　　}
    // 　　　　return relUrl;
    // },

    // 经纬度偏移
    transformWGStoGCJ (wgLon, wgLat) {
        var dLat = this.transformLat(wgLon - 105, wgLat - 35);
        var dLon = this.transformLon(wgLon - 105, wgLat - 35);
        var radLat = (wgLat / 180) * 3.1415926535897931;
        var magic = Math.sin(radLat);
        magic = 1.0 - 0.0066934216229659433 * magic * magic;
        var sqrtMagic = Math.sqrt(magic);
        dLat = (dLat * 180) / ((6335552.7170004258 / (magic * sqrtMagic)) * 3.1415926535897931);
        dLon = (dLon * 180) / ((6378245 / sqrtMagic) * Math.cos(radLat) * 3.1415926535897931);
        var mylonlat = new Array();
        mylonlat.push(wgLon + dLon, wgLat + dLat);
        console.log(mylonlat);
        return mylonlat;
    },
    transformLat (x, y) {
        var ret = -100 + 2 * x + 3 * y + 0.20000000000000001 * y * y + 0.10000000000000001 * x * y + 0.20000000000000001 * Math.sqrt(Math.abs(x));
        ret += ((20 * Math.sin(6 * x * 3.1415926535897931) + 20 * Math.sin(2 * x * 3.1415926535897931)) * 2) / 3;
        ret += ((20 * Math.sin(y * 3.1415926535897931) + 40 * Math.sin((y / 3) * 3.1415926535897931)) * 2) / 3;
        ret += ((160 * Math.sin((y / 12) * 3.1415926535897931) + 320 * Math.sin((y * 3.1415926535897931) / 30)) * 2) / 3;
        return ret;
    },
    transformLon (x, y) {
        var ret = 300 + x + 2 * y + 0.10000000000000001 * x * x + 0.10000000000000001 * x * y + 0.10000000000000001 * Math.sqrt(Math.abs(x));
        ret += ((20 * Math.sin(6 * x * 3.1415926535897931) + 20 * Math.sin(2 * x * 3.1415926535897931)) * 2) / 3;
        ret += ((20 * Math.sin(x * 3.1415926535897931) + 40 * Math.sin((x / 3) * 3.1415926535897931)) * 2) / 3;
        ret += ((150 * Math.sin((x / 12) * 3.1415926535897931) + 300 * Math.sin((x / 30) * 3.1415926535897931)) * 2) / 3;
        return ret;
    },
    //日期加减一天   days为1加一天  为负数加对应值
    addReduceDate(date, days) {
        var date = new Date(date);
        date.setDate(date.getDate() + days);
        return date;
    },
};

  

