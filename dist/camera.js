!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).Camera=e()}(this,function(){"use strict";function l(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function h(t,i){var n=new window.FileReader;n.onload=function(t){var e=t.target.result;n=null,i&&i(null,e)},n.onerror=function(t){n=null,i&&i(t,"")},n.readAsDataURL(t)}function u(l){l.input.addEventListener("change",function(e){l.events.forEach(function(t){return t.onChange(e)});var t,i,n=e.target.files;if(0<n.length){var a=n[0],r=a.type;if(t=l.opts.type,i=r,!(0<=t.split(",").indexOf(i))){var o="Illegal type: "+r;return l.events.forEach(function(t){return t.onChanged({type:"type",err:o},"",null)}),void(l.errorFn&&l.errorFn.call(l._self,{type:"type",err:o}))}h(a,function(e,i){return e?(l.events.forEach(function(t){return t.onChanged(e,"",null)}),void(l.errorFn&&l.errorFn.call(l._self,{type:"error file",err:"Illegal file:"+a}))):void l.events.forEach(function(t){return t.onChanged(null,i,a)})})}})}function n(t){return t.split(",")[1].replace(/=/g,"").length/4*3}function a(t,e){l(this,a),this.width=e.width||null,this.height=e.height||null,this.size=n(t)||null,this.base64=t||null,this.img=e||null}function o(t,e){var i=new window.Image;i.onload=function(){e&&e(null,new a(t,i)),i=null},i.onerror=function(t){i=null,e&&e(t,{})},i.src=t}function c(t,e,i){l(this,c),this.width=e||null,this.height=i||null,this.size=n(t)||null,this.base64=t||null}function f(t,e,i,n){var a;e.limit--,e.limit<0?n&&n(e.validImgInfo):(a=function(t,e){var i=e.quality,n=t.width,a=t.height,r=t.ratio,o=t.img,l=(s=document.createElement("canvas")).getContext("2d");s.width=n*r,s.height=a*r,l.fillStyle="#fff",l.fillRect(0,0,s.width,s.height),l.drawImage(o,0,0,s.width,s.height);var h=s.toDataURL("image/jpeg",i),u=s.width,f=s.height,l=null,s=null;return new c(h,u,f)}(e,t)).size<=t.maxSize&&t.maxSize-a.size<=t.maxSize*t.offsetRatio?n&&n(a):a.size<=t.maxSize?.9<e.ratio?n&&n(a):(e.ratioMin=e.ratio,e.ratio=(e.ratioMax+e.ratio)/2,e.validImgInfo=a,f(t,e,!1,n)):(e.ratioMax=e.ratio,e.ratio=(e.ratioMin+e.ratio)/2,i&&(e.maxImgBase64=a.base64,e.ratio=.5,e.ratioMin=0,e.ratioMax=1),f(t,e,!1,n))}function s(e){var i=document.createElement("img");document.body.appendChild(i),i.onerror=function(){var t="from-image"===window.getComputedStyle(i).imageOrientation;document.body.removeChild(i),i=null,e&&e(t)},i.src=""}function g(t,r,o,l){var e,u,i;e=t,u=function(t){if(1===t||3===t||6===t||8===t){var e=(a=document.createElement("canvas")).getContext("2d"),i=function(t){var e=null;switch(t){case 1:e=0;break;case 6:e=90;break;case 3:e=180;break;case 8:e=270;break;default:e=0}return e}(t);switch(i){case 90:a.width=r.height,a.height=r.width,e.fillStyle="#fff",e.fillRect(0,0,a.width,a.height),e.translate(r.height,0),e.rotate(i*Math.PI/180),e.drawImage(r.img,0,0,a.height,a.width);break;case 180:a.width=r.width,a.height=r.height,e.fillStyle="#fff",e.fillRect(0,0,a.width,a.height),e.translate(r.width,r.height),e.rotate(i*Math.PI/180),e.drawImage(r.img,0,0,a.width,a.height);break;case 270:a.width=r.height,a.height=r.width,e.fillStyle="#fff",e.fillRect(0,0,a.width,a.height),e.translate(0,r.width),e.rotate(i*Math.PI/180),e.drawImage(r.img,0,0,a.height,a.width);break;case 0:a.width=r.width,a.height=r.height,e.fillStyle="#fff",e.fillRect(0,0,a.width,a.height),e.translate(0,0),e.rotate(i*Math.PI/180),e.drawImage(r.img,0,0,a.width,a.height)}var n=a.toDataURL("image/jpeg",.9),e=null,a=null;l&&l(null,n)}else l&&l(null,o)},(i=new window.FileReader).onload=function(t){var e=new window.DataView(t.target.result);if(65496===e.getUint16(0,!1)){for(var i,n=e.byteLength,a=2;a<n;){var r=e.getUint16(a,!1);if(a+=2,65505===r){1165519206!==e.getUint32(a+=2,!1)&&(i=-1);var o=18761===e.getUint16(a+=6,!1);a+=e.getUint32(a+4,o);var l=e.getUint16(a,o);a+=2;for(var h=0;h<l;h++)274===e.getUint16(a+12*h,o)&&(i=e.getUint16(a+12*h+8,o))}else{if(65280!=(65280&r))break;a+=e.getUint16(a,!1)}}u(i||-1)}else u(-2)},i.onerror=function(){u(-3)},i.readAsArrayBuffer(e)}function d(t,e){var i;l(this,d),"string"==typeof(i=t)&&(i=document.querySelector(i)),(t=i).style.position="relative";var n,a,r,o={_self:this,el:t,opts:e,input:null,events:[],errorFn:null};a=(n=o).opts||{},n.opts={type:a.type||"image/jpeg",capture:a.capture||"camera"},function(t){var e=null;switch(t.opts.capture){case"camera":e="camera";break;case"user":e="user";break;case"none":e="";break;default:e="camera"}var i=document.createElement("input");i.type="file",i.setAttribute("accept","image/*"),e&&i.setAttribute("capture",e),i.style.position="absolute",i.style.top="0",i.style.left="0",i.style.display="block",i.style.width="100%",i.style.height="100%",i.style.opacity="0",t.input=i}(o),(r=o).el.appendChild(r.input),u(o),this.$$data=o}var t,i,m,e;return d.prototype.error=function(t){return this.$$data.errorFn=t,this},(t=d).prototype.on=function(t,e){var i=this.$$data.events;return"function"!=typeof e&&(e=function(){}),"function"==typeof t&&i.push({onChanged:t,onChange:e}),this},t.prototype.off=function(e){var t=this.$$data.events;return e||(this.$$data.events=[]),"function"==typeof e&&(this.$$data.events=t.filter(function(t){return t.onChanged!==e})),this},d.getSize=n,(i=d).getImgInfo=function(t,e){return o(t,e),i},(m=d).compress=function(t,e,n){var a={maxLength:e.maxLength||1920,maxSize:e.maxSize||307200,quality:e.quality||.8,offsetRatio:e.offsetRatio||.2},r={ratio:1,ratioMax:1,ratioMin:0,limit:5,validImgInfo:"",maxImgBase64:"",width:0,height:0,img:null};return o(t,function(t,e){var i;t?n&&n(t,{}):(r.maxImgBase64=e.base64,r.width=e.width,r.height=e.height,r.img=e.img,e.width<=a.maxLength&&e.height<=a.maxLength?e.size<=a.maxSize?(n&&n(null,e),e=null):f(a,r,!1,function(t){n&&n(null,t)}):(i=Math.max(e.width,e.height),e=null,r.ratio=r.ratioMax=a.maxLength/i,f(a,r,!0,function(t){n&&n(null,t)})))}),m},(e=d).rotate=function(n,a){var r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};return h(n,function(t,i){t?a&&a(t,""):o(i,function(t,e){t?a&&a(t,""):r.auto?s(function(t){t?a(null,i):g(n,e,i,a)}):g(n,e,i,a)})}),e},d.isRotated=function(t){s(t)},d});
