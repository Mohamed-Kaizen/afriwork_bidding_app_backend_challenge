import { hash, verify } from "@node-rs/argon2"

/**
 * Hash a password using Argon2
 *
 * @param password - The password to hash
 *
 * @example
 * ```ts
 * const hashed = await hashPassword("password") // $argon2id$v=19$m=4096,t=3,p=1$...
 * ```
 *
 * @returns The hashed password
 */
export async function hashPassword(password: string): Promise<string> {
	return await hash(password, { secret: Buffer.from(process.env.SECRET_KEY!) })
}

/**
 * Verify a password using Argon2
 *
 * @param hashed - The hashed password
 *
 * @param password - The password to verify
 *
 * @example
 * ```ts
 * const match = await verifyPassword(hashed, "password") // true
 * ```
 *
 * @returns Whether the password matches the hashed password
 */
export async function verifyPassword(hashed: string, password: string): Promise<boolean> {
	return await verify(hashed, password, {
		secret: Buffer.from(process.env.SECRET_KEY!),
	})
}
