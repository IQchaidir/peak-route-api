import { z } from "zod"

export const climbingRouteRequestSchema = z.object({
    mountain_id: z.number().int().positive().openapi({ example: 5 }),
    route_name: z.string().min(1, "Route name is required").openapi({ example: "East Ridge" }),
    length: z.number().positive().openapi({ example: 1200 }), // Panjang dalam meter atau unit yang sesuai
})

export const climbingRouteIdSchema = z.object({
    id: z.coerce.number().int().min(1).openapi({ example: 1 }),
})
