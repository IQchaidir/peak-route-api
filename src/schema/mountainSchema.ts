import { z } from "zod"

export const mountainRequestSchema = z.object({
    location_id: z.number().int().positive().openapi({ example: 1 }),
    name: z.string().min(1, "Name is required").openapi({ example: "Mount Rinjani" }),
    elevation: z.number().int().positive().openapi({ example: 3726 }),
})

export const mountainIdSchema = z.object({
    id: z.coerce.number().int().min(1).openapi({ example: 1 }),
})
