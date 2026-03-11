function w(e,t){e.importCSS("https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap");let s=document.createElement("div");s.className="box";let o=document.createElement("form");o.className="form";let n=f("header-row"),a=x("Assign to","variable_name","text",t.variable_name||"s1"),i=x("Rows","min_dimensions_rows","number",t.min_dimensions_rows||"1",{min:"1"}),r=x("Columns","min_dimensions_cols","number",t.min_dimensions_cols||"1",{min:"1"});n.appendChild(a.container),n.appendChild(i.container),n.appendChild(r.container),o.appendChild(n);let c=document.createElement("div");c.className="section";let d=document.createElement("h3");d.className="section__title",d.textContent="Options",c.appendChild(d);let l=f(),u=g("Show Toolbar","toolbar",t.toolbar===!0),h=g("Show Tabs","tabs",t.tabs===!0),m=g("Show Context Menu","context_menu",t.context_menu!==!1);l.appendChild(u.container),l.appendChild(h.container),l.appendChild(m.container),c.appendChild(l),o.appendChild(c),s.appendChild(o),e.root.appendChild(s);let p=()=>{e.pushEvent("update",{variable_name:a.input.value||"s1",min_dimensions_rows:parseInt(i.input.value)||1,min_dimensions_cols:parseInt(r.input.value)||1,toolbar:u.input.checked,tabs:h.input.checked,context_menu:m.input.checked})};a.input.addEventListener("change",p),i.input.addEventListener("change",p),r.input.addEventListener("change",p),u.input.addEventListener("change",p),h.input.addEventListener("change",p),m.input.addEventListener("change",p)}function f(e=""){let t=document.createElement("div");return t.className="row"+(e?` ${e}`:""),t}function x(e,t,s,o,n={}){let a=document.createElement("div");a.className="field";let i=document.createElement("label");i.htmlFor=t,i.className="field__label",i.textContent=e;let r=document.createElement("input");return r.id=t,r.type=s,r.value=o,r.className="input input--text",Object.entries(n).forEach(([c,d])=>{r.setAttribute(c,d)}),a.appendChild(i),a.appendChild(r),{container:a,input:r}}function g(e,t,s){let o=document.createElement("label");o.className="switch";let n=document.createElement("input");n.id=t,n.type="checkbox",n.checked=s;let a=document.createElement("span");a.className="switch__label",a.textContent=e,o.appendChild(n),o.appendChild(a);let i=document.createElement("div");return i.appendChild(o),{container:i,input:n}}var b=`
  :root {
    --gray-50: #f8fafc;
    --gray-100: #f0f5f9;
    --gray-150: #e8f1fe;
    --gray-200: #e2e8f0;
    --gray-300: #cbd5e1;
    --gray-500: #64748b;
    --gray-700: #334155;
    --gray-900: #0f1419;
    --blue-600: #3e64ff;
    --blue-50: #f0f4ff;
  }

  .box {
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    background: white;
    border: 1px solid var(--gray-300);
    border-radius: 12px;
    padding: 0;
    width: 100%;
    box-sizing: border-box;
  }

  .box__title {
    font-size: 16px;
    font-weight: 600;
    color: var(--gray-900);
    margin: 0 0 20px 0;
    letter-spacing: -0.3px;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
  }

  .row {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }

  .row.header-row {
    background: var(--gray-150);
    border-radius: 8px;
    padding: 16px;
    gap: 20px;
  }

  .row.header-row .field {
    flex: 1;
    min-width: 140px;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
    min-width: 120px;
  }

  .field__label {
    font-size: 12px;
    font-weight: 600;
    color: var(--gray-700);
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }

  .input {
    padding: 10px 12px;
    font-size: 13px;
    border: 1px solid var(--gray-200);
    border-radius: 6px;
    font-family: inherit;
    transition: all 0.15s ease;
    background: white;
    color: var(--gray-900);
  }

  .input::placeholder {
    color: var(--gray-500);
  }

  .input:hover {
    border-color: var(--gray-300);
  }

  .input:focus {
    outline: none;
    border-color: var(--blue-600);
    box-shadow: 0 0 0 3px var(--blue-50);
    background: white;
  }

  .input--text {
    max-width: 100%;
  }

  .switch {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    user-select: none;
    padding: 8px 0;
  }

  .switch input {
    appearance: none;
    width: 44px;
    height: 24px;
    padding: 0;
    margin: 0;
    cursor: pointer;
    border: none;
    border-radius: 12px;
    background: var(--gray-200);
    transition: all 0.25s ease;
    position: relative;
    flex-shrink: 0;
  }

  .switch input:hover {
    background: var(--gray-300);
  }

  .switch input:checked {
    background: var(--blue-600);
  }

  .switch input::after {
    content: "";
    position: absolute;
    top: 3px;
    left: 3px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: white;
    transition: left 0.25s ease;
  }

  .switch input:checked::after {
    left: 23px;
  }

  .switch__label {
    font-size: 13px;
    color: var(--gray-700);
    font-weight: 500;
  }

  .section {
    display: flex;
    flex-direction: column;
    gap: 12px;
    background: white;
    border-radius: 8px;
    padding: 16px;
  }

  .section__title {
    font-size: 12px;
    font-weight: 600;
    color: var(--gray-700);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 0 0 8px 0;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--gray-200);
  }

  .section .row {
    gap: 16px;
  }
`;if(!document.querySelector("style[data-kino-jspreadsheet]")){let e=document.createElement("style");e.setAttribute("data-kino-jspreadsheet","true"),e.textContent=b,document.head.appendChild(e)}export{w as init};
