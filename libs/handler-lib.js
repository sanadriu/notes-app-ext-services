import * as debug from "./debug-lib";

export default function handler(lambda) {
	return async function (event, context) {
		const headers = {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Credentials": true,
		};

		try {
			debug.init(event, context);

			const { statusCode, ...result } = await lambda(event, context);

			return {
				headers,
				statusCode,
				body: JSON.stringify(result),
			};
		} catch (error) {
			debug.flush();

			return {
				headers,
				statusCode: 500,
				body: JSON.stringify({ success: false, message: error.message }),
			};
		} finally {
			debug.end();
		}
	};
}
