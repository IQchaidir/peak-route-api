import { OpenAPIHono } from "@hono/zod-openapi"
import { swaggerUI } from "@hono/swagger-ui"
import { locationRoute } from "./routes/locationRoute"
import { mountainRoute } from "./routes/moutainRoute"
import { climbingRouteRoute } from "./routes/climbingRouteRoute"

const app = new OpenAPIHono()
    .route("/api/locations", locationRoute)
    .route("/api/mountains", mountainRoute)
    .route("/api/climbing-routes", climbingRouteRoute)

    .doc31("/docs", {
        openapi: "3.0.0",
        info: {
            version: "1.0.0",
            title: "Peak Route Rest Api",
            description:
                "The Mountain API provides access to detailed information about mountains in Indonesia, including their associated climbing routes. This API enables users to retrieve data about each mountain, including its name, height, and geographical location, as well as the different climbing routes available for each mountain.",
        },
    })

    .get("/ui", swaggerUI({ url: "/docs" }))

export default {
    port: 80,
    fetch: app.fetch,
}
