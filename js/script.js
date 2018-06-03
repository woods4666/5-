{
    let fixedBtn = document.querySelector('#fixed-btn');
    window.addEventListener('scroll', function () {
        if (document.documentElement.scrollTop > 360) {
            console.log(1);
            fixedBtn.style.display = 'block';
        } else {
            fixedBtn.style.display = 'none';
        }
    })
}; {
    let offset = function (el) {
        let parent = el.parentNode,
            l = el.offsetTop;
        while (parent && parent !== document) {
            l += parent.offsetTop;
            parent = parent.parentNode;
        }
        return l;
    }
    let tsItem = document.querySelectorAll('.ts-bot'),
        ary = Array.from(tsItem),
        winH = document.documentElement.clientHeight;
    window.onscroll = function () {
        let ts = tsItem[1];
        if (ts.className.indexOf('ts-start') >= 0) return;
        let sc = document.documentElement.scrollTop;
        ary.forEach(item => {
            if ((sc + winH) >= offset(item)) {
                item.classList.add('ts-start');
            }
        })
    }
}