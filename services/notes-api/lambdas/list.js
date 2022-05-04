import handler from "../../../libs/handler-lib";
import dynamo from "../../../libs/dynamo-lib";

async function lambda(event, context) {
	const params = {
		TableName: process.env.tableName,
		KeyConditionExpression: "userId = :userId",
		ExpressionAttributeValues: {
			":userId": event.requestContext.identity.cognitoIdentityId,
		},
	};

	const dbRes = await dynamo.query(params);

	return { statusCode: 200, data: dbRes.Items, success: true, message: "Notes fetched successfully" };
}

export const main = handler(lambda);
