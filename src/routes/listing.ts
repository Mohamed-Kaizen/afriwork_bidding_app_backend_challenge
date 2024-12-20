import { ServerRoute } from "@hapi/hapi"
import {
	createListingHandler,
	viewListings,
	closeListingHandler,
	viewListing,
} from "../controllers/listing"

export const listingRoutes: ServerRoute[] = [
	{
		method: "POST",
		path: "/listings",
		handler: createListingHandler,
	},
	{
		method: "GET",
		path: "/listings",
		handler: viewListings,
	},
	{
		method: "GET",
		path: "/listings/{id}",
		handler: viewListing,
	},
	{
		method: "POST",
		path: "/listings/{id}/close",
		handler: closeListingHandler,
	},
]
