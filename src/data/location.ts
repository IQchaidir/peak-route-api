export type Location = {
    id: number
    name: string
    createdAt: Date
    updatedAt: Date
}

export const defaultLocations: Location[] = [
    {
        id: 1,
        name: "Jawa Barat",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 2,
        name: "Sumatera Selatan",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 3,
        name: "Banten",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
]
