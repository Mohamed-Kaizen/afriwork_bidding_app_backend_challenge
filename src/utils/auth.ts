import Hapi from "@hapi/hapi"
import { verifyPassword } from "./hash"
import { generateToken } from "./jwt"
import { db } from "./db"

import type { JWTClaims } from "./types"

/**
 * This function is used to validate the JWT token sent by the client. It is used by the hapi-auth-jwt2 plugin.
 *
 * @param decoded - The decoded JWT token
 *
 * @param request - The request object
 *
 * @param resp - The response toolkit
 *
 * @returns An object with a boolean property `isValid` which is true if the user exists in the database, false otherwise.
 */
export async function validate(
	decoded: JWTClaims,
	request: Hapi.Request,
	resp: Hapi.ResponseToolkit,
) {
	const user = await db.user.findUnique({ where: { id: decoded.sub } })

	return { isValid: !!user }
}

/**
 * This function is used to authenticate the user. It checks if the user exists in the database and if the password is correct.
 *
 * @param username - The username of the user
 *
 * @param password - The password of the user
 *
 * @returns A JWT token if the user exists and the password is correct, otherwise it throws an error.
 */
export async function authenticate(username: string, password: string) {
	const user = await db.user.findUnique({ where: { username } })

	if (user && (await verifyPassword(password, user.password))) return generateToken(user.id)
	else throw new Error("Invalid credentials")
}
