require("source-map-support").install(),exports.id=741,exports.ids=[741],exports.modules={9786:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>D});var o,i=r(9297),n=r.n(i),l=r(8675),a=(r(4229),r(9691)),u=r(9875),s=r.n(u),d=r(7470),p=r.n(d),c=r(2668),h=r(5976),f=r(8692),v=r(2427);function m(e,t,r,i){o||(o="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var n=e&&e.defaultProps,l=arguments.length-3;if(t||0===l||(t={children:void 0}),1===l)t.children=i;else if(l>1){for(var a=new Array(l),u=0;u<l;u++)a[u]=arguments[u+3];t.children=a}if(t&&n)for(var s in n)void 0===t[s]&&(t[s]=n[s]);else t||(t=n||{});return{$$typeof:o,type:e,key:void 0===r?null:""+r,ref:null,props:t,_owner:null}}const y=({slugkey:e,onDeleteExperienceCb:t})=>{const[r,o]=(0,i.useState)(!1),l=s()`
    mutation deleteAnExperience($input: DeleteExperienceInput) {
      deleteAnExperience(input: $input) {
        deleted
        slugkey
      }
    }
  `,[u]=(0,a.useMutation)(l,{update:(e,{data:r})=>{if(r.deleteAnExperience){const{deleted:e,slugkey:o}=r.deleteAnExperience;e&&t(o)}}});return n().createElement(n().Fragment,null,m(h.u,{label:"Edit"},void 0,m(h.JO,{name:"edit",onClick:()=>{v.Z.push(`/edit/${e}`)}})),m(h.u,{label:"Delete"},void 0,m(h.JO,{name:"delete",onClick:()=>{o(!0)}})),n().createElement(h.JN,{isOpen:r,header:"Delete an Experience",body:"Experience will be lost forever once deleted. Would you still like to delete?",cancelBtnText:"Cancel",yesBtnText:"Delete",onCancel:()=>{o(!1)},onYes:()=>{u({variables:{input:{slugkey:e,authoruid:p().get("username")}}}),o(!1)}}))};r(1966);var g=r(9299);var x;function b(e,t,r,o){x||(x="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var i=e&&e.defaultProps,n=arguments.length-3;if(t||0===n||(t={children:void 0}),1===n)t.children=o;else if(n>1){for(var l=new Array(n),a=0;a<n;a++)l[a]=arguments[a+3];t.children=l}if(t&&i)for(var u in i)void 0===t[u]&&(t[u]=i[u]);else t||(t=i||{});return{$$typeof:x,type:e,key:void 0===r?null:""+r,ref:null,props:t,_owner:null}}var S=b(h.gb,{}),$=b(c.EditablePreview,{}),k=b(c.EditableInput,{}),A=b(h.M$,{},void 0,"Experiences "),E=b(c.CircularProgress,{isIndeterminate:!0,size:"24px",color:"teal"});const C=({authoruid:e})=>{const[t,r]=(0,i.useState)(""),[o,l]=(0,i.useState)(""),[u,d]=(0,i.useState)([]),[m,x]=(0,i.useState)(!0),[C,w]=(0,i.useState)(null),[F,z]=(0,i.useState)(!1),[D,P]=(0,i.useState)(!1),W=e===p().get("username"),_=(()=>{const e=s()`
    mutation updateAuthor($input: UpdateAuthorInput) {
      updateAuthor(input: $input) {
        updated
      }
    }
  `,[t]=(0,a.useMutation)(e),[r]=(0,g.useDebouncedCallback)((async({displayname:e,shortintro:r,authoruid:o,cb:i})=>{await t({variables:{input:{displayname:e,shortintro:r,authoruid:o}}}),i(!0)}),1);return r})(),B=s()`
    query getAuthor($cursor: String, $experienceperpage: Int!, $uid: String!) {
      getAuthor(
        cursor: $cursor
        experienceperpage: $experienceperpage
        uid: $uid
      ) {
        cursor
        author {
          displayname
          shortintro
          experiences {
            title
            slug
            slugkey
            ispublished
            experienceintrotext
            publishdate
            created_at
          }
        }
      }
    }
  `,{data:M,loading:I,fetchMore:R}=(0,a.useQuery)(B,{variables:{experienceperpage:10,uid:e}}),T=e=>{if(e&&e.getAuthor){const t=e.getAuthor.cursor,{displayname:o,shortintro:i,experiences:n}=e.getAuthor.author;w(t),r(o),l(i),d(n)}},Z=(0,i.useRef)();(0,i.useEffect)((()=>{T(M)}),[M]);const q=e=>{for(var t=u.length;t--;)if(u[t].slugkey===e){u.splice(t,1);break}d(u)};return I?S:b(c.PseudoBox,{px:{base:"1.5rem",sm:"2rem",md:"6rem"},py:2},void 0,b(c.Flex,{py:2},void 0,b(c.Editable,{fontSize:"30px",fontWeight:"300",value:`${t}`,onChange:e=>{r(e),x(!1)}},void 0,$,k)),b(c.Flex,{},void 0,b(c.Textarea,{isDisabled:!W,placeholder:"A short bio about you.",inputRef:Z,p:0,minHeight:"0",color:"black",fontSize:"18px",fontWeight:"400",borderWidth:"0",resize:"none",focusBorderColor:"white",as:h._R,onChange:e=>{const{value:t}=e.target;t.length<=f.ni?l(t):(l(t.substring(f.ni,0)),z(!0)),x(!1)},onKeyPress:e=>{"Enter"===e.key&&e.preventDefault()},value:`${o||""}`})),F&&b(c.Flex,{},void 0,b(c.Text,{fontWeight:"100",pt:2,fontSize:{base:"0.5rem",sm:"0.7rem",md:"0.8rem"},width:"100%",color:"gray.600"},void 0,`Maximum ${f.ni} characters allowed.`)),b(c.Flex,{},void 0,W&&b(h.zx,{isDisabled:m,onClick:()=>{_({displayname:t,shortintro:o,authoruid:e,cb:e=>{p().set("displayname",t),x(e)}})}},void 0,"Save"),W&&b(h.zx,{disabled:m,onClick:()=>{T(M),x(!0)}},void 0,"Cancel")),0==u.length?n().createElement(n().Fragment,null,b(c.Text,{fontSize:{sm:"1.4rem",md:"1.8rem"},my:3,mr:1,color:"gray.600"},void 0,"All the experiences you publish or draft will appear here."),b(h.zx,{position:"relative",variant:"solid",onClick:()=>{v.Z.push(`${f.EG}`)}},void 0,"Get Started")):n().createElement(n().Fragment,null,A,b(c.Stack,{spacing:3},void 0,u&&u.map((t=>{const{title:r,slugkey:o,slug:i,ispublished:l,publishdate:a,experienceintrotext:u,created_at:s}=t;return b(c.Flex,{},o,b(c.PseudoBox,{cursor:"pointer",borderColor:"gray.200",borderWidth:1,borderRadius:"8px",width:"100%",_hover:{borderColor:"teal.400",bg:"teal.50"}},void 0,b(c.Flex,{w:"100%"},void 0,b(c.Flex,{width:"100%"},void 0,b(c.Box,{w:"100%",onClick:()=>((e,t,r)=>{v.Z.push(`/${e}/${t}-${r}`)})(e,i,o)},void 0,b(h.Uj,{width:"100%"},void 0,r,b(h.m3,{},void 0,u),b(c.Flex,{},void 0,b(h.WE,{},void 0,l?`Published on ${a}`:`Started ${s}`))))),b(c.Flex,{margin:"10px",align:"center",justify:"left"},void 0,W&&n().createElement(y,{ispublished:l,slugkey:o,onDeleteExperienceCb:q})))))}))),b(h.zx,{onClick:()=>{P(!0),R({query:B,variables:{cursor:C,experienceperpage:10,uid:e},updateQuery:(e,{fetchMoreResult:t})=>{P(!1);const r=[...e.getAuthor.author.experiences,...t.getAuthor.author.experiences];return{getAuthor:{cursor:t.getAuthor.cursor,author:{displayname:t.getAuthor.author.displayname,shortintro:t.getAuthor.author.shortintro,experiences:r}}}}})}},void 0,D?E:"Load more")))};var w;function F(e,t,r,o){w||(w="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var i=e&&e.defaultProps,n=arguments.length-3;if(t||0===n||(t={children:void 0}),1===n)t.children=o;else if(n>1){for(var l=new Array(n),a=0;a<n;a++)l[a]=arguments[a+3];t.children=l}if(t&&i)for(var u in i)void 0===t[u]&&(t[u]=i[u]);else t||(t=i||{});return{$$typeof:w,type:e,key:void 0===r?null:""+r,ref:null,props:t,_owner:null}}const z="All of author",D=function(e,t){return{chunks:["allofauthor"],title:z,component:F(l.Z,{},void 0,F(C,{title:z,authoruid:t.authoruid}))}}}};