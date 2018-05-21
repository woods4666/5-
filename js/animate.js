/**
 * Created by Administrator on 2018/5/5.
 */
let utils = (function () {
    //=>获取样式
    let getCss = (ele, attr) => {
        let val = null,
            reg = /^-?\d+(\.\d+)?(px|rem|em)?$/;
        if ('getComputedStyle' in window) {
            val = window.getComputedStyle(ele)[attr];
            if (reg.test(val)) {
                val = parseFloat(val);
            }
        }
        return val;
    };

    //=>设置样式
    let setCss = (ele, attr, value) => {
        if (!isNaN(value)) {
            if (!/^(opacity|zIndex)$/.test(attr)) {
                value += 'px';
            }
        }
        ele['style'][attr] = value;
    };

    //=>批量设置样式
    let setGroupCss = (ele, options) => {
        for (let attr in options) {
            if (options.hasOwnProperty(attr)) {
                setCss(ele, attr, options[attr]);
            }
        }
    };

    //=>合并为一个
    let css = (...arg) => {
        let len = arg.length,
            fn = getCss;
        if (len >= 3) {
            fn = setCss;
        }
        if (len === 2 && typeof arg[1] === 'object') {
            fn = setGroupCss;
        }
        return fn(...arg);
    };


    let each = (obj, callback) => {
        if ('length' in obj) {
            for (let i = 0; i < obj.length; i++) {
                let item = obj[i],
                    res = callback && callback.call(item, i, item);
                if (res === false) {
                    break;
                }
            }
            return;
        }
        for (let attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                let item = obj[attr],
                    res = callback && callback.call(item, attr, item);
                if (res === false) {
                    break;
                }
            }
        }
    };

    return {css, each}
})();

~function () {
    let effect = {Linear: (t, d, c, b) => t / d * c + b};
    window.animate = function animate(ele, target, duration = 1000, callback) {
        if (typeof duration === 'function') {
            callback = duration;
            duration = 1000;
        }
        let begin = {}, change = {};
        let time = 0;
        utils.each(target, (key, value) => {
            begin[key] = utils.css(ele, key);
            change[key] = value - begin[key];
        });
        clearInterval(ele.animateTimer);
        ele.animateTimer = setInterval(() => {
            time += 17;
            if (time >= duration) {
                clearInterval(ele.animateTimer);
                /*utils.each(target,(key,value)=>{
                 utils.css(ele,key,value)
                 })*/
                utils.css(ele, target);
                callback && callback();
                return;
            }
            utils.each(target, (key) => {
                let cur = effect.Linear(time, duration, change[key], begin[key]);
                utils.css(ele, key, cur);
            })
        }, 17)
    }
}();

/*
 let utils = (function () {
 let getCss = function (ele, attr) {
 let reg = /^-?\d+(?:px|em|rem|pt)?$/i;
 if ('getComputedStyle' in window) {
 let val = getComputedStyle(ele)[attr];
 if (reg.test(val)) {
 val = parseFloat(val);
 }
 return val;
 }
 };
 let setCss = function (ele, attr, value) {
 let reg = /^(?:fontSize|width|height|lineHeight|(?:(?:margin|padding)?(?:top|bottom|left|right)?))$/i;
 reg.test(attr) ? value += 'px' : null;
 ele.style[attr] = value;
 };
 let setGroupCss = function (ele, options) {
 for (var key in options) {
 if (!options.hasOwnProperty(key)) break;
 setCss(ele, key, options[key]);
 }
 };
 let css = function (...arg) {
 let fn = getCss;
 let len = arg.length;
 if (len >= 3) fn = setCss;
 if (len === 2 && typeof arg[1] === 'object') fn = setGroupCss;
 return fn(...arg);
 };
 let each = function (obj, callback) {
 if ('length' in obj) {
 for (let i = 0; i < obj.length; i++) {
 let item = obj[i],
 res=callback && callback.call(item, item, i);
 if (res===false) break;
 }
 } else {
 for (let attr in obj) {
 if (!obj.hasOwnProperty(attr)) break;
 let value=obj[attr],
 res=callback && callback.call(value, value, attr);
 if (res===false) break;
 }
 }
 };
 return {
 css,
 each
 }
 })();

 ~function () {
 let effect = function (t, d, c, b) {
 return t / d * c + b;
 };
 window.animate = function (ele, target, duration = 1000, callback) {
 if (typeof duration === 'function') {
 callback = duration;
 duration = 1000;
 }
 let begin = {},
 change = {},
 time = null,
 interval = 17;
 utils.each(target, (value, key) => {
 begin[key] = utils.css(ele, key);
 change[key] = value - begin[key];
 });
 clearInterval(ele.animateTimer);
 ele.animateTimer = setInterval(() => {
 time += interval;
 if (time >= duration) {
 /!*utils.each(target,(value,attr)=>{
 utils.css(ele,attr,value);
 });*!/
 clearInterval(ele.animateTimer);
 utils.css(ele, target);
 callback && callback();
 return;
 }
 utils.each(target, (value, attr) => {
 let curVal = effect(time, duration, change[attr], begin[attr]);
 utils.css(ele, attr, curVal);
 });
 }, interval);
 }
 }();
 */



