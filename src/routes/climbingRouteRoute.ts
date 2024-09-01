import { OpenAPIHono } from "@hono/zod-openapi"
import { climbingRouteService } from "../services/climbingRouteService"
import { climbingRouteIdSchema, climbingRouteRequestSchema } from "../schema/climbingRoutesSchema"

const API_TAG = ["Climbing Routes"]

export const climbingRouteRoute = new OpenAPIHono()
    .openapi(
        {
            method: "get",
            path: "/",
            description: "Get all climbing routes",
            responses: {
                200: {
                    description: "List of climbing routes",
                },
            },
            tags: API_TAG,
        },
        async (c) => {
            const climbingRoutes = climbingRouteService.getAll()
            return c.json({
                message: "Success",
                data: climbingRoutes,
            })
        }
    )
    .openapi(
        {
            method: "get",
            path: "/{id}",
            description: "Get climbing route by id",
            request: {
                params: climbingRouteIdSchema,
            },
            responses: {
                200: {
                    description: "Climbing route details",
                },
                404: {
                    description: "Climbing route not found",
                },
            },
            tags: API_TAG,
        },
        async (c) => {
            const route = climbingRouteService.getById(Number(c.req.param("id")))

            if (!route) {
                return c.json({ message: "Climbing route not found" }, 404)
            }

            return c.json({
                message: "Success",
                data: route,
            })
        }
    )
    .openapi(
        {
            method: "post",
            path: "/",
            description: "Create a new climbing route",
            request: {
                body: {
                    content: {
                        "application/json": {
                            schema: climbingRouteRequestSchema,
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: "Climbing route created",
                },
                409: {
                    description: "Climbing route with this name already exists",
                },
            },
            tags: API_TAG,
        },
        async (c) => {
            const body = c.req.valid("json")

            if (climbingRouteService.isNameExists(body.route_name)) {
                return c.json({ message: "Climbing route with this name already exists" }, 409)
            }

            const routeId = climbingRouteService.create(body)
            const route = climbingRouteService.getById(routeId)

            return c.json(
                {
                    message: "Success",
                    data: route,
                },
                201
            )
        }
    )
    .openapi(
        {
            method: "delete",
            path: "/",
            description: "Delete all climbing routes",
            responses: {
                200: {
                    description: "Climbing routes deleted",
                },
            },
            tags: API_TAG,
        },
        async (c) => {
            climbingRouteService.deleteAll()

            return c.json({ message: "Success" })
        }
    )
    .openapi(
        {
            method: "delete",
            path: "/{id}",
            description: "Delete climbing route by id",
            request: {
                params: climbingRouteIdSchema,
            },
            responses: {
                200: {
                    description: "Climbing route deleted",
                },
                404: {
                    description: "Climbing route not found",
                },
            },
            tags: API_TAG,
        },
        async (c) => {
            const id = Number(c.req.param("id"))
            const exists = climbingRouteService.isExists(id)

            if (!exists) {
                return c.json({ message: "Climbing route not found" }, 404)
            }

            climbingRouteService.deleteById(id)

            return c.json({ message: "Success" })
        }
    )
    .openapi(
        {
            method: "put",
            path: "/{id}",
            description: "Update climbing route by id",
            request: {
                params: climbingRouteIdSchema,
                body: {
                    content: {
                        "application/json": {
                            schema: climbingRouteRequestSchema,
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "Climbing route updated",
                },
                404: {
                    description: "Climbing route not found",
                },
                409: {
                    description: "Climbing route with this name already exists",
                },
            },
            tags: API_TAG,
        },
        async (c) => {
            const body = c.req.valid("json")
            const id = Number(c.req.param("id"))

            const exists = climbingRouteService.isExists(id)

            if (!exists) {
                return c.json({ message: "Climbing route not found" }, 404)
            }

            const currentRoute = climbingRouteService.getById(id)
            if (
                currentRoute &&
                currentRoute.route_name !== body.route_name &&
                climbingRouteService.isNameExists(body.route_name)
            ) {
                return c.json({ message: "Climbing route with this name already exists" }, 409)
            }

            climbingRouteService.update(id, body)
            const updatedRoute = climbingRouteService.getById(id)

            return c.json({
                message: "Success",
                data: updatedRoute,
            })
        }
    )
