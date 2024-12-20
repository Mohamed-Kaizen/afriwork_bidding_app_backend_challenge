import { type } from "arktype"

export const validateUserAuth = type({
	username: "string",
	password: "string>6",
})

export const validateCreateListing = type({
	title: "string",
	description: "string | null",
	startBid: "number>0",
})
