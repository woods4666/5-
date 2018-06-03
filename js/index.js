/**
 * Created by Administrator on 2018/5/18.
 */

/*#banner1*/
let banner1Render = (function () {
    let banner1 = document.querySelector('#banner1'),
        banImg = banner1.querySelector('.banImg'),
        focus = banner1.querySelector('.focus'),
        imgList = null,
        focusList = null,
        stepIndex = 0,
        lastIndex = 0,
        interval = 5000,
        speed = 200,
        autoTimer = null;

    let queryData = function () {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('get', 'json/banner1.json');
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    let data = JSON.parse(xhr.responseText);
                    resolve(data);
                }
            };
            xhr.send(null);
        })
    };

    let bindHTML = function (data) {
        let imgStr = ``,
            focusStr = ``;
        data.forEach((item, index) => {
            let {img, desc} = item;
            imgStr += `<li class=${index === 0 ? 'active' : ''}>
            <img src="${img}" alt="${desc}">
            <div class="downloadBox">
                <a href="#" class="download"><i></i>立即下载</a>
                <p>版本：10.0</p>
            </div>
        </li>`;
            focusStr += `<li class="${index === 0 ? 'active' : ''}"></li>`;
        });
        banImg.innerHTML = imgStr;
        focus.innerHTML = focusStr;
        imgList = banImg.querySelectorAll('li');
        focusList = focus.querySelectorAll('li');
        let setHeight = function () {
            if (imgList.length !== 0) {
                let imgH = imgList[0].offsetHeight;
                banImg.style.height = imgH + 'px';
            }
        };
        setHeight();
        window.addEventListener('resize', setHeight);
    };

    let focusChange = function () {
        let last = focusList[lastIndex],
            cur = focusList[stepIndex];
        utils.css(last, 'background', '#ddd');
        utils.css(cur, 'background', '#fff');
        /*last.style.background='#000';
         cur.style.background='#fff';*/
    };

    let play = function () {
        let last = imgList[lastIndex],
            cur = imgList[stepIndex];
        utils.css(last, 'z-index', 0);
        utils.css(cur, 'z-index', 1);
        animate(cur, {opacity: 1}, speed);
        utils.css(last, 'opacity', 0);
        focusChange();
        lastIndex = stepIndex;
    };

    let autoPlay = function () {
        stepIndex++;
        if (stepIndex >= imgList.length) {
            stepIndex = 0;
        }
        play();
    };

    let handleFocus = function () {
        [].forEach.call(focusList, (curFocus, index) => {
            curFocus.onmouseover = () => {
                stepIndex = index;
                play();
            }
        })
    };

    let handleBanner1 = function () {
        banner1.onmouseenter = function () {
            clearInterval(autoTimer);
        };
        banner1.onmouseleave = function () {
            autoTimer = setInterval(autoPlay, interval);
        }
    };

    return {
        init: function () {
            let promise = queryData();
            promise.then(bindHTML).then(() => {
                autoTimer = setInterval(autoPlay, interval);
                handleFocus();
                handleBanner1();
            });
        }
    }
})();
banner1Render.init();

/*#extension*/
let extensionRender = (function () {
    let extension = document.querySelector('#extension'),
        banImg = extension.querySelector('.banImg'),
        focus = extension.querySelector('.focus'),
        imgList = null,
        focusList = null,
        iList=[];
        everyWidth = 500,
        moveLeft = null,
        stepIndex = -1,
        newLen = null,
        autoTimer = null,
        focusTimer = null,
        interval = 3000,
        speed = 600;
    let queryData = function () {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('get', 'json/extension.json');
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    let data = JSON.parse(xhr.responseText);
                    resolve(data);
                }
            };
            xhr.send(null);
        })
    };
    let bindHTML = function (data) {
        let imgStr = ``,
            focusStr = ``,
            len = data.length,
            firstImg = null,
            lastImg = null,
            secondImg = null,
            recSecondImg = null;
        data.forEach((curData, index) => {
            let {desc, icon, id, img, keyword} = curData,
                imgItem = `<li>
            <img src="${img}" alt="">
            <div class="info clearfix">
                <div class="infoImg">
                    <img src="${icon}" alt="">
                    <p>${keyword}</p>
                </div>
                <div class="info-desc">
                    ${desc}
                </div>
            </div>
        </li>`;
            imgStr += imgItem;
            focusStr += `<span><i></i></span>`;
            if (index === 0) {
                firstImg = imgItem;
                return;
            }
            if (index === 1) {
                secondImg = imgItem;
                return;
            }
            if (index === len - 2) {
                recSecondImg = imgItem;
                return;
            }
            if (index === len - 1) lastImg = imgItem;
        });
        banImg.innerHTML = recSecondImg + lastImg + imgStr + firstImg + secondImg;
        focus.innerHTML = focusStr;
        imgList = banImg.querySelectorAll('li');
        focusList = focus.querySelectorAll('span');
        [].forEach.call(focusList,(item,index)=>{
            iList.push(item.querySelector('i'));
        });
        let marginRight = utils.css(imgList[0], 'marginRight');
        newLen = imgList.length;
        utils.css(banImg, 'width', everyWidth * newLen + marginRight * (newLen - 1));
        moveLeft = everyWidth + marginRight;
    };

    let focusChange = function () {
        let time = 0,
            curSpan = focusList[stepIndex],
            curI = curSpan.querySelector('i');
        [].forEach.call(focusList, (item, index) => {
            if (index !== stepIndex) {
                let curIt = item.querySelector('i');
                curIt.style.width = 0;
            }
        });
        clearInterval(focusTimer);
        focusTimer = setInterval(() => {
            time += 17;
            if (time >= interval) {
                curI.style.width = '100%';
                clearInterval(focusTimer);
                return;
            }
            curI.style.width = time / interval * 100 + '%';
            // console.log(utils.css(curI, 'width'));

        }, 17)

    };
    let slideChange = function () {
        // console.log(stepIndex);
        animate(banImg, {left: -stepIndex * moveLeft}, speed);
    };

    let autoMove = function () {
        stepIndex++;
        // console.log(1,stepIndex);
        if (stepIndex > newLen - 5) {
            utils.css(banImg, 'left', 600);
            stepIndex = 0;
        }
        focusChange();

        // console.log(stepIndex);
        slideChange();
    };

    let handleFocus = function () {
        [].forEach.call(focusList, (item, index) => {
            item.onmouseenter = () => {
                if (stepIndex === index) return;
                iList.forEach((item,iIndex)=>{
                    let curI=iList[iIndex];
                    if (index===iIndex){
                        utils.css(curI,'width','100%');
                        return;
                    }
                    utils.css(curI,'width',0);

                });
                clearInterval(autoTimer);
                autoTimer=null;
                clearInterval(focusTimer);
                stepIndex = index;
                slideChange();
            };
            item.onmouseleave = () => {
                // console.log(autoTimer);

                autoTimer||(autoTimer = setInterval(autoMove, interval));
                // autoTimer = setInterval(autoMove, interval);
                console.log(autoTimer,'set');
            }
        });
    };

    return {
        init: function () {
            let promise = queryData();
            promise.then(bindHTML).then(() => {
                autoMove();
                autoTimer = setInterval(autoMove, interval);
                handleFocus();
            })
        }
    }
})();
extensionRender.init();


