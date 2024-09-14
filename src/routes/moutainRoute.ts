import { OpenAPIHono } from "@hono/zod-openapi"
import { mountainIdSchema, mountainRequestSchema } from "../schema/mountainSchema"
import { mountainService } from "../services/moutainService"

const API_TAG = ["Mountains"]

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
            const mountains = await mountainService.getAll()
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
                params: mountainIdSchema,
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
            const id = Number(c.req.param("id"))
            const mountain = await mountainService.getById(id)

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
                            schema: mountainRequestSchema,
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: "Mountain created",
                },
                409: {
                    description: "Mountain with this name already exists",
                },
            },
            tags: API_TAG,
        },
        async (c) => {
            const body = c.req.valid("json")

            if (await mountainService.isNameExists(body.name)) {
                return c.json({ message: "Mountain with this name already exists" }, 409)
            }

            const mountainId = await mountainService.create(body)
            const mountain = await mountainService.getById(mountainId)

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
            await mountainService.deleteAll()

            return c.json({ message: "Success" })
        }
    )
    .openapi(
        {
            method: "delete",
            path: "/{id}",
            description: "Delete mountain by id",
            request: {
                params: mountainIdSchema,
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
            const exists = await mountainService.isExists(id)
            if (!exists) {
                return c.json({ message: "Mountain not found" }, 404)
            }

            await mountainService.deleteById(id)

            return c.json({ message: "Success" })
        }
    )
    .openapi(
        {
            method: "patch",
            path: "/{id}",
            description: "Update mountain by id",
            request: {
                params: mountainIdSchema,
                body: {
                    content: {
                        "application/json": {
                            schema: mountainRequestSchema,
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
                409: {
                    description: "Mountain with this name already exists",
                },
            },
            tags: API_TAG,
        },
        async (c) => {
            const body = c.req.valid("json")
            const id = Number(c.req.param("id"))

            const exists = await mountainService.isExists(id)

            if (!exists) {
                return c.json({ message: "Mountain not found" }, 404)
            }

            const currentMountain = await mountainService.getById(id)
            if (
                currentMountain &&
                currentMountain.name !== body.name &&
                (await mountainService.isNameExists(body.name))
            ) {
                return c.json({ message: "Mountain with this name already exists" }, 409)
            }

            await mountainService.update(id, body)
            const updatedMountain = await mountainService.getById(id)

            return c.json({
                message: "Success",
                data: updatedMountain,
            })
        }
    )
