(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(36)},36:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(13),u=t.n(o),c=t(2),l=function(e){var n=e.personlist,t=e.namefilter,a=e.deletePerson;return r.a.createElement("div",null,n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())})).map((function(e){return r.a.createElement("p",{key:e.name},e.name+" "+e.number+" ",r.a.createElement("button",{onClick:function(){window.confirm("Want to delete ".concat(e.name))&&a(e.id)}},"delete"))})))},i=function(e){var n=e.nameFilter,t=e.filterNames;return r.a.createElement("div",null,"filter shown with:",r.a.createElement("input",{value:n,onChange:t}))},m=function(e){var n=e.addName,t=e.newName,a=e.handleNameChange,o=e.newNumber,u=e.handleNumberChange;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name:",r.a.createElement("input",{value:t,onChange:a})),r.a.createElement("div",null,"number:",r.a.createElement("input",{value:o,onChange:u})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},d=t(3),s=t.n(d),f="/api/persons",b=function(){return s.a.get(f).then((function(e){return e.data}))},h=function(e){return s.a.post(f,e).then((function(e){return e.data}))},p=function(e,n){return s.a.put("".concat(f,"/").concat(e),n).then((function(e){return e.data}))},g=function(e){return s.a.delete("".concat(f,"/").concat(e)).then((function(e){return e.data}))},E={color:"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},v={color:"red",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},w=function(e){var n=e.message,t=e.errorFlag;return n?r.a.createElement("div",{style:!1===t?E:v},n):null},j=function(){var e=Object(a.useState)([]),n=Object(c.a)(e,2),t=n[0],o=n[1],u=Object(a.useState)(""),d=Object(c.a)(u,2),s=d[0],f=d[1],E=Object(a.useState)(""),v=Object(c.a)(E,2),j=v[0],N=v[1],O=Object(a.useState)(""),S=Object(c.a)(O,2),k=S[0],C=S[1],y=Object(a.useState)(null),F=Object(c.a)(y,2),T=F[0],B=F[1],P=Object(a.useState)(!1),z=Object(c.a)(P,2),A=z[0],J=z[1];Object(a.useEffect)((function(){b().then((function(e){o(e)}))}),[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(w,{message:T,errorFlag:A}),r.a.createElement(i,{nameFilter:k,filterNames:function(e){return C(e.target.value)}}),r.a.createElement("h3",null,"Add a new"),r.a.createElement(m,{addName:function(e){if(e.preventDefault(),t.map((function(e){return e.name})).includes(s)){if(window.confirm("".concat(s," is already added to phonebook, replace the old number with new one?"))){var n=t.filter((function(e){return e.name===s})),a={name:n[0].name,number:j};n[0].number=j,p(n[0].id,a).then((function(e){o(t.map((function(t){return t.id!==n.id?t:e}))),B("Updated ".concat(s," number with: ").concat(j)),setTimeout((function(){B(null),J(!1)}),5e3),f(""),N("")})).catch((function(e){console.log(e.response.data),J(!0),B("".concat(e.response.data.error)),setTimeout((function(){B(null),J(!1)}),5e3)}))}}else h({name:s,number:j}).then((function(e){o(t.concat(e)),B("Added ".concat(s," with number ").concat(j)),J(!1),setTimeout((function(){B(null)}),5e3),f(""),N("")})).catch((function(e){console.log(e.response.data),J(!0),B("".concat(e.response.data.error)),setTimeout((function(){B(null),J(!1)}),5e3)}))},newName:s,handleNameChange:function(e){return f(e.target.value)},newNumber:j,handleNumberChange:function(e){return N(e.target.value)}}),r.a.createElement("h3",null,"Numbers"),r.a.createElement(l,{personlist:t,namefilter:k,deletePerson:function(e){g(e).then((function(n){o(t.filter((function(n){return n.id!==e})))}))}}))};u.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(j,null)),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.350c6b41.chunk.js.map