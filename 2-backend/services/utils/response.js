export function sendResponse(statusCode, responseObj) {
	return {
		statusCode: statusCode,
		body: JSON.stringify(responseObj),
	};
}