import{o as u,r as i,n as g,j as e,C}from"./index-Cjwx5h4X.js";import{C as y,a as E,b as o,A as d}from"./constant-CYzBiGwF.js";import{C as l,a as n}from"./CRow-DBO4UyjQ.js";import{C as b}from"./CCardHeader-BnaznyAs.js";import{a as x}from"./index.esm-DRrJMXd2.js";const L=()=>{const{id:t}=u(),[s,f]=i.useState(null),[h,a]=i.useState(!1),c=g(),p=async()=>{a(!0);try{const r=await o.get(`${d}/${t}`);f(r.data.data)}catch(r){console.error("Error fetching offer detail",r)}finally{a(!1)}},j=r=>r===0||r===""||!r?"-":r,m=async()=>{if(window.confirm("Êtes-vous sûr de vouloir supprimer cette offre ?"))try{await o.delete(`${d}/${t}`),alert("Offre supprimée avec succès"),c("/offre/liste")}catch(r){console.error("Erreur lors de la suppression de l'offre",r),alert("Erreur lors de la suppression de l'offre")}};return i.useEffect(()=>{p()},[t]),e.jsx(l,{children:e.jsx(n,{xs:12,children:e.jsxs(y,{className:"mb-4",children:[e.jsx(b,{className:"text-center",children:e.jsx("strong",{children:"DETAIL DE L'OFFRE"})}),e.jsx(E,{children:h?e.jsx(C,{}):s?e.jsxs("div",{children:[e.jsxs("h4",{className:"text-left mb-4",children:["Poste : ",s.label]}),e.jsxs(l,{children:[e.jsxs(n,{md:6,children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Entreprise : "}),s.company]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Ville : "}),s.city]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Date de publication : "}),s.publicationdate]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Compétences : "}),s.skills]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Contrat : "}),s.contract]})]}),e.jsxs(n,{md:6,children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Type : "}),s.type]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Date limite candidature : "}),s.deadlinedate]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Langue : "}),s.language.label," (",s.language.level,")"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Expérience minimale : "}),j(s.minexperience)," ans"]})]})]}),e.jsxs(l,{children:[e.jsx(n,{md:6,children:e.jsx("div",{className:"text-center mt-4",children:e.jsx(x,{color:"primary",onClick:()=>c("/offre/liste"),children:"Retour vers la liste"})})}),e.jsx(n,{md:6,children:e.jsx("div",{className:"text-center mt-4",children:e.jsx(x,{color:"danger",onClick:m,children:"Supprimer l'offre"})})})]})]}):e.jsx("p",{children:"Aucune donnée disponible"})})]})})})};export{L as default};