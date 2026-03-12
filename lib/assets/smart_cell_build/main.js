function b(r,e){r.importCSS("https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap");let p=document.createElement("div");p.className="box";let a=document.createElement("form");a.className="form";let t=h("header-row"),n=u("Assign to","variable_name","text",e.variable_name||"s1"),o=u("Rows","min_dimensions_rows","number",e.min_dimensions_rows||"1",{min:"1"}),i=u("Columns","min_dimensions_cols","number",e.min_dimensions_cols||"1",{min:"1"});t.appendChild(n.container),t.appendChild(o.container),t.appendChild(i.container),a.appendChild(t);let s=document.createElement("div");s.className="section";let c=document.createElement("h3");c.className="section__title",c.textContent="Options",s.appendChild(c);let m=h(),d=g("Show Toolbar","toolbar",e.toolbar===!0);m.appendChild(d.container),s.appendChild(m),a.appendChild(s),p.appendChild(a),r.root.appendChild(p);let l=()=>{r.pushEvent("update",{variable_name:n.input.value||"s1",min_dimensions_rows:parseInt(o.input.value)||1,min_dimensions_cols:parseInt(i.input.value)||1,toolbar:d.input.checked})};n.input.addEventListener("change",l),o.input.addEventListener("change",l),i.input.addEventListener("change",l),d.input.addEventListener("change",l)}function h(r=""){let e=document.createElement("div");return e.className="row"+(r?` ${r}`:""),e}function u(r,e,p,a,t={}){let n=document.createElement("div");n.className="field";let o=document.createElement("label");o.htmlFor=e,o.className="field__label",o.textContent=r;let i=document.createElement("input");return i.id=e,i.type=p,i.value=a,i.className="input input--text",Object.entries(t).forEach(([s,c])=>{i.setAttribute(s,c)}),n.appendChild(o),n.appendChild(i),{container:n,input:i}}function g(r,e,p){let a=document.createElement("label");a.className="switch";let t=document.createElement("input");t.id=e,t.type="checkbox",t.checked=p;let n=document.createElement("span");n.className="switch__label",n.textContent=r,a.appendChild(t),a.appendChild(n);let o=document.createElement("div");return o.appendChild(a),{container:o,input:t}}var f=`
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
`,x=document.createElement("style");x.textContent=f;document.head.appendChild(x);export{b as init};
