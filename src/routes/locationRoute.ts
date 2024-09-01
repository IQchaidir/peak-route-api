import { OpenAPIHono } from "@hono/zod-openapi"
import { locationService } from "../services/locationService"
import { locationIdSchema, locationRequestSchema } from "../schema/locationSchema"

const API_TAG = ["Locations"]

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
                params: locationIdSchema,
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
            try {
                const locationId = Number(c.req.param("id"))
                const location = locationService.getById(locationId)

                if (!location) {
                    return c.json({ message: "Location not found" }, 404)
                }

                return c.json({
                    message: "Success",
                    data: location,
                })
            } catch (error) {
                console.error("Internal server error:", error)
                return c.json({ message: "Internal Server Error" }, 500)
            }
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
                            schema: locationRequestSchema,
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: "Location created",
                },
                409: {
                    description: "Location with this name already exists",
                },
            },
            tags: API_TAG,
        },
        async (c) => {
            const body = c.req.valid("json")

            if (locationService.isNameExists(body.name)) {
                return c.json({ message: "Location with this name already exists" }, 409)
            }

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
                params: locationIdSchema,
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
                params: locationIdSchema,
                body: {
                    content: {
                        "application/json": {
                            schema: locationRequestSchema,
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
                409: {
                    description: "Location with this name already exists",
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

            const currentLocation = locationService.getById(id)
            if (
                currentLocation &&
                currentLocation.name !== body.name &&
                locationService.isNameExists(body.name)
            ) {
                return c.json({ message: "Location with this name already exists" }, 409)
            }

            locationService.update(id, body)
            const updatedLocation = locationService.getById(id)

            return c.json({
                message: "Success",
                data: updatedLocation,
            })
        }
    )
