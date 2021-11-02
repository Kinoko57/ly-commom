export default {
    //拖拽指令 value是距离DOM顶部的有效拖拽像素
    drag(el, binding) {
        el.onmousedown = (e) => {
            //如果鼠标点击的位置在标题块中则执行拖拽
            if (e.clientY <= el.offsetTop + binding.value) {
                //算出鼠标相对元素的位置
                let disX = e.clientX - el.offsetLeft;
                let disY = e.clientY - el.offsetTop;
                document.onmousemove = (e) => {
                    //移动当前元素
                    el.style.left = `${e.clientX - disX}px`;
                    el.style.top = `${e.clientY - disY}px`;
                };
                document.onmouseup = (e) => {
                    if(e.clientY - disY < 0){
                        el.style.top = 0;
                    }
                    if(e.clientX - disX < 0){
                        el.style.left = 0;
                    }
                    if(el.offsetTop + el.offsetHeight > $(document).height()){
                        el.style.top = `${$(document).height() - el.offsetHeight}px`;
                    }
                    if(el.offsetLeft + el.offsetWidth > $(document).width()){
                        el.style.left = `${$(document).width() - el.offsetWidth}px`;
                    }
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            }
        }
    }
}