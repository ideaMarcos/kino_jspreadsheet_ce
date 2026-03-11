export function init(ctx, attrs) {
	ctx.importCSS(
		'https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap',
	);

	const container = document.createElement('div');
	container.className = 'box';

	const form = document.createElement('form');
	form.className = 'form';

	// Header row with variable name and dimensions
	const headerRow = createRow('header-row');
	const varInput = createInput(
		'Assign to',
		'variable_name',
		'text',
		attrs['variable_name'] || 's1',
	);
	const rowsInput = createInput(
		'Rows',
		'min_dimensions_rows',
		'number',
		attrs['min_dimensions_rows'] || '1',
		{ min: '1' },
	);
	const colsInput = createInput(
		'Columns',
		'min_dimensions_cols',
		'number',
		attrs['min_dimensions_cols'] || '1',
		{ min: '1' },
	);
	headerRow.appendChild(varInput.container);
	headerRow.appendChild(rowsInput.container);
	headerRow.appendChild(colsInput.container);
	form.appendChild(headerRow);

	// Options section
	const optionsSection = document.createElement('div');
	optionsSection.className = 'section';

	const sectionTitle = document.createElement('h3');
	sectionTitle.className = 'section__title';
	sectionTitle.textContent = 'Options';
	optionsSection.appendChild(sectionTitle);

	const optsRow = createRow();
	const toolbarSwitch = createSwitch(
		'Show Toolbar',
		'toolbar',
		attrs['toolbar'] === true,
	);
	const tabsSwitch = createSwitch('Show Tabs', 'tabs', attrs['tabs'] === true);
	const contextMenuSwitch = createSwitch(
		'Show Context Menu',
		'context_menu',
		attrs['context_menu'] !== false,
	);
	optsRow.appendChild(toolbarSwitch.container);
	optsRow.appendChild(tabsSwitch.container);
	optsRow.appendChild(contextMenuSwitch.container);
	optionsSection.appendChild(optsRow);

	form.appendChild(optionsSection);
	container.appendChild(form);
	ctx.root.appendChild(container);

	// Handle changes
	const pushUpdate = () => {
		ctx.pushEvent('update', {
			variable_name: varInput.input.value || 's1',
			min_dimensions_rows: parseInt(rowsInput.input.value) || 1,
			min_dimensions_cols: parseInt(colsInput.input.value) || 1,
			toolbar: toolbarSwitch.input.checked,
			tabs: tabsSwitch.input.checked,
			context_menu: contextMenuSwitch.input.checked,
		});
	};

	varInput.input.addEventListener('change', pushUpdate);
	rowsInput.input.addEventListener('change', pushUpdate);
	colsInput.input.addEventListener('change', pushUpdate);
	toolbarSwitch.input.addEventListener('change', pushUpdate);
	tabsSwitch.input.addEventListener('change', pushUpdate);
	contextMenuSwitch.input.addEventListener('change', pushUpdate);
}

function createRow(additionalClass = '') {
	const row = document.createElement('div');
	row.className = 'row' + (additionalClass ? ` ${additionalClass}` : '');
	return row;
}

function createInput(label, id, type, value, attributes = {}) {
	const container = document.createElement('div');
	container.className = 'field';

	const labelEl = document.createElement('label');
	labelEl.htmlFor = id;
	labelEl.className = 'field__label';
	labelEl.textContent = label;

	const input = document.createElement('input');
	input.id = id;
	input.type = type;
	input.value = value;
	input.className = 'input input--text';

	// Apply additional attributes
	Object.entries(attributes).forEach(([key, val]) => {
		input.setAttribute(key, val);
	});

	container.appendChild(labelEl);
	container.appendChild(input);

	return { container, input };
}

function createSwitch(label, id, checked) {
	const switchLabel = document.createElement('label');
	switchLabel.className = 'switch';

	const input = document.createElement('input');
	input.id = id;
	input.type = 'checkbox';
	input.checked = checked;

	// const toggle = document.createElement('span');
	// toggle.className = 'switch__toggle';

	const labelSpan = document.createElement('span');
	labelSpan.className = 'switch__label';
	labelSpan.textContent = label;

	switchLabel.appendChild(input);
	// switchLabel.appendChild(toggle);
	switchLabel.appendChild(labelSpan);

	const container = document.createElement('div');
	container.appendChild(switchLabel);

	return { container, input };
}

const styles = `
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
`;

// Inject styles
const styleEl = document.createElement('style');
styleEl.textContent = styles;
document.head.appendChild(styleEl);
