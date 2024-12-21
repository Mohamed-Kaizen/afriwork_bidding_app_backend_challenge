import { db } from "../utils/db"

export async function createOrUpdateBid(userId: string, listingId: string, amount: number) {
	const listing = await db.listing.findUnique({ where: { id: listingId } })

	if (listing?.createdById === userId) throw new Error("You cannot bid on your own listing")

	if (!listing || listing.closedAt) throw new Error("Listing not found or already closed")

	if (listing.currentBid && amount <= listing.currentBid)
		throw new Error(`Bid amount must be higher than current bid of $${listing.currentBid}`)

	if (!listing.currentBid && amount <= listing.startingBid)
		throw new Error(`Bid amount must be higher than starting bid of $${listing.startingBid}`)

	// check if the user has already placed a bid
	const existingBid = await db.bid.findFirst({
		where: {
			listingId: listingId,
			userId: userId,
		},
	})

	let bid

	if (existingBid)
		bid = await db.bid.update({
			where: { id: existingBid.id },
			data: { amount },
		})
	else
		bid = await db.bid.create({
			data: { listingId: listingId, userId: userId, amount },
		})

	// Update current bid in listing
	await db.listing.update({
		where: { id: listingId },
		data: { currentBid: amount },
	})

	return bid
}
