function g(t,n){t.importCSS("https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap");let o=document.createElement("div");o.className="box";let p=document.createElement("form");p.className="form";let i=u("header-row"),r=d("Assign to","variable_name","text",n.variable_name||"s1"),a=d("Rows","min_dimensions_rows","number",n.min_dimensions_rows||"1",{min:"1"}),e=d("Columns","min_dimensions_cols","number",n.min_dimensions_cols||"1",{min:"1"});i.appendChild(r.container),i.appendChild(a.container),i.appendChild(e.container),p.appendChild(i),o.appendChild(p),t.root.appendChild(o);let s=()=>{t.pushEvent("update",{variable_name:r.input.value||"s1",min_dimensions_rows:parseInt(a.input.value)||1,min_dimensions_cols:parseInt(e.input.value)||1})};r.input.addEventListener("change",s),a.input.addEventListener("change",s),e.input.addEventListener("change",s)}function u(t=""){let n=document.createElement("div");return n.className="row"+(t?` ${t}`:""),n}function d(t,n,o,p,i={}){let r=document.createElement("div");r.className="field";let a=document.createElement("label");a.htmlFor=n,a.className="field__label",a.textContent=t;let e=document.createElement("input");return e.id=n,e.type=o,e.value=p,e.className="input input--text",Object.entries(i).forEach(([s,c])=>{e.setAttribute(s,c)}),r.appendChild(a),r.appendChild(e),{container:r,input:e}}var m=`
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
`,l=document.createElement("style");l.textContent=m;document.head.appendChild(l);export{g as init};
