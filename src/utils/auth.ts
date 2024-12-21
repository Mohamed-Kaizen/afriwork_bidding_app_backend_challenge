import Hapi from "@hapi/hapi"

import type { JWTClaims } from "./types"

import { db } from "./db"
import { verifyPassword } from "./hash"
import { generateToken } from "./jwt"

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
