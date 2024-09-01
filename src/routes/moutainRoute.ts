import { OpenAPIHono } from "@hono/zod-openapi"
import { z } from "zod"
import { mountainService } from "../services/moutainService"

const API_TAG = ["Mountains"]

const MountainRequestSchema = z.object({
    location_id: z.number().int().positive(),
    name: z.string().min(1, "Name is required"),
    elevation: z.number().int().positive(),
})

const MountainIdSchema = z.object({
    id: z.string().regex(/^\d+$/, "Invalid ID format"),
})

export const mountainRoute = new OpenAPIHono()
    .openapi(
        {
            method: "get",
            path: "/",
            description: "Get all mountains",
            responses: {
                200: {
                    description: "List of mountains",
                },
            },
            tags: API_TAG,
        },
        async (c) => {
            const mountains = mountainService.getAll()
            return c.json({
                message: "Success",
                data: mountains,
            })
        }
    )
    .openapi(
        {
            method: "get",
            path: "/{id}",
            description: "Get mountain by id",
            request: {
                params: MountainIdSchema,
            },
            responses: {
                200: {
                    description: "Mountain details",
                },
                404: {
                    description: "Mountain not found",
                },
            },
            tags: API_TAG,
        },
        async (c) => {
            const mountain = mountainService.getById(Number(c.req.param("id")))

            if (!mountain) {
                return c.json({ message: "Mountain not found" }, 404)
            }

            return c.json({
                message: "Success",
                data: mountain,
            })
        }
    )
    .openapi(
        {
            method: "post",
            path: "/",
            description: "Create a new mountain",
            request: {
                body: {
                    content: {
                        "application/json": {
                            schema: MountainRequestSchema,
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: "Mountain created",
                },
            },
            tags: API_TAG,
        },
        async (c) => {
            const body = c.req.valid("json")

            const mountainId = mountainService.create(body)
            const mountain = mountainService.getById(mountainId)

            return c.json(
                {
                    message: "Success",
                    data: mountain,
                },
                201
            )
        }
    )
    .openapi(
        {
            method: "delete",
            path: "/",
            description: "Delete all mountains",
            responses: {
                200: {
                    description: "Mountains deleted",
                },
            },
            tags: API_TAG,
        },
        async (c) => {
            mountainService.deleteAll()

            return c.json({ message: "Success" })
        }
    )
    .openapi(
        {
            method: "delete",
            path: "/{id}",
            description: "Delete mountain by id",
            request: {
                params: MountainIdSchema,
            },
            responses: {
                200: {
                    description: "Mountain deleted",
                },
                404: {
                    description: "Mountain not found",
                },
            },
            tags: API_TAG,
        },
        async (c) => {
            const id = Number(c.req.param("id"))
            const exists = mountainService.isExists(id)

            if (!exists) {
                return c.json({ message: "Mountain not found" }, 404)
            }

            mountainService.deleteById(id)

            return c.json({ message: "Success" })
        }
    )
    .openapi(
        {
            method: "put",
            path: "/{id}",
            description: "Update mountain by id",
            request: {
                params: MountainIdSchema,
                body: {
                    content: {
                        "application/json": {
                            schema: MountainRequestSchema,
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "Mountain updated",
                },
                404: {
                    description: "Mountain not found",
                },
            },
            tags: API_TAG,
        },
        async (c) => {
            const body = c.req.valid("json")
            const id = Number(c.req.param("id"))

            const exists = mountainService.isExists(id)

            if (!exists) {
                return c.json({ message: "Mountain not found" }, 404)
            }

            mountainService.update(id, body)
            const mountain = mountainService.getById(id)

            return c.json({
                message: "Success",
                data: mountain,
            })
        }
    )
