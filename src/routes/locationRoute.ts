import { OpenAPIHono } from "@hono/zod-openapi"
import { z } from "zod"
import { locationService } from "../services/locationService"

const API_TAG = ["Locations"]

const LocationRequestSchema = z.object({
    name: z.string().min(1, "Name is required"),
})

const LocationIdSchema = z.object({
    id: z.string().regex(/^\d+$/, "Invalid ID format"),
})

export const locationRoute = new OpenAPIHono()
    .openapi(
        {
            method: "get",
            path: "/",
            description: "Get all locations",
            responses: {
                200: {
                    description: "List of locations",
                },
            },
            tags: API_TAG,
        },
        async (c) => {
            const locations = locationService.getAll()

            return c.json({
                message: "Success",
                data: locations,
            })
        }
    )
    .openapi(
        {
            method: "get",
            path: "/{id}",
            description: "Get location by id",
            request: {
                params: LocationIdSchema,
            },
            responses: {
                200: {
                    description: "Location details",
                },
                404: {
                    description: "Location not found",
                },
            },
            tags: API_TAG,
        },
        async (c) => {
            const location = locationService.getById(Number(c.req.param("id")))

            if (!location) {
                return c.json({ message: "Location not found" }, 404)
            }

            return c.json({
                message: "Success",
                data: location,
            })
        }
    )
    .openapi(
        {
            method: "post",
            path: "/",
            description: "Create a new location",
            request: {
                body: {
                    content: {
                        "application/json": {
                            schema: LocationRequestSchema,
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: "Location created",
                },
            },
            tags: API_TAG,
        },
        async (c) => {
            const body = c.req.valid("json")

            const locationId = locationService.create(body)
            const location = locationService.getById(locationId)

            return c.json(
                {
                    message: "Success",
                    data: location,
                },
                201
            )
        }
    )
    .openapi(
        {
            method: "delete",
            path: "/",
            description: "Delete all locations",
            responses: {
                200: {
                    description: "Locations deleted",
                },
            },
            tags: API_TAG,
        },
        async (c) => {
            locationService.deleteAll()

            return c.json({ message: "Success" })
        }
    )
    .openapi(
        {
            method: "delete",
            path: "/{id}",
            description: "Delete location by id",
            request: {
                params: LocationIdSchema,
            },
            responses: {
                200: {
                    description: "Location deleted",
                },
                404: {
                    description: "Location not found",
                },
            },
            tags: API_TAG,
        },
        async (c) => {
            const id = Number(c.req.param("id"))
            const exists = locationService.isExists(id)

            if (!exists) {
                return c.json({ message: "Location not found" }, 404)
            }

            locationService.deleteById(id)

            return c.json({ message: "Success" })
        }
    )
    .openapi(
        {
            method: "put",
            path: "/{id}",
            description: "Update location by id",
            request: {
                params: LocationIdSchema,
                body: {
                    content: {
                        "application/json": {
                            schema: LocationRequestSchema,
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "Location updated",
                },
                404: {
                    description: "Location not found",
                },
            },
            tags: API_TAG,
        },
        async (c) => {
            const body = c.req.valid("json")
            const id = Number(c.req.param("id"))

            const exists = locationService.isExists(id)

            if (!exists) {
                return c.json({ message: "Location not found" }, 404)
            }

            locationService.update(id, body)
            const location = locationService.getById(id)

            return c.json({
                message: "Success",
                data: location,
            })
        }
    )
