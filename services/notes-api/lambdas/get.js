import handler from "../../../libs/handler-lib";
import dynamo from "../../../libs/dynamo-lib";

async function lambda(event, context) {
	const params = {
		TableName: process.env.tableName,
		Key: {
			userId: event.requestContext.identity.cognitoIdentityId,
			noteId: event.pathParameters.id,
		},
	};

	const dbRes = await dynamo.get(params);

	if (!dbRes.Item) {
		return { statusCode: 404, success: false, message: "Note not found" };
	}

	return { statusCode: 200, data: dbRes.Item, success: true, message: "Note fetched successfully" };
}

export const main = handler(lambda);
