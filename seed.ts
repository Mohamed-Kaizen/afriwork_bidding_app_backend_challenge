import { PrismaClient } from "@prisma/client"

const run = async () => {
	const prisma = new PrismaClient()
	try {
		await prisma.user.createMany({
			data: [
				{
					id: "ec0eccc8-1159-40ed-830f-31ac3ffa778b",
					username: "l",
					password:
						"$argon2id$v=19$m=19456,t=2,p=1$sQ1Ec/ZPxYtAqIMDWqRZdg$0g6QYOEr8MakEg6aZFL9iw5DyA6l9xAv+vPCTwzvVP0",
				},
				{
					id: "625c2709-33d3-4188-a42f-18f360fc0b79",
					username: "b",
					password:
						"$argon2id$v=19$m=19456,t=2,p=1$3U97JZFepniKHZENCuznEg$FoSIFiiDQmByYBolEtC4rO9+Q+m90KkewgytAPbQk3s",
				},
			],
		})

		await prisma.listing.createMany({
			data: [
				{
					id: "fa21ea4e-dbc1-4e10-8773-890bf0f5404e",
					title: "test 1",
					description: "null",
					startingBid: 1,
					createdById: "ec0eccc8-1159-40ed-830f-31ac3ffa778b",
				},
				{
					id: "4bfc5305-6450-4362-971f-83c182d7f55c",
					title: "test 2",
					description: "null",
					startingBid: 2,
					createdById: "ec0eccc8-1159-40ed-830f-31ac3ffa778b",
				},
				{
					id: "c875a6fc-a249-471c-81a3-f9dd29e7072f",
					title: "test 3",
					description: "null",
					startingBid: 3,
					createdById: "ec0eccc8-1159-40ed-830f-31ac3ffa778b",
				},
				{
					id: "16e013d4-353c-458d-be7c-1e0cc19f46e1",
					title: "test 4",
					description: "null",
					startingBid: 4,
					createdById: "ec0eccc8-1159-40ed-830f-31ac3ffa778b",
				},
			],
		})
	} finally {
		await prisma.$disconnect()
	}
}

run()
