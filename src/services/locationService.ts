import { defaultLocations, Location } from "../data/location"

let locations: Location[] = [...defaultLocations]

export const locationService = {
    getAll(): Location[] {
        return locations
    },
    getById(id: number): Location | undefined {
        return locations.find((location) => location.id === id)
    },
    isExists(id: number): boolean {
        return locations.some((location) => location.id === id)
    },
    isNameExists(name: string): boolean {
        return locations.some((location) => location.name.toLowerCase() === name.toLowerCase())
    },
    create(data: Omit<Location, "id" | "createdAt" | "updatedAt">): number {
        const newId = locations.length ? locations[locations.length - 1].id + 1 : 1
        const newLocation: Location = {
            id: newId,
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        locations.push(newLocation)
        return newLocation.id
    },
    deleteAll() {
        locations = []
    },
    deleteById(id: number) {
        locations = locations.filter((location) => location.id !== id)
    },
    update(id: number, data: Omit<Location, "id" | "createdAt" | "updatedAt">) {
        const index = locations.findIndex((location) => location.id === id)
        if (index !== -1) {
            locations[index] = {
                ...locations[index],
                ...data,
                updatedAt: new Date(),
            }
        }
    },
}
