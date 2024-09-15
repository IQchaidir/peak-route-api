import { PrismaClient, Mountain } from "@prisma/client"

const prisma = new PrismaClient()

export const mountainService = {
    async getAll(): Promise<Mountain[]> {
        return await prisma.mountain.findMany()
    },
    async getById(id: number): Promise<Mountain | null> {
        return await prisma.mountain.findUnique({
            where: { id },
        })
    },
    async create(data: Omit<Mountain, "id" | "created_at" | "updated_at">): Promise<number> {
        const newMountain = await prisma.mountain.create({
            data: {
                ...data,
            },
        })
        return newMountain.id
    },
    async deleteAll(): Promise<void> {
        await prisma.mountain.deleteMany()
    },
    async deleteById(id: number): Promise<void> {
        await prisma.mountain.delete({
            where: { id },
        })
    },
    async update(id: number, data: Omit<Mountain, "id" | "created_at" | "updated_at">): Promise<void> {
        await prisma.mountain.update({
            where: { id },
            data: {
                ...data,
            },
        })
    },
    async isExists(id: number): Promise<boolean> {
        const mountain = await prisma.mountain.findUnique({
            where: { id },
        })
        return mountain !== null
    },
    async isNameExists(name: string): Promise<boolean> {
        const mountain = await prisma.mountain.findFirst({
            where: {
                name: {
                    equals: name,
                    mode: "insensitive",
                },
            },
        })
        return mountain !== null
    },
}
