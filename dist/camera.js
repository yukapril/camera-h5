!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.Camera=e()}(this,function(){"use strict";var t=function(t){return"string"==typeof t&&(t=document.querySelector(t)),t},e=function(t){var e=t.opts||{};t.opts={type:e.type||"image/jpeg,image/png"}},i=function(t){var e=document.createElement("input");e.type="file",e.accept="image/*",e.setAttribute("capture","camera"),e.style.position="absolute",e.style.top="0",e.style.left="0",e.style.display="block",e.style.width="100%",e.style.height="100%",e.style.opacity="0",t.input=e},n=function(t){t.el.appendChild(t.input)},a=function(t,e){var i=new FileReader;i.readAsDataURL(t),i.onload=function(t){e&&e(t.target.result),i=null}},r=function(t){var e=t.split(",")[1];return(e=e.replace(/=/g,"")).length/4*3},o=function(t,e){var i=new Image;i.src=t,i.onload=function(){e&&e({width:i.width,height:i.height,size:r(t),base64:t,img:i}),i=null}},h=function(t,e){return t.split(",").indexOf(e)>=0},u=function(t){t.input.addEventListener("change",function(e){var i=e.target.files;if(i.length>0){var n=i[0],r=n.type,u=n.name,l=n.lastModified,f=n.size;if(!h(t.opts.type,r))return void t.errorFn.call(t._self,{type:"type",err:"Illegal type: "+r});a(n,function(e){o(e,function(i){t.events.forEach(function(t){return t({name:u,type:r,size:f,width:i.width,height:i.height,lastModified:l,base64:e})})})})}})},l=function(t,e,i,n){o(t,function(t){var a=document.createElement("canvas"),o=a.getContext("2d");a.width=t.width*i,a.height=t.height*i,o.fillStyle="#fff",o.fillRect(0,0,a.width,a.height),o.drawImage(t.img,0,0,a.width,a.height);var h=a.toDataURL("image/jpeg",e);n&&n({width:a.width,height:a.height,base64:h,size:r(h)}),a=null})},f=(function(){function t(t){this.value=t}function e(e){function i(a,r){try{var o=e[a](r),h=o.value;h instanceof t?Promise.resolve(h.value).then(function(t){i("next",t)},function(t){i("throw",t)}):n(o.done?"return":"normal",o.value)}catch(t){n("throw",t)}}function n(t,e){switch(t){case"return":a.resolve({value:e,done:!0});break;case"throw":a.reject(e);break;default:a.resolve({value:e,done:!1})}(a=a.next)?i(a.key,a.arg):r=null}var a,r;this._invoke=function(t,e){return new Promise(function(n,o){var h={key:t,arg:e,resolve:n,reject:o,next:null};r?r=r.next=h:(a=r=h,i(t,e))})},"function"!=typeof e.return&&(this.return=void 0)}"function"==typeof Symbol&&Symbol.asyncIterator&&(e.prototype[Symbol.asyncIterator]=function(){return this}),e.prototype.next=function(t){return this._invoke("next",t)},e.prototype.throw=function(t){return this._invoke("throw",t)},e.prototype.return=function(t){return this._invoke("return",t)}}(),function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}),c=function a(r,o){f(this,a),(r=t(r)).style.position="relative";var h={_self:this,el:r,opts:o,input:null,events:[],errorFn:null};e(h),i(h),n(h),u(h),this.$$data=h};return function(t){t.prototype.error=function(t){return this.$$data.errorFn=t,this}}(c),function(t){t.prototype.on=function(t){var e=this.$$data.events;return"function"==typeof t&&e.push(t),this},t.prototype.off=function(t){var e=this.$$data.events;return t||(this.$$data.events=[]),"function"==typeof t&&(this.$$data.events=e.filter(function(e){return e!==t})),this}}(c),function(t){t.getSize=function(t){return r(t)}}(c),function(t){t.getImgInfo=function(e,i){return o(e,i),t}}(c),function(t){t.compress=function(t,e,i){var n={maxLength:e.maxLength||1920,maxSize:e.maxSize||307200,quality:e.quality||.9},a={size:null,width:null,height:null,base64:null},r={radioMax:1,radioMin:0,radio:null},h=function(e,i){l(t,n.quality,e,function(t){r.radio=e,a.size=t.size,a.width=t.width,a.height=t.height,a.base64=t.base64,a.width<=n.maxLength&&a.height<=n.maxLength&&a.size<=n.maxSize?r.radioMin=e:r.radioMax=e;var o=n.maxSize-a.size>0&&n.maxSize-a.size<.05*n.maxSize;i&&i(o)})},u=0,f=function t(){var e=(r.radioMax+r.radioMin)/2;h(e,function(e){e?i&&i(a):u<8?(u++,t()):i&&i(a)})};o(t,function(e){e.width<=n.maxLength&&e.height<=n.maxLength&&e.size<=n.maxSize?l(t,n.quality,1,function(t){t.size<e.size?i&&i(t):(delete e.img,i&&i(e))}):l(t,n.quality,1,function(t){t.size<n.maxSize?i&&i(t):f()})})}}(c),function(t){t.rotate=function(e,i,n){if(0!==i&&90!==i&&180!==i&&270!==i&&360!==i)throw Error("[Camera] Camera.rotate direction value is: 0 | 90 | 180 | 270 | 360.");return o(e,function(t){var e=document.createElement("canvas"),a=e.getContext("2d");switch(i){case 90:e.width=t.height,e.height=t.width,a.fillStyle="#fff",a.fillRect(0,0,e.width,e.height),a.translate(t.height,0),a.rotate(i*Math.PI/180),a.drawImage(t.img,0,0,e.height,e.width);break;case 180:e.width=t.width,e.height=t.height,a.fillStyle="#fff",a.fillRect(0,0,e.width,e.height),a.translate(t.width,t.height),a.rotate(i*Math.PI/180),a.drawImage(t.img,0,0,e.width,e.height);break;case 270:e.width=t.height,e.height=t.width,a.fillStyle="#fff",a.fillRect(0,0,e.width,e.height),a.translate(0,t.width),a.rotate(i*Math.PI/180),a.drawImage(t.img,0,0,e.height,e.width);break;case 0:case 360:e.width=t.width,e.height=t.height,a.fillStyle="#fff",a.fillRect(0,0,e.width,e.height),a.translate(0,0),a.rotate(i*Math.PI/180),a.drawImage(t.img,0,0,e.width,e.height)}var r=e.toDataURL("image/jpeg",1);n&&n(r),e=null}),t}}(c),c});
