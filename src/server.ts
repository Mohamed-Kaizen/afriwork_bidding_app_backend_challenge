import Hapi from "@hapi/hapi"
import { PrismaClient } from "@prisma/client"
import dotenv from "dotenv"
import * as Vision from "@hapi/vision"
import * as Inert from "@hapi/inert"
import Swagger from "hapi-swagger"
import HapiAuthJwt2 from "hapi-auth-jwt2"
import { validate } from "./utils/auth"
import { authRoutes } from "./routes/auth"
import { listingRoutes } from "./routes/listing"
import { bidRoutes } from "./routes/bid"

dotenv.config()

const prisma = new PrismaClient()

const swaggerOptions = {
	info: {
		title: "Afriwork Bidding API Documentation",
		version: "1",
	},
}

/** Initialize the server */
async function init() {
	const server = Hapi.server({
		port: process.env.PORT || 8000,
		host: process.env.HOST || "localhost",
		routes: {
			cors: {
				origin: ["*"],
			},
		},
	})

	await server.register([
		Inert, // required for hapi-swagger to work
		Vision, // required for hapi-swagger to work
		{
			plugin: Swagger,
			options: swaggerOptions,
		},
		{
			plugin: HapiAuthJwt2,
		},
	])

	server.auth.strategy("jwt", "jwt", {
		key: process.env.SECRET_KEY,
		validate,
		verifyOptions: { algorithms: ["HS256"] },
	})

	server.auth.default("jwt")

	server.route(authRoutes)
	server.route(listingRoutes)
	server.route(bidRoutes)

	await server.start()

	console.log(`Server running on ${server.info.uri}`)
}

process.on("unhandledRejection", (err) => {
	console.log(err)

	process.exit(1)
})

init()
