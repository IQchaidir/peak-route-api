import { defaultMountains, Mountain } from "../data/mountain"

let mountains: Mountain[] = [...defaultMountains]

export const mountainService = {
    getAll(): Mountain[] {
        return mountains
    },
    getById(id: number): Mountain | undefined {
        return mountains.find((mountain) => mountain.id === id)
    },
    create(data: Omit<Mountain, "id" | "createdAt" | "updatedAt">): number {
        const newId = mountains.length ? mountains[mountains.length - 1].id + 1 : 1
        const newMountain: Mountain = {
            id: newId,
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        mountains.push(newMountain)
        return newMountain.id
    },
    deleteAll() {
        mountains = []
    },
    deleteById(id: number) {
        mountains = mountains.filter((mountain) => mountain.id !== id)
    },
    update(id: number, data: Omit<Mountain, "id" | "createdAt" | "updatedAt">) {
        const index = mountains.findIndex((mountain) => mountain.id === id)
        if (index !== -1) {
            mountains[index] = {
                ...mountains[index],
                ...data,
                updatedAt: new Date(),
            }
        }
    },
    isExists(id: number): boolean {
        return mountains.some((mountain) => mountain.id === id)
    },
    isNameExists(name: string): boolean {
        return mountains.some((mountain) => mountain.name.toLowerCase() === name.toLowerCase())
    },
}
