import { db } from "../utils/db"
import { hashPassword, verifyPassword } from "../utils/hash"
import { generateToken } from "../utils/jwt"

/**
 * This function is used to register a new user. It hashes the password before storing it in the database.
 *
 * @param username - The username of the user
 *
 * @param password - The password of the user
 *
 * @returns The user object created in the database
 */
export async function registerUser(username: string, password: string) {
	const passwordHash = await hashPassword(password)

	return await db.user.create({
		data: { username, password: passwordHash },
	})
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

	if (user && (await verifyPassword(user.password, password))) return generateToken(user.id)
	else throw new Error("Invalid credentials")
}
