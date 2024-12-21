import { ServerRoute } from "@hapi/hapi"

import { placeBid } from "../controllers/bid"

export const bidRoutes: ServerRoute[] = [
	{
		method: "POST",
		path: "/bids",
		handler: placeBid,
	},
]
