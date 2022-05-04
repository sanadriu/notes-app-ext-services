import * as uuid from "uuid";
import handler from "../../../libs/handler-lib";
import dynamo from "../../../libs/dynamo-lib";

async function lambda(event, context) {
	const data = JSON.parse(event.body);
	const params = {
		TableName: process.env.tableName,
		Item: {
			userId: event.requestContext.identity.cognitoIdentityId,
			noteId: uuid.v4(),
			content: data.content,
			attachment: data.attachment,
			createdAt: Date.now(),
		},
	};

	await dynamo.put(params);

	return { statusCode: 201, data: params.Item, success: true, message: "Note created successfully" };
}

export const main = handler(lambda);
