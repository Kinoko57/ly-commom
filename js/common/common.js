import directive from './directive'
import verification from './verification'
import filter from '../filter/filter'
export default {
    ...directive,
    ...verification,
    ...filter,
    //获取当前日期
    getCurDate(days) {
        let curDateTime = new Date().getTime() + 1000 * 60 * 60 * 24 * (+days || 0); // days 前(-)或后(+)的天数
        let curDate = new Date(curDateTime);
        let year = curDate.getFullYear();
        let month = curDate.getMonth() + 1;
        let day = curDate.getDate();
        return `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`
    },
    //对象清除空格
    objClearSpace(parameter, exclude) {
        for (var key in parameter) {
            if (!key.includes(exclude)) {
                parameter[key] = `${parameter[key]} `.trim();
            }
        }
        return parameter;
    },
    //获取url参数
    getUrlParam(param) {
        let reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        let r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r != null) return unescape(r[2]); return ""; //返回参数值
    },
    //下载elx
    downloadXls(data, name) {
        if (data) {
            if ('msSaveOrOpenBlob' in window.navigator) {
                // window.URL.createObjectURL Blob URL无法在Microsoft IE和Edge中打开 
                window.navigator.msSaveOrOpenBlob(new Blob([data]), name);
            } else {
                let url = window.URL.createObjectURL(new Blob([data], { type: 'application/vnd.ms-excel' }))
                let link = document.createElement('a')
                link.style.display = 'none'
                link.href = url
                link.setAttribute('download', name)
                document.body.appendChild(link)
                link.click()
            }
        }
    },
    //计算倒计时
    countDown(startTime, endTime) {
        if (!endTime) return endTime;
        let date = new Date(endTime).getTime();
        let curDate = startTime ? new Date(startTime).getTime() : new Date().getTime();
        let interval = date - curDate;

        let days = `${parseInt(interval / 1000 / 60 / 60 / 24, 10)}`.padStart(2, '0'); //计算剩余的天数 
        let hours = `${parseInt(interval / 1000 / 60 / 60 % 24, 10)}`.padStart(2, '0'); //计算剩余的小时 
        let minutes = `${parseInt(interval / 1000 / 60 % 60, 10)}`.padStart(2, '0');//计算剩余的分钟 
        let seconds = `${parseInt(interval / 1000 % 60, 10)}`.padStart(2, '0');//计算剩余的秒数 
        return [days, hours, minutes, seconds];
    },
    //科学计数法
    calculationAccuracy(num1, num2, operation) {
        let m = 0;
        let s1 = num1 ? num1.toString() : "0";
        let s2 = num2 ? num2.toString() : "0";
        let r1 = s1.split(".")[1] ? s1.split(".")[1].length : 0;
        let r2 = s2.split(".")[1] ? s2.split(".")[1].length : 0;
        switch (operation) {
            case "add":
                m = Math.pow(10, Math.max(r1, r2));
                return (num1 * m + num2 * m) / m;
            case "sub":
                m = Math.pow(10, Math.max(r1, r2));
                let n = (r1 >= r2) ? r1 : r2;
                return ((num1 * m - num2 * m) / m).toFixed(n);
            case "mul":
                m += r1;
                m += r2;
                return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
            case "div":
                let t1 = Number(s1.replace(".", ""))
                let t2 = Number(s2.replace(".", ""))
                return this.calculationAccuracy((t1 / t2), Math.pow(10, r2 - r1), "mul");
        }
    },
    //判断设备
    judgmentEquipment() {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {//移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
            ios: !!u.match(/(i[^;]+;)( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            language: (navigator.browserLanguage || navigator.language).toLowerCase()
        };
    },
    // 解码，配合decodeURIComponent使用
    base64_decode(input) {
        var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9+/=]/g, "");
        while (i < input.length) {
            enc1 = base64EncodeChars.indexOf(input.charAt(i++));
            enc2 = base64EncodeChars.indexOf(input.charAt(i++));
            enc3 = base64EncodeChars.indexOf(input.charAt(i++));
            enc4 = base64EncodeChars.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        return this.utf8_decode(output);
    },
    // 编码，配合encodeURIComponent使用
    base64_encode(str) {
        var c1, c2, c3;
        var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var i = 0, len = str.length, strin = '';
        while (i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if (i == len) {
                strin += base64EncodeChars.charAt(c1 >> 2);
                strin += base64EncodeChars.charAt((c1 & 0x3) << 4);
                strin += "==";
                break;
            }
            c2 = str.charCodeAt(i++);
            if (i == len) {
                strin += base64EncodeChars.charAt(c1 >> 2);
                strin += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                strin += base64EncodeChars.charAt((c2 & 0xF) << 2);
                strin += "=";
                break;
            }
            c3 = str.charCodeAt(i++);
            strin += base64EncodeChars.charAt(c1 >> 2);
            strin += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            strin += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
            strin += base64EncodeChars.charAt(c3 & 0x3F)
        }
        return strin
    },
    // utf-8解码
    utf8_decode(utftext) {
        var string = '';
        let i = 0;
        let c = 0;
        let c1 = 0;
        let c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c1 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c1 & 63));
                i += 2;
            } else {
                c1 = utftext.charCodeAt(i + 1);
                c2 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c1 & 63) << 6) | (c2 & 63));
                i += 3;
            }
        }
        return string;
    },
    /*函数防抖  n秒后延迟执行*/
    debounce(fn, interval) {
        var timer;
        var gapTime = interval || 1000;//间隔时间，如果interval不传，则默认1000ms
        return function () {
            clearTimeout(timer);
            var context = this;
            var args = arguments;//保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
            timer = setTimeout(function () {
                fn.call(context, args);
            }, gapTime);
        };
    },
    /*函数节流 立马执行，n秒后再立马执行*/
    throttle(fn, interval) {
        var enterTime = 0;//触发的时间
        var gapTime = interval || 1000;//间隔时间，如果interval不传，则默认300ms
        return function () {
            var context = this;
            var backTime = new Date();//第一次函数return即触发的时间
            if (backTime - enterTime > gapTime) {
                fn.call(context, arguments);
                enterTime = backTime;//赋值给第一次触发的时间，这样就保存了第二次触发的时间
            }
        };
    },
}