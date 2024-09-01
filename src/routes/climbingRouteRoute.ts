import { OpenAPIHono } from "@hono/zod-openapi"
import { z } from "zod"
import { climbingRouteService } from "../services/climbingRouteService"

const API_TAG = ["Climbing Routes"]

const ClimbingRouteRequestSchema = z.object({
    mountain_id: z.number().int().positive(),
    route_name: z.string().min(1, "Route name is required"),
    length: z.number().positive(),
})

const ClimbingRouteIdSchema = z.object({
    id: z.string().regex(/^\d+$/, "Invalid ID format"),
})

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
                params: ClimbingRouteIdSchema,
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
                            schema: ClimbingRouteRequestSchema,
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: "Climbing route created",
                },
            },
            tags: API_TAG,
        },
        async (c) => {
            const body = c.req.valid("json")

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
                params: ClimbingRouteIdSchema,
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
                params: ClimbingRouteIdSchema,
                body: {
                    content: {
                        "application/json": {
                            schema: ClimbingRouteRequestSchema,
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

            climbingRouteService.update(id, body)
            const route = climbingRouteService.getById(id)

            return c.json({
                message: "Success",
                data: route,
            })
        }
    )
