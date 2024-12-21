import { promises as fs } from "fs"
import { join } from "path"
import * as path from "path"
import { fileURLToPath } from "url"

async function copyEnvFile() {
	const __filename = fileURLToPath(import.meta.url)

	const __dirname = path.dirname(__filename)

	const envTxtPath = join(__dirname, ".env.txt")

	const envPath = join(__dirname, ".env")

	try {
		const data = await fs.readFile(envTxtPath, "utf-8")

		await fs.writeFile(envPath, data)

		console.log(".env file has been created successfully.")
	} catch (error) {
		console.error("Error copying .env file:", error)
	}
}

copyEnvFile()
