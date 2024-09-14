import { PrismaClient, Climbing_Route } from "@prisma/client"

const prisma = new PrismaClient()

export const climbingRouteService = {
    async getAll(): Promise<Climbing_Route[]> {
        return await prisma.climbing_Route.findMany()
    },
    async getById(id: number): Promise<Climbing_Route | null> {
        return await prisma.climbing_Route.findUnique({
            where: { id },
        })
    },
    async create(data: Omit<Climbing_Route, "id" | "created_at" | "updated_at">): Promise<number> {
        const newRoute = await prisma.climbing_Route.create({
            data: {
                ...data,
            },
        })
        return newRoute.id
    },
    async deleteAll(): Promise<void> {
        await prisma.climbing_Route.deleteMany()
    },
    async deleteById(id: number): Promise<void> {
        await prisma.climbing_Route.delete({
            where: { id },
        })
    },
    async update(id: number, data: Omit<Climbing_Route, "id" | "created_at" | "updated_at">): Promise<void> {
        await prisma.climbing_Route.update({
            where: { id },
            data: {
                ...data,
            },
        })
    },
    async isExists(id: number): Promise<boolean> {
        const count = await prisma.climbing_Route.count({
            where: { id },
        })
        return count > 0
    },
    async isNameExists(name: string): Promise<boolean> {
        const count = await prisma.climbing_Route.count({
            where: {
                route_name: {
                    equals: name,
                    mode: "insensitive",
                },
            },
        })
        return count > 0
    },
}
