import { Request, ResponseToolkit } from "@hapi/hapi"
import { type } from "arktype"

import { registerUser, authenticate } from "../services/auth"
import { generateToken } from "../utils/jwt"
import { validateUserAuth } from "../utils/validators"

/**
 * The controller function for registering a new user.
 *
 * @param request - The request object
 *
 * @param rep - The response toolkit
 *
 * @returns The user object and a JWT token if the user was successfully registered
 */
export async function register(request: Request, rep: ResponseToolkit) {
	const result = validateUserAuth(request.payload)

	if (result instanceof type.errors) return rep.response({ error: result.summary }).code(400)

	const user: { id: string; username: string; password?: string } = await registerUser(
		result.username,
		result.password,
	)

	if (user.password) delete user.password

	return rep.response({ user, token: generateToken(user.id) }).code(201)
}

/**
 * The controller function for logging in a user.
 *
 * @param request - The request object
 *
 * @param rep - The response toolkit
 *
 * @returns A JWT token if the user was successfully authenticated
 */
export async function login(request: Request, rep: ResponseToolkit) {
	const result = validateUserAuth(request.payload)

	if (result instanceof type.errors) return rep.response({ error: result.summary }).code(400)

	try {
		const token = await authenticate(result.username, result.password)

		return rep.response({ token }).code(200)
	} catch (err) {
		return rep.response({ error: "Invalid credentials" }).code(401)
	}
}
