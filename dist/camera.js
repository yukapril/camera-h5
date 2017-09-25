!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.Camera=e()}(this,function(){"use strict";var t=function(t){return"string"==typeof t&&(t=document.querySelector(t)),t},e=function(t){var e=t.opts||{};t.opts={type:e.type||"image/jpeg,image/png"}},n=function(t){var e=document.createElement("input");e.type="file",e.accept="image/*",e.setAttribute("capture","camera"),e.style.position="absolute",e.style.top="0",e.style.left="0",e.style.display="block",e.style.width="100%",e.style.height="100%",e.style.opacity="0",t.input=e},i=function(t){t.el.appendChild(t.input)},o=function(t,e){var n=new FileReader;n.readAsDataURL(t),n.onload=function(t){e&&e(t.target.result),n=null}},r=function(t){var e=t.split(",")[1];return(e=e.replace(/=/g,"")).length/4*3},a=function(t,e){var n=new Image;n.src=t,n.onload=function(){e&&e({width:n.width,height:n.height,size:r(t),base64:t,img:n}),n=null}},u=function(t,e){return t.split(",").indexOf(e)>=0},s=function(t){t.input.addEventListener("change",function(e){var n=e.target.files;if(n.length>0){var i=n[0],r=i.type,s=i.name,f=i.lastModified,l=i.lastModifiedDate,c=i.size;if(!u(t.opts.type,r))return void t.errorFn.call(t._self,{type:"type",err:"Illegal type: "+r});o(i,function(e){a(e,function(n){t.events.forEach(function(t){return t({name:s,type:r,size:c,width:n.width,height:n.height,lastModified:f,lastModifiedDate:l,base64:e})})})})}})},f=function(t,e,n,i){a(t,function(t){var o=document.createElement("canvas"),a=o.getContext("2d");o.width=t.width*n,o.height=t.height*n,a.fillStyle="#fff",a.fillRect(0,0,o.width,o.height),a.drawImage(t.img,0,0,o.width,o.height);var u=o.toDataURL("image/jpeg",e);i&&i({width:o.width,height:o.height,base64:u,size:r(u)}),o=null})},l=(function(){function t(t){this.value=t}function e(e){function n(o,r){try{var a=e[o](r),u=a.value;u instanceof t?Promise.resolve(u.value).then(function(t){n("next",t)},function(t){n("throw",t)}):i(a.done?"return":"normal",a.value)}catch(t){i("throw",t)}}function i(t,e){switch(t){case"return":o.resolve({value:e,done:!0});break;case"throw":o.reject(e);break;default:o.resolve({value:e,done:!1})}(o=o.next)?n(o.key,o.arg):r=null}var o,r;this._invoke=function(t,e){return new Promise(function(i,a){var u={key:t,arg:e,resolve:i,reject:a,next:null};r?r=r.next=u:(o=r=u,n(t,e))})},"function"!=typeof e.return&&(this.return=void 0)}"function"==typeof Symbol&&Symbol.asyncIterator&&(e.prototype[Symbol.asyncIterator]=function(){return this}),e.prototype.next=function(t){return this._invoke("next",t)},e.prototype.throw=function(t){return this._invoke("throw",t)},e.prototype.return=function(t){return this._invoke("return",t)}}(),function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}),c=function o(r,a){l(this,o),(r=t(r)).style.position="relative";var u={_self:this,el:r,opts:a,input:null,events:[],errorFn:null};e(u),n(u),i(u),s(u),this.$$data=u};return function(t){t.prototype.error=function(t){return this.$$data.errorFn=t,this}}(c),function(t){t.prototype.on=function(t){var e=this.$$data.events;return"function"==typeof t&&e.push(t),this},t.prototype.off=function(t){var e=this.$$data.events;return t||(this.$$data.events=[]),"function"==typeof t&&(this.$$data.events=e.filter(function(e){return e!==t})),this}}(c),function(t){t.getSize=function(t){return r(t)}}(c),function(t){t.getImgInfo=function(e,n){return a(e,n),t}}(c),function(t){t.compress=function(t,e,n){var i={maxLength:e.maxLength||1920,maxSize:e.maxSize||307200,quality:e.quality||.9},o={size:null,width:null,height:null,base64:null},r={radioMax:1,radioMin:0,radio:null},u=function(e,n){f(t,i.quality,e,function(t){r.radio=e,o.size=t.size,o.width=t.width,o.height=t.height,o.base64=t.base64,o.width<=i.maxLength&&o.height<=i.maxLength&&o.size<=i.maxSize?r.radioMin=e:r.radioMax=e;var a=i.maxSize-o.size>0&&i.maxSize-o.size<.05*i.maxSize;n&&n(a)})},s=0,l=function t(){var e=(r.radioMax+r.radioMin)/2;u(e,function(e){e?n&&n(o):s<8?(s++,t()):n&&n(o)})};a(t,function(e){e.width<=i.maxLength&&e.height<=i.maxLength&&e.size<=i.maxSize?f(t,i.quality,1,function(t){t.size<e.size?n&&n(t):(delete e.img,n&&n(e))}):f(t,i.quality,1,function(t){t.size<i.maxSize?n&&n(t):l()})})}}(c),c});
