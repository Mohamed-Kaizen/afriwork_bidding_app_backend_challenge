import { Request, ResponseToolkit } from "@hapi/hapi"
import {
	createListing,
	getActiveListings,
	closeListing,
	getListing,
	getMyListings,
	getMyListing,
} from "../services/listing"
import { type } from "arktype"
import { validateCreateListing } from "../utils/validators"

/**
 * Controller for creating a new listing
 *
 * @param request - The Hapi request object
 *
 * @param rep - The Hapi response toolkit
 *
 * @returns The newly created listing
 */
export async function createListingHandler(request: Request, rep: ResponseToolkit) {
	const result = validateCreateListing(request.payload)

	if (result instanceof type.errors) return rep.response({ error: result.summary }).code(400)

	const userId = request.auth.credentials.sub as string

	const listing = await createListing(result.title, result.description, result.startBid, userId)

	return rep.response(listing).code(201)
}

/**
 * Controller for viewing all active listings
 *
 * @param request - The Hapi request object
 *
 * @param rep - The Hapi response toolkit
 *
 * @returns All active listings
 */
export async function viewListings(request: Request, rep: ResponseToolkit) {
	const listings = await getActiveListings()

	return rep.response(listings).code(200)
}

/**
 * Controller for closing a listing
 *
 * @param request - The Hapi request object
 *
 * @param rep - The Hapi response toolkit
 *
 * @returns The updated listing
 */
export async function closeListingHandler(request: Request, rep: ResponseToolkit) {
	const userId = request.auth.credentials.sub as string

	const listingId = request.params.id

	try {
		const closedListing = await closeListing(listingId, userId)

		return rep.response(closedListing).code(200)
	} catch (err: unknown) {
		if (err instanceof Error) return rep.response({ error: err.message }).code(403)
	}
}

/**
 * Controller for viewing a single listing
 *
 * @param request - The Hapi request object
 *
 * @param rep - The Hapi response toolkit
 *
 * @returns The listing
 */
export async function viewListing(request: Request, rep: ResponseToolkit) {
	const listingId = request.params.id

	const listing = await getListing(listingId)

	if (!listing) return rep.response({ error: "Listing not found" }).code(404)

	return rep.response(listing).code(200)
}

/**
 * Controller for viewing a user's listing
 *
 * @param request - The Hapi request object
 *
 * @param rep - The Hapi response toolkit
 *
 * @returns The listing
 */
export async function viewMyListings(request: Request, rep: ResponseToolkit) {
	const userId = request.auth.credentials.sub as string

	const listings = await getMyListings(userId)

	return rep.response(listings).code(200)
}

/**
 * Controller for viewing a user's listing
 *
 * @param request - The Hapi request object
 *
 * @param rep - The Hapi response toolkit
 *
 * @returns The listing
 */
export async function viewMyListing(request: Request, rep: ResponseToolkit) {
	const userId = request.auth.credentials.sub as string

	const listingId = request.params.id

	const listing = await getMyListing(userId, listingId)

	if (!listing) return rep.response({ error: "Listing not found" }).code(404)

	return rep.response(listing).code(200)
}
