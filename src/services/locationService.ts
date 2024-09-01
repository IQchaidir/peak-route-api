import { defaultLocations, Location } from "../data/location"

let locations = [...defaultLocations]

function getAll(): Location[] {
    return locations
}

function getById(id: number): Location | undefined {
    return locations.find((location) => location.id === id)
}

function isExists(id: number): boolean {
    return locations.some((location) => location.id === id)
}

function create(data: Omit<Location, "id" | "createdAt" | "updatedAt">): number {
    const lastLocation = locations[locations.length - 1]
    const newId = lastLocation ? lastLocation.id + 1 : 1

    const newLocation: Location = {
        id: newId,
        name: data.name,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    locations.push(newLocation)
    return newLocation.id
}

function deleteAll(): void {
    locations = []
}

function deleteById(id: number): void {
    locations = locations.filter((location) => location.id !== id)
}

function update(id: number, data: Partial<Omit<Location, "id" | "createdAt">>): void {
    const locationIndex = locations.findIndex((location) => location.id === id)

    if (locationIndex !== -1) {
        locations[locationIndex] = {
            ...locations[locationIndex],
            ...data,
            updatedAt: new Date(),
        }
    }
}

export const locationService = {
    getAll,
    getById,
    isExists,
    create,
    deleteAll,
    deleteById,
    update,
}
