!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).Camera=e()}(this,function(){"use strict";function u(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var t,i,o,e,f=function(t,i){var n=new window.FileReader;n.onload=function(t){var e=t.target.result;n=null,i&&i(null,e)},n.onerror=function(t){n=null,i&&i(t,"")},n.readAsDataURL(t)},a=function(t){var e=t.split(",")[1];return(e=e.replace(/=/g,"")).length/4*3},n=function t(e,i){u(this,t),this.width=i.width||null,this.height=i.height||null,this.size=a(e)||null,this.base64=e||null,this.img=i||null},h=function(t,e){var i=new window.Image;i.onload=function(){e&&e(null,new n(t,i)),i=null},i.onerror=function(t){i=null,e&&e(t,{})},i.src=t},c=function t(e,i,n){u(this,t),this.width=i||null,this.height=n||null,this.size=a(e)||null,this.base64=e||null},l=function t(e,i,n,a){if(i.limit--,i.limit<0)a&&a(i.validImgInfo);else{var r=function(t,e){var i=e.quality,n=t.width,a=t.height,r=t.ratio,o=t.img,l=document.createElement("canvas"),h=l.getContext("2d");l.width=n*r,l.height=a*r,h.fillStyle="#fff",h.fillRect(0,0,l.width,l.height),h.drawImage(o,0,0,l.width,l.height);var u=l.toDataURL("image/jpeg",i),f=l.width,s=l.height;return l=h=null,new c(u,f,s)}(i,e);r.size<=e.maxSize&&e.maxSize-r.size<=e.maxSize*e.offsetRatio?a&&a(r):r.size<=e.maxSize?.9<i.ratio?a&&a(r):(i.ratioMin=i.ratio,i.ratio=(i.ratioMax+i.ratio)/2,i.validImgInfo=r,t(e,i,!1,a)):(i.ratioMax=i.ratio,i.ratio=(i.ratioMin+i.ratio)/2,n&&(i.maxImgBase64=r.base64,i.ratio=.5,i.ratioMin=0,i.ratioMax=1),t(e,i,!1,a))}},r=function t(e,i){var n;u(this,t),"string"==typeof(n=e)&&(n=document.querySelector(n)),(e=n).style.position="relative";var a,r,o,l,h={_self:this,el:e,opts:i,input:null,events:[],errorFn:null};r=(a=h).opts||{},a.opts={type:r.type||"image/jpeg",capture:r.capture||"camera"},function(t){var e=null;switch(t.opts.capture){case"camera":e="camera";break;case"user":e="user";break;case"none":e="";break;default:e="camera"}var i=document.createElement("input");i.type="file",i.setAttribute("accept","image/*"),e&&i.setAttribute("capture",e),i.style.position="absolute",i.style.top="0",i.style.left="0",i.style.display="block",i.style.width="100%",i.style.height="100%",i.style.opacity="0",t.input=i}(h),(o=h).el.appendChild(o.input),(l=h).input.addEventListener("change",function(e){l.events.forEach(function(t){return t.onChange(e)});var t,i,n=e.target.files;if(0<n.length){var a=n[0],r=a.type;if(t=l.opts.type,i=r,!(0<=t.split(",").indexOf(i))){var o="Illegal type: "+r;return l.events.forEach(function(t){return t.onChanged({type:"type",err:o},"",null)}),void(l.errorFn&&l.errorFn.call(l._self,{type:"type",err:o}))}f(a,function(e,i){if(e)return l.events.forEach(function(t){return t.onChanged(e,"",null)}),void(l.errorFn&&l.errorFn.call(l._self,{type:"error file",err:"Illegal file:"+a}));l.events.forEach(function(t){return t.onChanged(null,i,a)})})}}),this.$$data=h};return r.prototype.error=function(t){return this.$$data.errorFn=t,this},(t=r).prototype.on=function(t,e){var i=this.$$data.events;return"function"!=typeof e&&(e=function(){}),"function"==typeof t&&i.push({onChanged:t,onChange:e}),this},t.prototype.off=function(e){var t=this.$$data.events;return e||(this.$$data.events=[]),"function"==typeof e&&(this.$$data.events=t.filter(function(t){return t.onChanged!==e})),this},r.getSize=function(t){return a(t)},(i=r).getImgInfo=function(t,e){return h(t,e),i},(o=r).compress=function(t,e,n){var a={maxLength:e.maxLength||1920,maxSize:e.maxSize||307200,quality:e.quality||.8,offsetRatio:e.offsetRatio||.2},r={ratio:1,ratioMax:1,ratioMin:0,limit:5,validImgInfo:"",maxImgBase64:"",width:0,height:0,img:null};return h(t,function(t,e){if(t)n&&n(t,{});else if(r.maxImgBase64=e.base64,r.width=e.width,r.height=e.height,r.img=e.img,e.width<=a.maxLength&&e.height<=a.maxLength)e.size<=a.maxSize?(n&&n(null,e),e=null):l(a,r,!1,function(t){n&&n(null,t)});else{var i=Math.max(e.width,e.height);e=null,r.ratio=r.ratioMax=a.maxLength/i,l(a,r,!0,function(t){n&&n(null,t)})}}),o},(e=r).rotate=function(n,l){return f(n,function(t,o){t?l&&l(t,""):h(o,function(t,r){var e,u,i;t?l&&l(t,""):(e=n,u=function(t){if(1===t||3===t||6===t||8===t){var e=document.createElement("canvas"),i=e.getContext("2d"),n=function(t){var e=null;switch(t){case 1:e=0;break;case 6:e=90;break;case 3:e=180;break;case 8:e=270;break;default:e=0}return e}(t);switch(n){case 90:e.width=r.height,e.height=r.width,i.fillStyle="#fff",i.fillRect(0,0,e.width,e.height),i.translate(r.height,0),i.rotate(n*Math.PI/180),i.drawImage(r.img,0,0,e.height,e.width);break;case 180:e.width=r.width,e.height=r.height,i.fillStyle="#fff",i.fillRect(0,0,e.width,e.height),i.translate(r.width,r.height),i.rotate(n*Math.PI/180),i.drawImage(r.img,0,0,e.width,e.height);break;case 270:e.width=r.height,e.height=r.width,i.fillStyle="#fff",i.fillRect(0,0,e.width,e.height),i.translate(0,r.width),i.rotate(n*Math.PI/180),i.drawImage(r.img,0,0,e.height,e.width);break;case 0:e.width=r.width,e.height=r.height,i.fillStyle="#fff",i.fillRect(0,0,e.width,e.height),i.translate(0,0),i.rotate(n*Math.PI/180),i.drawImage(r.img,0,0,e.width,e.height)}var a=e.toDataURL("image/jpeg",.9);e=i=null,l&&l(null,a)}else l&&l(null,o)},(i=new window.FileReader).onload=function(t){var e=new window.DataView(t.target.result);if(65496===e.getUint16(0,!1)){for(var i,n=e.byteLength,a=2;a<n;){var r=e.getUint16(a,!1);if(a+=2,65505===r){1165519206!==e.getUint32(a+=2,!1)&&(i=-1);var o=18761===e.getUint16(a+=6,!1);a+=e.getUint32(a+4,o);var l=e.getUint16(a,o);a+=2;for(var h=0;h<l;h++)274===e.getUint16(a+12*h,o)&&(i=e.getUint16(a+12*h+8,o))}else{if(65280!=(65280&r))break;a+=e.getUint16(a,!1)}}u(i||-1)}else u(-2)},i.onerror=function(){u(-3)},i.readAsArrayBuffer(e))})}),e},r});
