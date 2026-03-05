import jspreadsheet from 'jspreadsheet-ce';

export function init(ctx, exPayload) {
	[
		'https://fonts.googleapis.com/css?family=Material+Icons',
		'https://cdn.jsdelivr.net/npm/jspreadsheet-ce@5.0.4/dist/jspreadsheet.css',
		'https://cdn.jsdelivr.net/npm/jsuites@5.13.5/dist/jsuites.css',
	].forEach((url) => ctx.importCSS(url));

	const payload = convertKeysToCamelCase(exPayload);
	let worksheet = {
		data: !!payload.data ? payload.data : undefined,
		columns: !!payload.columns ? payload.columns : undefined,
		minDimensions: !!payload.minDimensions ? payload.minDimensions : undefined,
	};

	const config = {
		toolbar: !!payload.toolbar ? payload.toolbar : undefined,
		worksheets: [worksheet],
	};

	const container = document.createElement('spreadsheet');
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
