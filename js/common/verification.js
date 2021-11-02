export default {
    //验证正整数包含0
    positiveIntVer(num, start = 1) {
        let reg = new RegExp(`^([${start}-9]\\d*|[0]{1,1})$`);
        return reg.test(num);
    },
    // 验证是否是中文
    isChina(value) {
        const reg = /^[\u4E00-\u9FA5]{2,4}$/
        return reg.test(value)
    },
    // 验证身份证号
    isIdCard(value) {
        const reg =
            /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
        return reg.test(value)
    },
    //验证手机号
    mobileVer(mobile) {
        return /^1\d{10}$/.test(mobile);
    },
    //验证银行卡号
    bankCardVer(bnkCard) {
        return /^(\d{16}|\d{17}|\d{19})$/.test(bnkCard);
    },
    //验证正浮点数
    keepDecimalVer(num, digit = 2) {
        let reg = new RegExp(`^\\d+(\\.\\d{1,${digit}})?$`);
        return reg.test(num);
    },
    //验证只包含字母和数字
    letterNumberVer(str) {
        return /^[a-zA-Z0-9]+$/.test(str);
    },
    //验证邮箱
    emailVer(str) {
        return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(str);
    },
    // 验证端口号
    isPort(value) {
        const reg =
            /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
        return reg.test(value)
    },
    // 验证网站
    isUrl(url) {
        const reg =
            /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
        return reg.test(url)
    },
    // 验证Ip
    isIP(ip) {
        const reg =
          /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
        return reg.test(ip)
      }
}