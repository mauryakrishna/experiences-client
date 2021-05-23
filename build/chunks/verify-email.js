require("source-map-support").install(),exports.id=306,exports.ids=[306],exports.modules={2091:(e,i,t)=>{"use strict";t.d(i,{Z:()=>r});const r=async({variables:e,query:i,token:t})=>{const r=await fetch(`${window.location.origin}/gql`,{method:"POST",headers:{"Content-Type":"application/json","Accept-Encoding":"gzip,deflate",...t&&{authorization:t}},body:JSON.stringify({query:i,variables:e})}).then((e=>e.json()));return r&&r.data}},1916:(e,i,t)=>{"use strict";t.r(i),t.d(i,{default:()=>b});var r,o=t(9297),s=t.n(o),n=(t(4229),t(2668)),a=t(2427),l=t(2091);function d(e,i,t,o){r||(r="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var s=e&&e.defaultProps,n=arguments.length-3;if(i||0===n||(i={children:void 0}),1===n)i.children=o;else if(n>1){for(var a=new Array(n),l=0;l<n;l++)a[l]=arguments[l+3];i.children=a}if(i&&s)for(var d in s)void 0===i[d]&&(i[d]=s[d]);else i||(i=s||{});return{$$typeof:r,type:e,key:void 0===t?null:""+t,ref:null,props:i,_owner:null}}const f=e=>d(n.Text,{fontWeight:"bold",fontSize:"2rem"},void 0,e.children);var u=d(t(7566).Z,{}),c=d(f,{},void 0,"Invalid request."),y=d(f,{},void 0,"Email address is already verified."),v=d(f,{},void 0,"Email verification successful. Kindly use your credential to login and start sharing your life's experiences.");class h extends s().Component{constructor(e){super(e),this.state={showLoader:!0,showInvalidRequest:!1,showEmailAlreadyVerified:!1,showVerifySuccess:!1}}componentDidMount(){(async function({verifykey:e}){const i={input:{verifykey:e}};return(await(0,l.Z)({variables:i,query:"\n    mutation verifyEmail($input: VerifyEmailInput) {\n      verifyEmail(input: $input) {\n        verifysuccess\n        isemailverified\n        requestvalid\n      }\n    }\n  "})).verifyEmail})({verifykey:this.props.verifykey}).then((e=>{if(e){const{verifysuccess:i,requestvalid:t,isemailverified:r}=e;i?(this.setState({showVerifySuccess:!0}),this.redirectToHome()):r?(this.setState({showEmailAlreadyVerified:!0}),this.redirectToHome()):t||this.setState({showInvalidRequest:!0})}this.setState({showLoader:!1})}))}redirectToHome(){setTimeout((()=>{a.Z.push("/")}),3e3)}render(){return d(n.Box,{},void 0,this.state.showLoader&&u," ",this.state.showInvalidRequest&&c,this.state.showEmailAlreadyVerified&&y,this.state.showVerifySuccess&&v)}}const p=h;var m,w=t(8675);function S(e,i,t,r){m||(m="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,s=arguments.length-3;if(i||0===s||(i={children:void 0}),1===s)i.children=r;else if(s>1){for(var n=new Array(s),a=0;a<s;a++)n[a]=arguments[a+3];i.children=n}if(i&&o)for(var l in o)void 0===i[l]&&(i[l]=o[l]);else i||(i=o||{});return{$$typeof:m,type:e,key:void 0===t?null:""+t,ref:null,props:i,_owner:null}}const b=function(e,i){return{chunks:["verify-email"],title:"Verify email address",component:S(w.Z,{},void 0,S(p,{verifykey:i.verifykey}))}}}};