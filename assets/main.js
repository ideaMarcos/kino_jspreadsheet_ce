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

	const setDataEvent = (sheet, changes) =>
		ctx.pushEvent('set_data', sheet.getData());
	let config = {
		worksheets: [worksheet],
		onafterchanges: setDataEvent,
		onchangeheader: setDataEvent,
		ondeletecolumn: setDataEvent,
		ondeleterow: setDataEvent,
		oninsertcolumn: setDataEvent,
		oninsertrow: setDataEvent,
		onmerge: setDataEvent,
		onmovecolumn: setDataEvent,
		onmoverow: setDataEvent,
		onsort: setDataEvent,
	};
	if (payload.contextMenu === false) config.contextMenu = () => false;
	if (payload.tabs) config.tabs = payload.tabs;
	if (payload.toolbar) config.toolbar = payload.toolbar;

	const container = document.createElement('div');
	container.id = 'spreadsheet';
	container.style.width = '100%';
	container.style.height = 'auto';

	ctx.root.appendChild(container);
	jspreadsheet(container, config);
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
