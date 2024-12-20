import { promises as fs } from "fs"
import { join } from "path"

async function copyEnvFile() {
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
