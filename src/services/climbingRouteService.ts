import { ClimbingRoute, defaultClimbingRoutes } from "../data/climbingRoute"

let climbingRoutes: ClimbingRoute[] = [...defaultClimbingRoutes]

export const climbingRouteService = {
    getAll(): ClimbingRoute[] {
        return climbingRoutes
    },
    getById(id: number): ClimbingRoute | undefined {
        return climbingRoutes.find((route) => route.id === id)
    },
    create(data: Omit<ClimbingRoute, "id" | "createdAt" | "updatedAt">): number {
        const newId = climbingRoutes.length ? climbingRoutes[climbingRoutes.length - 1].id + 1 : 1
        const newRoute: ClimbingRoute = {
            id: newId,
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        climbingRoutes.push(newRoute)
        return newRoute.id
    },
    deleteAll() {
        climbingRoutes = []
    },
    deleteById(id: number) {
        climbingRoutes = climbingRoutes.filter((route) => route.id !== id)
    },
    update(id: number, data: Omit<ClimbingRoute, "id" | "createdAt" | "updatedAt">) {
        const index = climbingRoutes.findIndex((route) => route.id === id)
        if (index !== -1) {
            climbingRoutes[index] = {
                ...climbingRoutes[index],
                ...data,
                updatedAt: new Date(),
            }
        }
    },
    isExists(id: number): boolean {
        return climbingRoutes.some((route) => route.id === id)
    },
    isNameExists(name: string): boolean {
        return climbingRoutes.some((route) => route.route_name.toLowerCase() === name.toLowerCase())
    },
}
