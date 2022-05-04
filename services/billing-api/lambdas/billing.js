import Stripe from "stripe";
import handler from "../../../libs/handler-lib";
import { calculateCost } from "../../../libs/billing-lib";

async function lambda(event, context) {
	const data = JSON.parse(event.body);
	const { source, storage } = data;

	const stripe = new Stripe(process.env.stripeSecretKey);
	const amount = calculateCost(storage);
	const description = "Scratch charge";

	await stripe.charges.create({
		source,
		description,
		amount,
		currency: "usd",
	});

	return { statusCode: 200, success: true, message: "User charged successfully" };
}

export const main = handler(lambda);
