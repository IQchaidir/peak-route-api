export interface Mountain {
    id: number
    location_id: number
    name: string
    elevation: number
    createdAt: Date
    updatedAt: Date
}

export const defaultMountains: Mountain[] = [
    {
        id: 1,
        location_id: 1,
        name: "Mount Example",
        elevation: 3000,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
]
