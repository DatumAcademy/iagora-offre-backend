import{r as o,j as e,C as y,L as E}from"./index-Cjwx5h4X.js";import{C as D,a as T,b as L,A as R}from"./constant-CYzBiGwF.js";import{C as I,a as F,b as j,c as r,d as k,e as c,P as z}from"./PaginationPerso-CRZnBz-y.js";import{C as p,a as s}from"./CRow-DBO4UyjQ.js";import{C as N}from"./CCardHeader-BnaznyAs.js";import{C as O}from"./CForm-DIBcrnez.js";import{C}from"./CFormSelect-BUKxBF4B.js";import{C as i}from"./CFormInput-D_S-EnzH.js";import{a as w}from"./index.esm-DRrJMXd2.js";const J=()=>{const[g,u]=o.useState([]),[n,f]=o.useState({type:"",skills:"",label:"",contract:"",minexperience:"",language:"",sortPublicationDate:"DESC"}),[S,x]=o.useState(!1),[d,b]=o.useState({totalPages:1,currentPage:1,pageSize:20,totalResults:0}),h=async(a=0)=>{x(!0);try{const t=(await L.get(`${R}/search`,{params:{...n,page:a,pageSize:d.pageSize}})).data.data;u(t.offers),b({totalPages:t.totalPages,currentPage:t.currentPage,pageSize:t.pageSize,totalResults:t.totalResults})}catch(m){console.error("Error fetching offers",m)}finally{x(!1)}};o.useEffect(()=>{h()},[]);const l=a=>{f({...n,[a.target.name]:a.target.value})},P=()=>{h()},v=a=>{h(a)};return e.jsx(p,{children:e.jsx(s,{xs:12,children:e.jsxs(D,{className:"mb-4",children:[e.jsx(N,{className:"text-center",children:e.jsx("strong",{children:"LISTE DES OFFRES DISPONIBLES"})}),e.jsxs(T,{children:[e.jsx(O,{children:e.jsxs(s,{xs:12,children:[e.jsxs(p,{className:"mb-3",children:[e.jsx(s,{md:3,children:e.jsxs(C,{name:"type",value:n.type,onChange:l,children:[e.jsx("option",{value:"",children:"Type d'offre"}),e.jsx("option",{value:"Stage",children:"Stage"}),e.jsx("option",{value:"Emplois",children:"Emplois"})]})}),e.jsx(s,{md:3,children:e.jsx(i,{name:"skills",placeholder:"Compétences",value:n.skills,onChange:l})}),e.jsx(s,{md:3,children:e.jsx(i,{name:"label",placeholder:"Titre de l\\'offre",value:n.label,onChange:l})}),e.jsx(s,{md:3,children:e.jsxs(C,{name:"contract",value:n.contract,onChange:l,children:[e.jsx("option",{value:"",children:"Type de contrat"}),e.jsx("option",{value:"Stagiaire",children:"Stage"}),e.jsx("option",{value:"CDD",children:"CDD"}),e.jsx("option",{value:"CDI",children:"CDI"})]})})]}),e.jsxs(p,{className:"mb-3",children:[e.jsx(s,{md:3,children:e.jsx(i,{name:"minexperience",placeholder:"Min Expérience",value:n.minexperience,onChange:l})}),e.jsx(s,{md:3,children:e.jsx(i,{name:"language",placeholder:"Langue",value:n.language,onChange:l})}),e.jsx(s,{md:3,children:e.jsx(w,{color:"primary",onClick:P,children:"Rechercher"})})]})]})}),S?e.jsx(y,{}):e.jsxs(I,{children:[e.jsx(F,{children:e.jsxs(j,{children:[e.jsx(r,{scope:"col",children:"Libellé"}),e.jsx(r,{scope:"col",children:"Entreprise"}),e.jsx(r,{scope:"col",children:"Contrat"}),e.jsx(r,{scope:"col",children:"Type de travail"}),e.jsx(r,{scope:"col",children:"Publié le"})]})}),e.jsx(k,{children:g.map(a=>e.jsxs(j,{children:[e.jsx(r,{scope:"row",children:e.jsx(E,{to:`/offre/detail/${a.id}`,name:"A propos de l\\'offre",children:a.label})}),e.jsx(c,{children:a.company}),e.jsx(c,{children:a.contract}),e.jsx(c,{children:a.type}),e.jsx(c,{children:a.publicationdate})]},a.id))})]}),e.jsx(s,{xs:12,children:e.jsx(z,{currentPage:d.currentPage,totalPages:d.totalPages,onPageChange:v})})]})]})})})};export{J as default};