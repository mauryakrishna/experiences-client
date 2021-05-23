require("source-map-support").install(),exports.id=69,exports.ids=[69],exports.modules={7723:(e,t,r)=>{"use strict";r.d(t,{Z:()=>u}),r(9297),r(4229);var n,o=r(2668),i=r(5976),l=r(1966);function s(e,t,r,o){n||(n="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var i=e&&e.defaultProps,l=arguments.length-3;if(t||0===l||(t={children:void 0}),1===l)t.children=o;else if(l>1){for(var s=new Array(l),a=0;a<l;a++)s[a]=arguments[a+3];t.children=s}if(t&&i)for(var u in i)void 0===t[u]&&(t[u]=i[u]);else t||(t=i||{});return{$$typeof:n,type:e,key:void 0===r?null:""+r,ref:null,props:t,_owner:null}}var a=s(o.Avatar,{mr:3});const u=({uid:e,displayname:t,publishdate:r})=>s(o.PseudoBox,{align:"left"},void 0,s(o.Flex,{align:"flex-end"},void 0,a,s(o.Flex,{display:"block"},void 0,s(l.default,{to:`/author/${e}`},void 0,t),s(i.WE,{},void 0,r||"Not published yet."))))},3365:(e,t,r)=>{"use strict";r.d(t,{Z:()=>P});var n,o=r(9297),i=r.n(o),l=r(3279),s=r.n(l),a=(r(4229),r(560)),u=r(4684),d=r(8262),c=r(9691),p=r(9875),f=r.n(p),y=r(2668),h=r(5976),v=r(7169),g=r(7723),m=r(5649),E=r(8715);function b(e,t,r,o){n||(n="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var i=e&&e.defaultProps,l=arguments.length-3;if(t||0===l||(t={children:void 0}),1===l)t.children=o;else if(l>1){for(var s=new Array(l),a=0;a<l;a++)s[a]=arguments[a+3];t.children=s}if(t&&i)for(var u in i)void 0===t[u]&&(t[u]=i[u]);else t||(t=i||{});return{$$typeof:n,type:e,key:void 0===r?null:""+r,ref:null,props:t,_owner:null}}const S=s()({resolved:{},chunkName:()=>"Thoughts",isReady(e){var t=this.resolve(e);return!0===this.resolved[t]&&!!r.m[t]},importAsync:()=>r.e(585).then(r.bind(r,5586)),requireAsync(e){var t=this,r=this.resolve(e);return this.resolved[r]=!1,this.importAsync(e).then((function(e){return t.resolved[r]=!0,e}))},requireSync(e){var t=this.resolve(e);return r(t)},resolve:()=>5586});var A=b(h.gb,{}),x=b(y.Text,{fontSize:"1rem",fontWeight:"bold"},void 0," ","Something went wrong."),L=b(y.Divider,{pt:"1rem",orientation:"horizontal"}),_=b(y.Text,{textAlign:"center",m:"15px",fontWeight:"400",color:"gray.300"},void 0,"Author has turned off thoughts for this experience.");const P=({slug:e})=>{const[t,r]=(0,o.useState)([{children:[{text:""}]}]),[n,l]=(0,o.useState)(""),[s,p]=(0,o.useState)(""),[h,P]=(0,o.useState)(""),[N,T]=(0,o.useState)(""),[k,R]=(0,o.useState)(""),[G,M]=(0,o.useState)(!1),[$,w]=(0,o.useState)(!1),F=(0,o.useMemo)((()=>(0,d.pipe)((0,a.createEditor)())),[]),H=e.split("-"),I=H[H.length-1],B=f()`
    query getAnExperienceForRead($slugkey: String!) {
      getAnExperienceForRead(slugkey: $slugkey) {
        __typename
        ... on Experience {
          title
          experience
          publishdate
          thoughtsenabled
          author {
            uid
            displayname
            shortintro
          }
        }
        ... on ExperienceNotFound {
          experiencefound
        }
      }
    }
  `,{data:Z,error:z,loading:U}=(0,c.useQuery)(B,{variables:{slugkey:I}});return z&&console.log("error",z),i().useEffect((()=>{if(Z&&Z.getAnExperienceForRead){const{title:e,experience:t,thoughtsenabled:n,author:o,publishdate:i,experiencefound:s}=Z.getAnExperienceForRead;if(!1===s)w(!0);else if(e&&t&&o){l(e),r(t),M(n),p(i),R((0,E.Z)(t));const{uid:s,displayname:a}=o;P(s),T(a)}}}),[Z]),U?A:i().createElement(i().Fragment,null,b(m.Z,{title:n,description:k,canonical:`https://experiences.guru/${h}/${e}`,type:"article"}),$?x:b(y.PseudoBox,{px:{base:"1.5rem",sm:"2rem",md:"8rem"},py:2},void 0,b(y.Flex,{align:"left",pb:5},void 0,b(y.Text,{as:"h1",fontWeight:"400",fontSize:{base:"2rem",sm:"2rem",md:"2.5rem"}},void 0,n)),b(y.Flex,{pb:"2rem"},void 0,b(g.Z,{uid:h,displayname:N,publishdate:s})),b(y.Flex,{justify:"left",py:5},void 0,b(u.Slate,{editor:F,value:t},void 0,b(d.EditablePlugins,{plugins:v.G,readOnly:!0,autoFocus:!0,placeholder:"Read here.",style:{fontSize:"1.1rem",fontWeight:"400",lineHeight:"1.5"},renderLeaf:[v.n]}))),L,G&&b(S,{slugkey:I,thoughtauthoruid:h}),!G&&_))}},7169:(e,t,r)=>{"use strict";r.d(t,{G:()=>a,n:()=>s.n});var n=r(8302),o=r(6022),i=r(1457),l=r(1163),s=r(6615);const a=[...l.G,...n.G,...o.G,...i.G]},6615:(e,t,r)=>{"use strict";var n;function o(e,t,r,o){n||(n="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var i=e&&e.defaultProps,l=arguments.length-3;if(t||0===l||(t={children:void 0}),1===l)t.children=o;else if(l>1){for(var s=new Array(l),a=0;a<l;a++)s[a]=arguments[a+3];t.children=s}if(t&&i)for(var u in i)void 0===t[u]&&(t[u]=i[u]);else t||(t=i||{});return{$$typeof:n,type:e,key:void 0===r?null:""+r,ref:null,props:t,_owner:null}}r.d(t,{n:()=>i}),r(9297);const i=({children:e,leaf:t})=>t.strong&&t.text?o("strong",{className:"slate-strong"},void 0,e):e},8302:(e,t,r)=>{"use strict";r.d(t,{G:()=>i,z:()=>o});var n=r(8262);const o={typeH1:n.ELEMENT_H1,typeH2:n.ELEMENT_H2,typeH3:n.ELEMENT_H3,typeBlockquote:n.ELEMENT_BLOCKQUOTE,typeLink:n.ELEMENT_LINK,typeP:n.ELEMENT_PARAGRAPH},i=[(0,n.HeadingPlugin)(o),(0,n.CodeBlockPlugin)(o),(0,n.BlockquotePlugin)(o),(0,n.LinkPlugin)(o)]},1163:(e,t,r)=>{"use strict";r.d(t,{G:()=>i,z:()=>o});var n=r(8262);const o={typeAlignLeft:n.ELEMENT_ALIGN_LEFT,typeAlignRight:n.ELEMENT_ALIGN_RIGHT,typeAlignCenter:n.ELEMENT_ALIGN_CENTER},i=[(0,n.AlignPlugin)(o)]},6022:(e,t,r)=>{"use strict";r.d(t,{G:()=>i,z:()=>o});var n=r(8262);const o={typeUl:n.ELEMENT_UL,typeOl:n.ELEMENT_OL,typeLi:n.ELEMENT_LI},i=[(0,n.ListPlugin)(o)]},1457:(e,t,r)=>{"use strict";r.d(t,{G:()=>i,z:()=>o});var n=r(8262);const o={typeP:n.ELEMENT_PARAGRAPH,typeBold:n.DEFAULTS_BOLD.bold.type,typeItalic:n.MARK_ITALIC,typeUnderline:n.MARK_UNDERLINE,typeStrikethrough:n.MARK_STRIKETHROUGH},i=[(0,n.ParagraphPlugin)(o),(0,n.BoldPlugin)(o),(0,n.ItalicPlugin)(o),(0,n.UnderlinePlugin)(o),(0,n.StrikethroughPlugin)(o)]},4747:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s}),r(9297);var n,o=r(8675),i=r(3365);function l(e,t,r,o){n||(n="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var i=e&&e.defaultProps,l=arguments.length-3;if(t||0===l||(t={children:void 0}),1===l)t.children=o;else if(l>1){for(var s=new Array(l),a=0;a<l;a++)s[a]=arguments[a+3];t.children=s}if(t&&i)for(var u in i)void 0===t[u]&&(t[u]=i[u]);else t||(t=i||{});return{$$typeof:n,type:e,key:void 0===r?null:""+r,ref:null,props:t,_owner:null}}const s=function(e,t){return{chunks:["read-experience"],component:l(o.Z,{},void 0,l(i.Z,{slug:t.slug}))}}},5649:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s}),r(9297);var n,o=r(6481);function i(e,t,r,o){n||(n="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var i=e&&e.defaultProps,l=arguments.length-3;if(t||0===l||(t={children:void 0}),1===l)t.children=o;else if(l>1){for(var s=new Array(l),a=0;a<l;a++)s[a]=arguments[a+3];t.children=s}if(t&&i)for(var u in i)void 0===t[u]&&(t[u]=i[u]);else t||(t=i||{});return{$$typeof:n,type:e,key:void 0===r?null:""+r,ref:null,props:t,_owner:null}}var l=i("meta",{name:"twitter:card",content:"summary_large_image"});const s=({title:e,description:t,canonical:r,type:n})=>i(o.Helmet,{},void 0,i("title",{},void 0,e),i("meta",{name:"title",content:e}),i("meta",{name:"description",content:t}),i("link",{rel:"canonical",href:r}),i("meta",{property:"og:title",content:e}),i("meta",{property:"og:description",content:t}),i("meta",{property:"og:url",content:r}),i("meta",{property:"og:type",content:n}),i("meta",{name:"twitter:title",content:e}),i("meta",{name:"twitter:description",content:t}),l)},8715:(e,t,r)=>{"use strict";r.d(t,{Z:()=>o});var n=r(560);const o=e=>{let t="";for(const r of e||[])if(t+=n.Node.string(r),t.length>200){t=`${t.slice(0,200).trim()}...`;break}return t}}};