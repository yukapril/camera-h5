/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_camera_h5__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_camera_h5___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_camera_h5__);


var maxLength = 1920
var maxSize = 200 * 1024
var camera = new __WEBPACK_IMPORTED_MODULE_0_camera_h5___default.a('#J_Camera', {type: 'image/jpeg'})

camera.error(function (data) {
  console.log('ERR:', data)
})

camera.on(function (file) {
  console.log('Input File:', file)
  var div1 = document.createElement('div')
  div1.innerHTML = '<br/>拍照原图：<pre>' + JSON.stringify({
      name: file.name,
      size: file.size,
      width: file.width,
      height: file.height,
      type: file.type
    }, null, 2) + '</pre>'
  document.body.appendChild(div1)

  // 对图片进行旋转
  __WEBPACK_IMPORTED_MODULE_0_camera_h5___default.a.rotate(file.base64, 90, function (rotatedBase64) {
    __WEBPACK_IMPORTED_MODULE_0_camera_h5___default.a.getImgInfo(rotatedBase64, function (img) {
      console.log('Rotate File:', img)
      var div2 = document.createElement('div')
      div2.innerHTML = '<br/>旋转原图：<pre>' + JSON.stringify({
          size: img.size,
          width: img.width,
          height: img.height
        }, null, 2) + '</pre>'
      document.body.appendChild(div2)

      // 对图片进行压缩
      __WEBPACK_IMPORTED_MODULE_0_camera_h5___default.a.compress(rotatedBase64, {maxLength: maxLength, maxSize: maxSize}, function (data) {
    console.log('Final Image [compressed]:', data)
        var div3 = document.createElement('div')
        div3.innerHTML = '<br/>压缩处理：<pre>' + JSON.stringify({
        name: data.name,
        size: data.size,
        width: data.width,
        height: data.height
      }, null, 2) + '</pre>'
        document.body.appendChild(div3)

    // 插入页面进行展示
    var img = new Image()
    img.src = data.base64
    document.body.appendChild(img)
    img = null
      })
    })
  })
})

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define(e):t.Camera=e()}(this,function(){"use strict";var t=function(t){return"string"==typeof t&&(t=document.querySelector(t)),t},e=function(t){var e=t.opts||{};t.opts={type:e.type||"image/jpeg,image/png"}},i=function(t){var e=document.createElement("input");e.type="file",e.accept="image/*",e.setAttribute("capture","camera"),e.style.position="absolute",e.style.top="0",e.style.left="0",e.style.display="block",e.style.width="100%",e.style.height="100%",e.style.opacity="0",t.input=e},n=function(t){t.el.appendChild(t.input)},a=function(t,e){var i=new FileReader;i.readAsDataURL(t),i.onload=function(t){e&&e(t.target.result),i=null}},o=function(t){var e=t.split(",")[1];return(e=e.replace(/=/g,"")).length/4*3},r=function(t,e){var i=new Image;i.src=t,i.onload=function(){e&&e({width:i.width,height:i.height,size:o(t),base64:t,img:i}),i=null}},h=function(t,e){return t.split(",").indexOf(e)>=0},u=function(t){t.input.addEventListener("change",function(e){var i=e.target.files;if(i.length>0){var n=i[0],o=n.type,u=n.name,l=n.lastModified,f=n.lastModifiedDate,s=n.size;if(!h(t.opts.type,o))return void t.errorFn.call(t._self,{type:"type",err:"Illegal type: "+o});a(n,function(e){r(e,function(i){t.events.forEach(function(t){return t({name:u,type:o,size:s,width:i.width,height:i.height,lastModified:l,lastModifiedDate:f,base64:e})})})})}})},l=function(t,e,i,n){r(t,function(t){var a=document.createElement("canvas"),r=a.getContext("2d");a.width=t.width*i,a.height=t.height*i,r.fillStyle="#fff",r.fillRect(0,0,a.width,a.height),r.drawImage(t.img,0,0,a.width,a.height);var h=a.toDataURL("image/jpeg",e);n&&n({width:a.width,height:a.height,base64:h,size:o(h)}),a=null})},f=(function(){function t(t){this.value=t}function e(e){function i(a,o){try{var r=e[a](o),h=r.value;h instanceof t?Promise.resolve(h.value).then(function(t){i("next",t)},function(t){i("throw",t)}):n(r.done?"return":"normal",r.value)}catch(t){n("throw",t)}}function n(t,e){switch(t){case"return":a.resolve({value:e,done:!0});break;case"throw":a.reject(e);break;default:a.resolve({value:e,done:!1})}(a=a.next)?i(a.key,a.arg):o=null}var a,o;this._invoke=function(t,e){return new Promise(function(n,r){var h={key:t,arg:e,resolve:n,reject:r,next:null};o?o=o.next=h:(a=o=h,i(t,e))})},"function"!=typeof e.return&&(this.return=void 0)}"function"==typeof Symbol&&Symbol.asyncIterator&&(e.prototype[Symbol.asyncIterator]=function(){return this}),e.prototype.next=function(t){return this._invoke("next",t)},e.prototype.throw=function(t){return this._invoke("throw",t)},e.prototype.return=function(t){return this._invoke("return",t)}}(),function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}),s=function a(o,r){f(this,a),(o=t(o)).style.position="relative";var h={_self:this,el:o,opts:r,input:null,events:[],errorFn:null};e(h),i(h),n(h),u(h),this.$$data=h};return function(t){t.prototype.error=function(t){return this.$$data.errorFn=t,this}}(s),function(t){t.prototype.on=function(t){var e=this.$$data.events;return"function"==typeof t&&e.push(t),this},t.prototype.off=function(t){var e=this.$$data.events;return t||(this.$$data.events=[]),"function"==typeof t&&(this.$$data.events=e.filter(function(e){return e!==t})),this}}(s),function(t){t.getSize=function(t){return o(t)}}(s),function(t){t.getImgInfo=function(e,i){return r(e,i),t}}(s),function(t){t.compress=function(t,e,i){var n={maxLength:e.maxLength||1920,maxSize:e.maxSize||307200,quality:e.quality||.9},a={size:null,width:null,height:null,base64:null},o={radioMax:1,radioMin:0,radio:null},h=function(e,i){l(t,n.quality,e,function(t){o.radio=e,a.size=t.size,a.width=t.width,a.height=t.height,a.base64=t.base64,a.width<=n.maxLength&&a.height<=n.maxLength&&a.size<=n.maxSize?o.radioMin=e:o.radioMax=e;var r=n.maxSize-a.size>0&&n.maxSize-a.size<.05*n.maxSize;i&&i(r)})},u=0,f=function t(){var e=(o.radioMax+o.radioMin)/2;h(e,function(e){e?i&&i(a):u<8?(u++,t()):i&&i(a)})};r(t,function(e){e.width<=n.maxLength&&e.height<=n.maxLength&&e.size<=n.maxSize?l(t,n.quality,1,function(t){t.size<e.size?i&&i(t):(delete e.img,i&&i(e))}):l(t,n.quality,1,function(t){t.size<n.maxSize?i&&i(t):f()})})}}(s),function(t){t.rotate=function(e,i,n){if(0!==i&&90!==i&&180!==i&&270!==i&&360!==i)throw Error("[Camera] Camera.rotate direction value is: 0 | 90 | 180 | 270 | 360.");return r(e,function(t){var e=document.createElement("canvas"),a=e.getContext("2d");switch(i){case 90:e.width=t.height,e.height=t.width,a.fillStyle="#fff",a.fillRect(0,0,e.width,e.height),a.translate(t.height,0),a.rotate(i*Math.PI/180),a.drawImage(t.img,0,0,e.height,e.width);break;case 180:e.width=t.width,e.height=t.height,a.fillStyle="#fff",a.fillRect(0,0,e.width,e.height),a.translate(t.width,t.height),a.rotate(i*Math.PI/180),a.drawImage(t.img,0,0,e.width,e.height);break;case 270:e.width=t.height,e.height=t.width,a.fillStyle="#fff",a.fillRect(0,0,e.width,e.height),a.translate(0,t.width),a.rotate(i*Math.PI/180),a.drawImage(t.img,0,0,e.height,e.width);break;case 0:case 360:e.width=t.width,e.height=t.height,a.fillStyle="#fff",a.fillRect(0,0,e.width,e.height),a.translate(0,0),a.rotate(i*Math.PI/180),a.drawImage(t.img,0,0,e.width,e.height)}var o=e.toDataURL("image/jpeg",1);n&&n(o),e=null}),t}}(s),s});


/***/ })
/******/ ]);