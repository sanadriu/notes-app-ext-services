import handler from "../../../libs/handler-lib";
import dynamo from "../../../libs/dynamo-lib";

async function lambda(event, context) {
	const paramsGet = {
		TableName: process.env.tableName,
		Key: {
			userId: event.requestContext.identity.cognitoIdentityId,
			noteId: event.pathParameters.id,
		},
	};

	const dbResGet = await dynamo.get(paramsGet);

	if (!dbResGet.Item) {
		return { statusCode: 404, success: false, message: "Note not found" };
	}

	const data = {
		...dbResGet.Item,
		...JSON.parse(event.body),
	};

	const paramsUpdate = {
		TableName: process.env.tableName,
		Key: {
			userId: event.requestContext.identity.cognitoIdentityId,
			noteId: event.pathParameters.id,
		},
		UpdateExpression: "SET content = :content, attachment = :attachment",
		ExpressionAttributeValues: {
			":attachment": data.attachment,
			":content": data.content,
		},
		ReturnValues: "ALL_NEW",
	};

	const dbResUpdate = await dynamo.update(paramsUpdate);

	return { statusCode: 200, data: dbResUpdate.Attributes, success: true, message: "Note updated successfully" };
}

export const main = handler(lambda);
