import { ServerRoute } from "@hapi/hapi"
import { register, login } from "../controllers/auth"

export const authRoutes: ServerRoute[] = [
	{
		method: "POST",
		path: "/register",
		options: {
			auth: false,
			handler: register,
			tags: ["api"],
		},
	},
	{
		method: "POST",
		path: "/login",
		options: {
			auth: false,
			handler: login,
		},
	},
]
