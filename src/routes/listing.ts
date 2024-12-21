import { ServerRoute } from "@hapi/hapi"
import {
	createListingHandler,
	viewListings,
	closeListingHandler,
	viewListing,
	viewMyListings,
	viewMyListing,
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
		path: "/listings/mine",
		handler: viewMyListings,
	},
	{
		method: "GET",
		path: "/listings/mine/{id}",
		handler: viewMyListing,
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
