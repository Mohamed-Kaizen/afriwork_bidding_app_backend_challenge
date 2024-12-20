import jwt from "jsonwebtoken"

/**
 * Generate a JWT token
 *
 * @param user_id - The user id
 *
 * @example
 * ```ts
 * const token = generateToken("user_id") // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 * ```
 *
 * @returns The JWT token
 */
export function generateToken(user_id: string) {
	return jwt.sign({ sub: user_id }, process.env.SECRET_KEY!, {
		expiresIn: process.env.JWT_EXPIRES_IN || "7d",
	})
}

/**
 * Verify a JWT token
 *
 * @param token - The JWT token
 *
 * @example
 * ```ts
 * const decoded = verifyToken(token) // { sub: "user_id", iat: 1632422078, exp: 1632425678 }
 * ```
 *
 * @returns The decoded JWT token
 */
export function verifyToken(token: string) {
	return jwt.verify(token, process.env.SECRET_KEY!)
}
