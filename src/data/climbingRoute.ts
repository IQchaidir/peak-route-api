export interface ClimbingRoute {
    id: number
    mountain_id: number
    route_name: string
    length: number
    createdAt: Date
    updatedAt: Date
}

export const defaultClimbingRoutes: ClimbingRoute[] = [
    {
        id: 1,
        mountain_id: 1,
        route_name: "Summit Trail",
        length: 1500,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
]
