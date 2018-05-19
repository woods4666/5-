/**
 * Created by Administrator on 2018/5/18.
 */

/*#banner1*/
let banner1Render=(function () {
    let banner1=document.querySelector('#banner1'),
        banImg=banner1.querySelector('.banImg'),
        focus=banner1.querySelector('.focus'),
        imgList=null,
        focusList=null,
        stepIndex=0,
        lastIndex=0,
        interval=5000,
        speed=200,
        autoTimer=null;

   let queryData=function () {
       return new Promise((resolve,reject)=>{
           let xhr=new XMLHttpRequest();
           xhr.open('get','json/banner1.json');
           xhr.onreadystatechange=function () {
             if (xhr.readyState===4&&xhr.status===200){
                 let data=JSON.parse(xhr.responseText);
                 resolve(data);
             }
           };
           xhr.send(null);
       })
   };

   let bindHTML=function (data) {
       let imgStr=``,
           focusStr=``;
       data.forEach((item,index)=>{
           let {img,desc}=item;
           imgStr+=`<li class=${index===0?'active':''}>
            <img src="${img}" alt="${desc}">
            <div class="downloadBox">
                <a href="#" class="download"><i></i>立即下载</a>
                <p>版本：10.0</p>
            </div>
        </li>`;
           focusStr+=`<li class="${index===0?'active':''}"></li>`;
       });
       banImg.innerHTML=imgStr;
       focus.innerHTML=focusStr;
       imgList=banImg.querySelectorAll('li');
       focusList=focus.querySelectorAll('li');
       console.log(imgList);
       let setHeight=function () {
           if (imgList.length!==0) {
               let imgH=imgList[0].offsetHeight;
               banImg.style.height=imgH+'px';
           }
       };
       setHeight();
       window.addEventListener('resize',setHeight);
   };

   let focusChange=function () {
       console.log('focus');
       let last=focusList[lastIndex],
           cur=focusList[stepIndex];
       console.log(last, cur);
        utils.css(last,'background','#ddd');
       utils.css(cur,'background','#fff');
      /*last.style.background='#000';
      cur.style.background='#fff';*/
   };

   let play=function () {
       let last=imgList[lastIndex],
           cur=imgList[stepIndex];
       utils.css(last,'z-index',0);
       utils.css(cur,'z-index',1);
       animate(cur,{opacity:1},speed);
       utils.css(last,'opacity',0);
       focusChange();
       lastIndex=stepIndex;
   };

   let autoPlay=function () {
       stepIndex++;
       if (stepIndex>=imgList.length){
           stepIndex=0;
       }
       play();
   };

   let handleFocus=function () {
     [].forEach.call(focusList,(curFocus,index)=>{
         curFocus.onmouseover=()=>{
             console.log('cur');
             stepIndex=index;
             play();
         }
     })
   };

   let handleBanner1=function () {
       banner1.onmouseenter=function () {
           clearInterval(autoTimer);
       };
       banner1.onmouseleave=function () {
           autoTimer=setInterval(autoPlay,interval);
       }
   };

   return {
      init:function () {
          let promise=queryData();
          promise.then(bindHTML).then(()=>{
              autoTimer=setInterval(autoPlay,interval);
              handleFocus();
              handleBanner1();
          });
      }
   }
})();
banner1Render.init();

/*#extension*/
let extensionRender=(function () {

   return {
      init:function () {

      }
   }
})();
extensionRender.init();


