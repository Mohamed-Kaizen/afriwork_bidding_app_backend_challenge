export interface JWTClaims {
	/** Subject of the token, in this case the user's ID */
	sub: string

	/** Issuer at which the token was created */
	iat: number

	/** Expiration time of the token */
	exp: number
}
