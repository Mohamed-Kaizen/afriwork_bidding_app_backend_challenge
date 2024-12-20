import { type } from "arktype"

export const validateUserAuth = type({
	username: "string",
	password: "string>6",
})
