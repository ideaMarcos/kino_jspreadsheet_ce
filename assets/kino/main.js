import jspreadsheet from 'jspreadsheet-ce';

// export function init(ctx, exPayload) {
export async function init(ctx, exPayload) {
	[
		'https://fonts.googleapis.com/css?family=Material+Icons',
		'https://cdn.jsdelivr.net/npm/jspreadsheet-ce@5.0.4/dist/jspreadsheet.css',
		'https://cdn.jsdelivr.net/npm/jsuites@5.13.5/dist/jsuites.css',
	].forEach((url) => ctx.importCSS(url));

	const payload = convertKeysToCamelCase(exPayload);
	let worksheet = {};
	if (payload.columns) worksheet.columns = payload.columns;
	if (payload.data) worksheet.data = payload.data;
	if (payload.minDimensions) worksheet.minDimensions = payload.minDimensions;

	const worksheetUpdated = (ws, ...changes) =>
		ctx.pushEvent('update_sheet', ws.getConfig());

	let config = {
		resize: 'both',
		worksheets: [worksheet],
		onafterchanges: worksheetUpdated,
		onchangeheader: worksheetUpdated,
		ondeletecolumn: worksheetUpdated,
		ondeleterow: worksheetUpdated,
		oninsertcolumn: worksheetUpdated,
		oninsertrow: worksheetUpdated,
		onmerge: worksheetUpdated,
		onmovecolumn: worksheetUpdated,
		onmoverow: worksheetUpdated,
		onredo: worksheetUpdated,
		onsort: worksheetUpdated,
		onundo: worksheetUpdated,
		toolbar: function (toolbar) {
			const allowedItems = [
				'undo',
				'redo',
				'save',
				'format_bold',
				'format_color_text',
				'format_color_fill',
			];

			const toolbarItems = toolbar.items.filter(
				(item) => item.type == 'divisor' || allowedItems.includes(item.content),
			);
			toolbar.items = toolbarItems.concat({
				tooltip: 'Copy Elixir code',
				content: 'code',
				onclick: function () {
					const config = jspreadsheet.current.getConfig();
					const columns = config.columns
						.map((c) => `%{title: "${c.title || ''}"}`)
						.join(', ');
					const elixirColumns = `columns: [${columns}]`;
					const data = config.data
						.map((row) => row.map((x) => formatElixirValue(x)).join(', '))
						.join('], [');
					const elixirData = `data: [[${data}]]`;
					const elixirMinDimensions = config.minDimensions
						? `min_dimensions: [${config.minDimensions.join(', ')}]`
						: null;
					const sheetOptions = [elixirColumns, elixirData, elixirMinDimensions]
						.filter(Boolean)
						.join(',\n');
					const elixirCode = `KinoJspreadsheetCe.new(\n${sheetOptions})`;
					navigator.clipboard.writeText(elixirCode);
				},
			});
			return toolbar;
		},
	};

	const container = document.createElement('div');
	container.style.minHeight = '400px'; // to fit the contextMenu
	ctx.root.appendChild(container);
	jspreadsheet(container, config);

	// Prevent Livebook keyboard shortcuts from interfering with jspreadsheet
	document.addEventListener('keydown', (event) => event.stopPropagation());
}

function formatElixirValue(val) {
	if (val === null || val == '') return 'nil';
	switch (typeof val) {
		case 'string':
			return `"${val}"`;
		default:
			return val;
	}
}

function snakeToCamel(str) {
	return str.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
}

function convertKeysToCamelCase(obj) {
	if (Array.isArray(obj)) {
		return obj.map(convertKeysToCamelCase);
	}

	if (obj !== null && typeof obj === 'object') {
		return Object.fromEntries(
			Object.entries(obj).map(([key, value]) => [
				snakeToCamel(key),
				convertKeysToCamelCase(value),
			]),
		);
	}
	return obj;
}
