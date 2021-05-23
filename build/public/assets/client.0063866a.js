(()=>{"use strict";var e,t,r,n,o={8692:(e,t,r)=>{r.d(t,{EG:()=>n,Un:()=>o,wF:()=>i,Ce:()=>a,j1:()=>u,Nr:()=>c,SW:()=>l,ni:()=>s,xr:()=>f});var n="/editor",o=3e3,i=2e3,a=1,u=2,c=3,l=4,s=200,f=160},82498:(e,t,r)=>{r(57147);var n=r(67294),o=r(73935),i=r(14775),a=r(17563),u=r(24568),c=r(43615),l=r(76097),s=r(90817),f=r(52367),d=r(11124),p=r(78042),h=r(99228),v=r(42222),y=r.n(v),b=(r(45697),r(25500)),m=r.n(b);const g=n.createContext({fetch:function(){throw new Error("Fetch method not initialized.")}});var w;function O(e,t,r,n){w||(w="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),1===i)t.children=n;else if(i>1){for(var a=new Array(i),u=0;u<i;u++)a[u]=arguments[u+3];t.children=a}if(t&&o)for(var c in o)void 0===t[c]&&(t[c]=o[c]);else t||(t=o||{});return{$$typeof:w,type:e,key:void 0===r?null:""+r,ref:null,props:t,_owner:null}}function P(e){var t=e.context,r=e.insertCss,o=e.children;return O(m().Provider,{value:{insertCss:r}},void 0,O(g.Provider,{value:{context:t}},void 0,n.Children.only(o)))}var x=r(52427);function k(e,t){!function(e,t,r,n,o){var i=document.head.querySelector("".concat(e,"[").concat(t,'="').concat(r,'"]'));if((!i||i.getAttribute(n)!==o)&&(i&&i.parentNode.removeChild(i),"string"==typeof o)){var a=document.createElement(e);a.setAttribute(t,r),a.setAttribute(n,o),document.head.appendChild(a)}}("meta","name",e,"content",t)}var j=r(40033),S=r(8692);function E(e,t,r,n,o,i,a){try{var u=e[i](a),c=u.value}catch(e){return void r(e)}u.done?t(c):Promise.resolve(c).then(n,o)}const A={path:"",children:[{path:"",load:function(){return Promise.all([r.e(45),r.e(259),r.e(593),r.e(675),r.e(177)]).then(r.bind(r,75337))}},{path:"".concat(S.EG),load:function(){return Promise.all([r.e(45),r.e(675),r.e(353)]).then(r.bind(r,85814))}},{path:"/author/:authoruid",load:function(){return Promise.all([r.e(45),r.e(259),r.e(13),r.e(675),r.e(741)]).then(r.bind(r,39786))}},{path:"/edit/:slugkey",protected:!0,load:function(){return Promise.all([r.e(45),r.e(675),r.e(353)]).then(r.bind(r,85814))}},{path:"/reset-password/:requestkey",load:function(){return Promise.all([r.e(45),r.e(675),r.e(564)]).then(r.bind(r,73710))}},{path:"/verify/:verifykey",load:function(){return Promise.all([r.e(45),r.e(675),r.e(306)]).then(r.bind(r,61916))}},{path:"/:authoruid/:slug",load:function(){return Promise.all([r.e(45),r.e(259),r.e(593),r.e(122),r.e(675),r.e(69)]).then(r.bind(r,74747))}},{path:"(.*)",name:"not-found",load:function(){return Promise.all([r.e(45),r.e(675),r.e(942)]).then(r.bind(r,39686))}}],action:function(e){return(t=regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.next,t.next=3,r();case 3:return(n=t.sent).title="".concat(n.title||"World of experiences"),t.abrupt("return",n);case 6:case"end":return t.stop()}}),t)})),function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(e){E(i,n,o,a,u,"next",e)}function u(e){E(i,n,o,a,u,"throw",e)}a(void 0)}))})();var t}},_=new j.Z(A,{resolveRoute:function(e,t){var r=y().get("loggedin");return e.route.protected&&!r?{redirect:"/",from:e.pathname}:"function"==typeof e.route.load?e.route.load().then((function(r){return r.default(e,t)})):"function"==typeof e.route.action?e.route.action(e,t):void 0}}),C={Mutations:{},Query:{}};var T=r(27248);function R(e,t,r,n,o,i,a){try{var u=e[i](a),c=u.value}catch(e){return void r(e)}u.done?t(c):Promise.resolve(c).then(n,o)}const M=function(){var e,t=(e=regeneratorRuntime.mark((function e(){var t,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=3,(0,T.Z)({variables:{uid:y().get("username")},query:"\n    mutation refreshUserToken($uid: String!) {\n      refreshUserToken(uid: $uid) {\n        token\n      }\n    }\n  "});case 3:if(t=e.sent,!(r=t.refreshUserToken)||!r.token){e.next=10;break}return y().set("token",r.token),e.abrupt("return",r.token);case 10:y().clear(),x.Z.push("/");case 12:case"end":return e.stop()}}),e)})),function(){var t=this,r=arguments;return new Promise((function(n,o){var i=e.apply(t,r);function a(e){R(i,n,o,a,u,"next",e)}function u(e){R(i,n,o,a,u,"throw",e)}a(void 0)}))});return function(){return t.apply(this,arguments)}}();var q;function I(e,t,r,n){q||(q="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),1===i)t.children=n;else if(i>1){for(var a=new Array(i),u=0;u<i;u++)a[u]=arguments[u+3];t.children=a}if(t&&o)for(var c in o)void 0===t[c]&&(t[c]=o[c]);else t||(t=o||{});return{$$typeof:q,type:e,key:void 0===r?null:""+r,ref:null,props:t,_owner:null}}function N(e){if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(e=function(e,t){if(e){if("string"==typeof e)return U(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?U(e,t):void 0}}(e))){var t=0,r=function(){};return{s:r,n:function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,o,i=!0,a=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return i=e.done,e},e:function(e){a=!0,o=e},f:function(){try{i||null==n.return||n.return()}finally{if(a)throw o}}}}function U(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function D(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Z(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?D(Object(r),!0).forEach((function(t){B(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):D(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function B(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function L(e,t,r,n,o,i,a){try{var u=e[i](a),c=u.value}catch(e){return void r(e)}u.done?t(c):Promise.resolve(c).then(n,o)}function $(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var i=e.apply(t,r);function a(e){L(i,n,o,a,u,"next",e)}function u(e){L(i,n,o,a,u,"throw",e)}a(void 0)}))}}var z=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];var n=t.map((function(e){return e._insertCss()}));return function(){n.forEach((function(e){return e()}))}},X={},Y=document.getElementById("app"),G=x.Z.location,Q={};function F(e,t){return J.apply(this,arguments)}function J(){return(J=$(regeneratorRuntime.mark((function e(t,r){var n,v,b,m,g,w,O,j,S,E,A,T,R;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Q[G.key]={scrollX:window.pageXOffset,scrollY:window.pageYOffset},"PUSH"===r&&delete Q[t.key],G=t,n=!r,e.prev=4,X.pathname=t.pathname,X.query=a.parse(t.search),e.next=9,_.resolve(X);case 9:if(v=e.sent,G.key===t.key){e.next=12;break}return e.abrupt("return");case 12:if(!v.redirect){e.next=15;break}return x.Z.replace(v.redirect),e.abrupt("return");case 15:b=new f.Jd({introspectionQueryResultData:{__schema:{types:[]}}}),m=new f.h4({addTypename:!1,fragmentMatcher:b}).restore(window.__APOLLO_STATE__),g=(0,h.v)((function(e,t){var r=t.headers,n=y().get("token");return{headers:Z(Z({"Accept-Encoding":"gzip,deflate"},r),n&&{authorization:n})}})),w=(0,p.L)({uri:window.App.apiUrl,credentials:"same-origin"}),O=(0,s.N)({cache:m,resolvers:C}),j=!1,S=[],E=function(){S.map((function(e){return e()})),S=[]},A=(0,c.q)((function(e){var t=e.graphQLErrors,r=(e.networkError,e.operation),n=e.forward;if(t){var o,i=N(t);try{for(i.s();!(o=i.n()).done;){var a;switch(o.value.StatusCode){case 401:var u=void 0;return j?u=(0,l.p4)(new Promise((function(e){S.push((function(){return e()}))}))):(j=!0,u=(0,l.p4)(M().then((function(e){var t=r.getContext().headers;return r.setContext({headers:Z(Z({},t),{},{authorization:e})}),E(),e})).catch((function(e){S=[]})).finally((function(){j=!1}))).filter((function(e){return Boolean(e)})).flatMap((function(){return n(r)}))),u.flatMap((function(){return n(r)}));default:t.map((function(e){var t=e.message;return console.log(t)}))}}}catch(a){i.e(a)}finally{i.f()}}})),T=new u.fe({cache:m,link:l.i0.from([A,g,O,w]),resolvers:{},defaultOptions:{query:{errorPolicy:"all"}}}),R=n?o.hydrate:o.render,(0,i.TA)((function(){return R(I(d.e,{client:T},void 0,I(P,{context:X,insertCss:z},void 0,v.component)),Y,(function(){if(n){window.history&&"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual");var e=document.getElementById("css");e&&e.parentNode.removeChild(e)}else{document.title=v.title,k("description",v.description);var r=0,o=0,i=Q[t.key];if(i)r=i.scrollX,o=i.scrollY;else{var a=t.hash.substr(1);if(a){var u=document.getElementById(a);u&&(o=window.pageYOffset+u.getBoundingClientRect().top)}}window.scrollTo(r,o)}}))})),e.next=35;break;case 29:e.prev=29,e.t0=e.catch(4),e.next=33;break;case 33:console.error(e.t0),n||G.key!==t.key||(console.error("RSK will reload your page after error"),window.location.reload());case 35:case"end":return e.stop()}}),e,null,[[4,29]])})))).apply(this,arguments)}x.Z.listen(F),F(G)},27248:(e,t,r)=>{function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t,r,n,o,i,a){try{var u=e[i](a),c=u.value}catch(e){return void r(e)}u.done?t(c):Promise.resolve(c).then(n,o)}r.d(t,{Z:()=>u});const u=function(){var e,t=(e=regeneratorRuntime.mark((function e(t){var r,n,i,a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.variables,n=t.query,i=t.token,e.next=3,fetch("".concat(window.location.origin,"/gql"),{method:"POST",headers:o({"Content-Type":"application/json","Accept-Encoding":"gzip,deflate"},i&&{authorization:i}),body:JSON.stringify({query:n,variables:r})}).then((function(e){return e.json()}));case 3:return a=e.sent,e.abrupt("return",a&&a.data);case 5:case"end":return e.stop()}}),e)})),function(){var t=this,r=arguments;return new Promise((function(n,o){var i=e.apply(t,r);function u(e){a(i,n,o,u,c,"next",e)}function c(e){a(i,n,o,u,c,"throw",e)}u(void 0)}))});return function(e){return t.apply(this,arguments)}}()},52427:(e,t,r)=>{r.d(t,{Z:()=>n});const n=(0,r(48503).lX)()}},i={};function a(e){if(i[e])return i[e].exports;var t=i[e]={id:e,loaded:!1,exports:{}};return o[e].call(t.exports,t,t.exports,a),t.loaded=!0,t.exports}a.m=o,a.x=e=>{},a.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return a.d(t,{a:t}),t},t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,a.t=function(r,n){if(1&n&&(r=this(r)),8&n)return r;if("object"==typeof r&&r){if(4&n&&r.__esModule)return r;if(16&n&&"function"==typeof r.then)return r}var o=Object.create(null);a.r(o);var i={};e=e||[null,t({}),t([]),t(t)];for(var u=2&n&&r;"object"==typeof u&&!~e.indexOf(u);u=t(u))Object.getOwnPropertyNames(u).forEach((e=>i[e]=()=>r[e]));return i.default=()=>r,a.d(o,i),o},a.d=(e,t)=>{for(var r in t)a.o(t,r)&&!a.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},a.f={},a.e=e=>Promise.all(Object.keys(a.f).reduce(((t,r)=>(a.f[r](e,t),t)),[])),a.u=e=>(({41:"UIElements-MobileNotSupported",69:"read-experience",148:"Authenticate",177:"home",196:"Editor",306:"verify-email",312:"ExpressThoughts",353:"write-editor",438:"Login",482:"GetStartedButton",494:"Register",564:"reset-password",585:"Thoughts",683:"ReadThoughts",722:"UIElements-InspireText",741:"allofauthor",747:"components-Inspire",942:"not-found"}[e]||e)+"."+{13:"99be7865",41:"860e39b4",45:"0f6dfa8f",69:"f5a8c421",122:"b71063e4",148:"5d7c9526",177:"31d39470",196:"c3bf873b",259:"9cab0362",292:"ec43cf57",296:"eb179297",306:"74b6eb89",312:"cd56a83c",353:"a550ea21",438:"6adf5461",446:"679f332d",482:"65ed7c8d",494:"d58111c2",564:"ff824109",585:"e1dd1c4c",593:"be845d70",675:"bf0b28c2",683:"f6df4387",702:"c9d742f4",722:"a7430793",741:"85225724",747:"10f53ba0",942:"ac667f4f"}[e]+".chunk.js"),a.hmd=e=>((e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:()=>{throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e),a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r={},n="experiences-client:",a.l=(e,t,o)=>{if(r[e])r[e].push(t);else{var i,u;if(void 0!==o)for(var c=document.getElementsByTagName("script"),l=0;l<c.length;l++){var s=c[l];if(s.getAttribute("src")==e||s.getAttribute("data-webpack")==n+o){i=s;break}}i||(u=!0,(i=document.createElement("script")).charset="utf-8",i.timeout=120,a.nc&&i.setAttribute("nonce",a.nc),i.setAttribute("data-webpack",n+o),i.src=e),r[e]=[t];var f=(t,n)=>{i.onerror=i.onload=null,clearTimeout(d);var o=r[e];if(delete r[e],i.parentNode&&i.parentNode.removeChild(i),o&&o.forEach((e=>e(n))),t)return t(n)},d=setTimeout(f.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=f.bind(null,i.onerror),i.onload=f.bind(null,i.onload),u&&document.head.appendChild(i)}},a.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),a.p="/assets/",(()=>{var e={47:0},t=[[26981,216],[82498,216]];a.f.j=(t,r)=>{var n=a.o(e,t)?e[t]:void 0;if(0!==n)if(n)r.push(n[2]);else{var o=new Promise(((r,o)=>{n=e[t]=[r,o]}));r.push(n[2]=o);var i=a.p+a.u(t),u=new Error;a.l(i,(r=>{if(a.o(e,t)&&(0!==(n=e[t])&&(e[t]=void 0),n)){var o=r&&("load"===r.type?"missing":r.type),i=r&&r.target&&r.target.src;u.message="Loading chunk "+t+" failed.\n("+o+": "+i+")",u.name="ChunkLoadError",u.type=o,u.request=i,n[1](u)}}),"chunk-"+t)}};var r=e=>{},n=(n,o)=>{for(var i,u,[c,l,s,f]=o,d=0,p=[];d<c.length;d++)u=c[d],a.o(e,u)&&e[u]&&p.push(e[u][0]),e[u]=0;for(i in l)a.o(l,i)&&(a.m[i]=l[i]);for(s&&s(a),n&&n(o);p.length;)p.shift()();return f&&t.push.apply(t,f),r()},o=self.webpackChunkexperiences_client=self.webpackChunkexperiences_client||[];function i(){for(var r,n=0;n<t.length;n++){for(var o=t[n],i=!0,u=1;u<o.length;u++){var c=o[u];0!==e[c]&&(i=!1)}i&&(t.splice(n--,1),r=a(a.s=o[0]))}return 0===t.length&&(a.x(),a.x=e=>{}),r}o.forEach(n.bind(null,0)),o.push=n.bind(null,o.push.bind(o));var u=a.x;a.x=()=>(a.x=u||(e=>{}),(r=i)())})(),a.x()})();