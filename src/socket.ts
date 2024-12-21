import { Server as HapiServer } from "@hapi/hapi"
import { Server as SocketIOServer } from "socket.io"
import { createServer } from "http"

let io: SocketIOServer

/**
 * Initialize the Socket.IO server
 *
 * @param hapiServer - The Hapi server instance
 */
export async function initSocket(hapiServer: HapiServer) {
	const httpServer = createServer(hapiServer.listener)

	io = new SocketIOServer(httpServer)

	io.on("connection", (socket) => {
		console.log("a user connected")
	})
}

/**
 * Get the Socket.IO server instance
 *
 * @returns The Socket.IO server instance
 */
export function getIO() {
	if (!io) throw new Error("Socket.IO is not initialized. Please call initSocket first.")

	return io
}
