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
		method: "POST",
		path: "/listings/{id}/close",
		handler: closeListingHandler,
	},
	{
		method: "GET",
		path: "/listings",
		options: {
			auth: false,
			handler: viewListings,
		},
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
		options: {
			auth: false,
			handler: viewListing,
		},
	},
]
