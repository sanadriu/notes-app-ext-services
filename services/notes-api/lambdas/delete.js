import handler from "../../../libs/handler-lib";
import dynamo from "../../../libs/dynamo-lib";

async function lambda(event, context) {
	const params = {
		TableName: process.env.tableName,
		Key: {
			userId: event.requestContext.identity.cognitoIdentityId,
			noteId: event.pathParameters.id,
		},
		ReturnValues: "ALL_OLD",
	};

	const dbRes = await dynamo.delete(params);

	if (!dbRes.Attributes) {
		return { statusCode: 404, success: false, message: "Note not found" };
	}

	return { statusCode: 200, data: dbRes.Attributes, success: true, message: "Note deleted successfully" };
}

export const main = handler(lambda);
