import { PrismaClient, Location } from "@prisma/client"

const prisma = new PrismaClient()

export const locationService = {
    async getAll(): Promise<Location[]> {
        return await prisma.location.findMany()
    },
    async getById(id: number): Promise<Location | null> {
        return await prisma.location.findUnique({
            where: { id },
        })
    },
    async isExists(id: number): Promise<boolean> {
        const count = await prisma.location.count({
            where: { id },
        })
        return count > 0
    },
    async isNameExists(name: string): Promise<boolean> {
        const count = await prisma.location.count({
            where: {
                province: {
                    equals: name,
                    mode: "insensitive",
                },
            },
        })
        return count > 0
    },
    async create(province: string): Promise<number> {
        const newLocation = await prisma.location.create({
            data: {
                province,
            },
        })
        return newLocation.id
    },
    async deleteAll(): Promise<void> {
        await prisma.location.deleteMany()
    },
    async deleteById(id: number): Promise<void> {
        await prisma.location.delete({
            where: { id },
        })
    },
    async update(id: number, province: string): Promise<void> {
        await prisma.location.update({
            where: { id },
            data: {
                province,
            },
        })
    },
}
