import { Request, ResponseToolkit } from "@hapi/hapi"
import { createOrUpdateBid } from "../services/bid"
import { type } from "arktype"
import { validatePlaceBid } from "../utils/validators"

export async function placeBid(request: Request, rep: ResponseToolkit) {
	const result = validatePlaceBid(request.payload)

	if (result instanceof type.errors) return rep.response({ error: result.summary }).code(400)

	const userId = request.auth.credentials.sub as string

	try {
		const bid = await createOrUpdateBid(userId, result.listingId, result.bidAmount)

		return rep.response(bid).code(200)
	} catch (err: unknown) {
		if (err instanceof Error) return rep.response({ error: err.message }).code(400)
	}
}
