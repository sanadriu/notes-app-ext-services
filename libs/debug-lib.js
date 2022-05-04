import AWS from "aws-sdk";
import util from "util";

const timer = { current: null };
const logs = [];

export function init(event, context) {
	debug("API Event", {
		body: event?.body,
		pathParameters: event?.pathParameters,
		queryStringParameters: event?.queryStringParameters,
	});

	timer.current = setTimeout(() => {
		flush(new Error("Lambda will timeout in 100 ms"));
	}, context.getRemainingTimeInMillis() - 100);
}

export function end() {
	clearTimeout(timer.current);

	timer.current = null;
}

export function flush(error) {
	logs.forEach(({ date, string }) => console.debug(date, string));

	console.error(error);
}

export function debug() {
	logs.push({ date: new Date(), string: util.format.apply(null, arguments) });
}

AWS.config.logger = { log: debug };
