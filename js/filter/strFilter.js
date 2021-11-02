export default {
    //字符串脱敏
    strDesensitization(str, start, end) {
        if (!str || (start + end) > str.length) return str;
        return `${str.substring(0, start)}${'*'.repeat(str.length - (start + end))}${str.substring(str.length - end)}`
    }
}