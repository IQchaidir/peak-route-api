import { z } from "zod"

export const locationRequestSchema = z.object({
    province: z.string().min(1).openapi({ example: "Kalimantan Timur" }),
})

export const locationIdSchema = z.object({
    id: z.coerce.number().int().min(1).openapi({ example: 1 }),
})
