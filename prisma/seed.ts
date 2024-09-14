import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    const location1 = await prisma.location.create({
        data: {
            province: "Java",
            mountains: {
                create: [
                    {
                        name: "Mount Merapi",
                        elevation: 2968,
                        climbing_routes: {
                            create: [
                                {
                                    route_name: "Selo Route",
                                    length: 5,
                                },
                                {
                                    route_name: "Kopeng Route",
                                    length: 4,
                                },
                            ],
                        },
                    },
                    {
                        name: "Mount Bromo",
                        elevation: 2329,
                        climbing_routes: {
                            create: [
                                {
                                    route_name: "Penanjakan Route",
                                    length: 3,
                                },
                            ],
                        },
                    },
                ],
            },
        },
    })

    console.log("Seeded Locations:", location1)
}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
