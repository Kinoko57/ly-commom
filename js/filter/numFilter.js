export default {
    //数字千分位
    numThousandth(num) {
        if (!num) return num;
        return num.toString().replace(/\d+/, function (n) { // 先提取整数部分
            return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) { // 对整数部分添加分隔符
                return $1 + ",";
            });
        });
    },
    //数字保留N位小数，默认2位
    numToFixed2(num, digit = 2) {
        if (isNaN(+num)) return num;
        return (+num).toFixed(digit);
    },
    //精度处理
    keepDecimals(str,num){
        let s = `${str}`;
        let arr = s.split(".");
        if(arr.length== 1){
            if(num == 0){
                return str;
            }
            return `${str}.${'0'.repeat(num)}`;
        }else{
            if(arr[1].length > num){
                if(num == 0){
                    return arr[0];
                }
                return `${arr[0]}.${arr[1].substring(0,num)}`
            }else{
                return `${arr[0]}.${arr[1]}${'0'.repeat(num - arr[1].length)}`
            }
        }
    },
}