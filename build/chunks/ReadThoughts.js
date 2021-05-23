require("source-map-support").install(),exports.id=683,exports.ids=[683],exports.modules={9614:(e,t,o)=>{"use strict";o.r(t),o.d(t,{default:()=>w});var r,n=o(9297),i=o.n(n),u=(o(4229),o(7470)),l=o.n(u),s=o(2091),a=o(560),d=o(4684),h=o(8262),c=o(7169),p=o(2668),g=o(9691),f=o(9875),y=o.n(f);function m(e,t,o,n){r||(r="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var i=e&&e.defaultProps,u=arguments.length-3;if(t||0===u||(t={children:void 0}),1===u)t.children=n;else if(u>1){for(var l=new Array(u),s=0;s<u;s++)l[s]=arguments[s+3];t.children=l}if(t&&i)for(var a in i)void 0===t[a]&&(t[a]=i[a]);else t||(t=i||{});return{$$typeof:r,type:e,key:void 0===o?null:""+o,ref:null,props:t,_owner:null}}const v=({slugkey:e,thoughtid:t,deletedCb:o})=>{const r=y()`
    mutation deleteAThought($input: DeleteAThoughtInput) {
      deleteAThought(input: $input) {
        deleted
        thoughtid
      }
    }
  `,[n]=(0,g.useMutation)(r,{update:(e,{data:t})=>{if(t.deleteAThought){const{deleted:e,thoughtid:r}=t.deleteAThought;e?o(r):console.log("Could not delete a thought.")}}});return m(p.Tooltip,{label:"Delete this thought"},void 0,m(p.Icon,{size:"10px",name:"delete",ml:"10px",onClick:()=>((e,t)=>{n({variables:{input:{experienceslugkey:e,thoughtid:t,thoughtauthoruid:l().get("username")}}})})(e,t)}))};var x,b=o(5976),k=o(2427);function S(e,t,o,r){x||(x="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var n=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),1===i)t.children=r;else if(i>1){for(var u=new Array(i),l=0;l<i;l++)u[l]=arguments[l+3];t.children=u}if(t&&n)for(var s in n)void 0===t[s]&&(t[s]=n[s]);else t||(t=n||{});return{$$typeof:x,type:e,key:void 0===o?null:""+o,ref:null,props:t,_owner:null}}var T=S(b.gb,{}),$=S(p.CircularProgress,{isIndeterminate:!0,size:"24px",color:"teal"});const w=({slugkey:e,refreshCursor:t})=>{const[o,r]=(0,n.useState)([]),[u,g]=(0,n.useState)(null),[f,y]=(0,n.useState)(!1),[m,x]=(0,n.useState)(!0),w=(0,n.useMemo)((()=>(0,h.pipe)((0,a.createEditor)())),[]),C=async t=>{const r=await(0,s.Z)({variables:{cursor:t,experienceslugkey:e},query:"\n    query getThoughtsOfExperience($cursor: String, $experienceslugkey: String!) {\n      getThoughtsOfExperience(cursor: $cursor, experienceslugkey: $experienceslugkey) {\n        cursor\n        thoughts {\n          thought\n          isauthor\n          thoughtid\n          created_at\n          thoughtauthor {\n            displayname\n            uid\n          }\n        }\n      }\n    }\n  ",token:l().get("token")});if(r&&r.getThoughtsOfExperience){const{cursor:e,thoughts:t}=r.getThoughtsOfExperience;return g(e),t}return o};(0,n.useEffect)((()=>{!async function(){x(!0);const e=await C(t);r(e),x(!1)}()}),[t]);const E=e=>{for(var t=o.length;t--;)if(o[t].thoughtid===e){o.splice(t,1);break}r([...o])};return i().createElement(i().Fragment,null,m&&T,!m&&S(p.Box,{justify:"left",py:5},void 0,S(p.Stack,{spacing:3,pr:"5px",width:"100%"},void 0,o.map((t=>{const{thought:o,thoughtid:r,isauthor:n}=t,{displayname:u,uid:l}=t.thoughtauthor;return S(p.Box,{py:"8px",px:"16px",pt:"5px",borderRadius:"5px",border:"1px",borderColor:"teal.100"},r,S(p.Box,{pb:"10px"},void 0,S(b.Lp,{fontSize:{base:"0.7rem",sm:"0.7rem",md:"0.7rem"},onClick:()=>{(e=>{k.Z.push(`/author/${e}`)})(l)}},void 0,u),n&&i().createElement(v,{slugkey:e,thoughtid:r,isauthor:n,deletedCb:E})),S(d.Slate,{editor:w,value:o},void 0,S(h.EditablePlugins,{plugins:c.G,readOnly:!0,style:{fontSize:"0.9rem",fontWeight:"400"},renderLeaf:[c.n]})))}))),S(b.zx,{onClick:async()=>{y(!0);const e=await C(u);r([...o,...e]),y(!1)}},void 0,f?$:"Load more")))}},2091:(e,t,o)=>{"use strict";o.d(t,{Z:()=>r});const r=async({variables:e,query:t,token:o})=>{const r=await fetch(`${window.location.origin}/gql`,{method:"POST",headers:{"Content-Type":"application/json","Accept-Encoding":"gzip,deflate",...o&&{authorization:o}},body:JSON.stringify({query:t,variables:e})}).then((e=>e.json()));return r&&r.data}}};