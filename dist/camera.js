!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.Camera=e()}(this,function(){"use strict";var t=function(t){var e=t.split(",")[1];return(e=e.replace(/=/g,"")).length/4*3},e=function(e,i){var n=new Image;n.src=e,n.onload=function(){i&&i({width:n.width,height:n.height,size:t(e),base64:e,img:n}),n=null}},i=function e(i,n,a,r){n.limit--,n.limit<0?r&&r(n.validImgInfo):function(e,i,n){var a=i.quality,r=e.width,o=e.height,h=e.ratio,f=e.img,u=document.createElement("canvas"),l=u.getContext("2d");u.width=r*h,u.height=o*h,l.fillStyle="#fff",l.fillRect(0,0,u.width,u.height),l.drawImage(f,0,0,u.width,u.height);var s=u.toDataURL("image/jpeg",a),c=u.width,g=u.height;u=null,n&&n({width:c,height:g,base64:s,size:t(s)})}(n,i,function(t){t.size<=i.maxSize&&i.maxSize-t.size<=i.maxSize*i.offsetRatio?r&&r(t):t.size<=i.maxSize?n.ratio>.9?r&&r(t):(n.ratioMin=n.ratio,n.ratio=(n.ratioMax+n.ratio)/2,n.validImgInfo=t,e(i,n,!1,r)):(n.ratioMax=n.ratio,n.ratio=(n.ratioMin+n.ratio)/2,a&&(n.maxImgBase64=t.base64,n.ratio=.5,n.ratioMin=0,n.ratioMax=1),e(i,n,!1,r))})},n=(function(){function t(t){this.value=t}function e(e){function i(a,r){try{var o=e[a](r),h=o.value;h instanceof t?Promise.resolve(h.value).then(function(t){i("next",t)},function(t){i("throw",t)}):n(o.done?"return":"normal",o.value)}catch(t){n("throw",t)}}function n(t,e){switch(t){case"return":a.resolve({value:e,done:!0});break;case"throw":a.reject(e);break;default:a.resolve({value:e,done:!1})}(a=a.next)?i(a.key,a.arg):r=null}var a,r;this._invoke=function(t,e){return new Promise(function(n,o){var h={key:t,arg:e,resolve:n,reject:o,next:null};r?r=r.next=h:(a=r=h,i(t,e))})},"function"!=typeof e.return&&(this.return=void 0)}"function"==typeof Symbol&&Symbol.asyncIterator&&(e.prototype[Symbol.asyncIterator]=function(){return this}),e.prototype.next=function(t){return this._invoke("next",t)},e.prototype.throw=function(t){return this._invoke("throw",t)},e.prototype.return=function(t){return this._invoke("return",t)}}(),function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),(e=function(t){return"string"==typeof t&&(t=document.querySelector(t)),t}(e)).style.position="relative";var n={_self:this,el:e,opts:i,input:null,events:[],errorFn:null};!function(t){var e=t.opts||{};t.opts={type:e.type||"image/jpeg"}}(n),function(t){var e=document.createElement("input");e.type="file",e.setAttribute("accept","image/*"),e.setAttribute("capture","camera"),e.style.position="absolute",e.style.top="0",e.style.left="0",e.style.display="block",e.style.width="100%",e.style.height="100%",e.style.opacity="0",t.input=e}(n),function(t){t.el.appendChild(t.input)}(n),function(t){t.input.addEventListener("change",function(e){var i=e.target.files;if(i.length>0){var n=i[0],a=n.type;if(!function(t,e){return t.split(",").indexOf(e)>=0}(t.opts.type,a))return void t.errorFn.call(t._self,{type:"type",err:"Illegal type: "+a});!function(t,e){var i=new FileReader;i.readAsDataURL(t),i.onload=function(t){var n=t.target.result;i=null,e&&e(n)}}(n,function(e){t.events.forEach(function(t){return t(e,n)})})}})}(n),this.$$data=n});return function(t){t.prototype.error=function(t){return this.$$data.errorFn=t,this}}(n),function(t){t.prototype.on=function(t){var e=this.$$data.events;return"function"==typeof t&&e.push(t),this},t.prototype.off=function(t){var e=this.$$data.events;return t||(this.$$data.events=[]),"function"==typeof t&&(this.$$data.events=e.filter(function(e){return e!==t})),this}}(n),function(e){e.getSize=function(e){return t(e)}}(n),function(t){t.getImgInfo=function(i,n){return e(i,n),t}}(n),function(t){t.compress=function(n,a,r){var o={maxLength:a.maxLength||1920,maxSize:a.maxSize||307200,quality:a.quality||.8,offsetRatio:a.offsetRatio||.2},h={ratio:1,ratioMax:1,ratioMin:0,limit:5,validImgInfo:"",maxImgBase64:"",width:0,height:0,img:null};return e(n,function(t){if(h.maxImgBase64=t.base64,h.width=t.width,h.height=t.height,h.img=t.img,t.width<=o.maxLength&&t.height<=o.maxLength)t.size<=o.maxSize?r&&r(t):i(o,h,!1,r);else{var e=Math.max(t.width,t.height);h.ratio=h.ratioMax=o.maxLength/e,i(o,h,!0,r)}}),t}}(n),function(t){t.rotate=function(i,n,a){if(90===n||180===n||270===n)e(i,function(t){var e=document.createElement("canvas"),i=e.getContext("2d");switch(n){case 90:e.width=t.height,e.height=t.width,i.fillStyle="#fff",i.fillRect(0,0,e.width,e.height),i.translate(t.height,0),i.rotate(n*Math.PI/180),i.drawImage(t.img,0,0,e.height,e.width);break;case 180:e.width=t.width,e.height=t.height,i.fillStyle="#fff",i.fillRect(0,0,e.width,e.height),i.translate(t.width,t.height),i.rotate(n*Math.PI/180),i.drawImage(t.img,0,0,e.width,e.height);break;case 270:e.width=t.height,e.height=t.width,i.fillStyle="#fff",i.fillRect(0,0,e.width,e.height),i.translate(0,t.width),i.rotate(n*Math.PI/180),i.drawImage(t.img,0,0,e.height,e.width);break;case 0:case 360:e.width=t.width,e.height=t.height,i.fillStyle="#fff",i.fillRect(0,0,e.width,e.height),i.translate(0,0),i.rotate(n*Math.PI/180),i.drawImage(t.img,0,0,e.width,e.height)}var r=e.toDataURL("image/jpeg",.9);e=null,a&&a(r)});else{if(0!==n&&360!==n)throw Error("[Camera] Camera.rotate direction value is: 0 | 90 | 180 | 270 | 360.");a&&a(i)}return t}}(n),n});
