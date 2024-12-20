import { db } from "../utils/db"

/**
 * Create a new listing
 *
 * @param title - The title of the listing
 *
 * @param description - The description of the listing
 *
 * @param amount - The starting bid amount
 *
 * @param userId - The ID of the user creating the listing
 *
 * @returns The newly created listing
 */
export async function createListing(
	title: string,
	description: string | null,
	amount: number,
	userId: string,
) {
	return await db.listing.create({
		data: { title, description, startingBid: amount, createdById: userId },
	})
}

/**
 * Get all active listings
 *
 * @returns All active listings with their bid count
 */
export async function getActiveListings() {
	return await db.listing.findMany({
		where: { isClosed: false },
		include: {
			_count: {
				select: { bids: true },
			},
		},
	})
}

/**
 * Close a listing by owner
 *
 * @param listingId - The ID of the listing to close
 *
 * @param userId - The ID of the user closing the listing
 *
 * @returns The updated listing
 */
export async function closeListing(listingId: string, userId: string) {
	const listing = await db.listing.findUnique({ where: { id: listingId } })

	if (!listing) throw new Error("Listing not found")

	if (listing?.createdById !== userId) throw new Error("Unauthorized")

	if (!listing.currentBid) throw new Error("No bids on listing")

	if (listing.isClosed) throw new Error("Listing is already closed")

	return await db.listing.update({
		where: { id: listingId },
		data: { closedAt: new Date(), isClosed: true },
	})
}

/**
 * Get a listing by ID
 *
 * @param listingId - The ID of the listing to get
 *
 * @returns The listing with the given ID
 */
export async function getListing(listingId: string) {
	return await db.listing.findUnique({
		where: { id: listingId },
		include: {
			_count: {
				select: { bids: true },
			},
		},
	})
}
