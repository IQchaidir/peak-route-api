-- CreateTable
CREATE TABLE "locations" (
    "id" SERIAL NOT NULL,
    "province" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mountains" (
    "id" SERIAL NOT NULL,
    "location_id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "elevation" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mountains_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "climbing_routes" (
    "id" SERIAL NOT NULL,
    "mountain_id" INTEGER NOT NULL,
    "route_name" VARCHAR(100) NOT NULL,
    "length" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "climbing_routes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "mountains" ADD CONSTRAINT "mountains_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "climbing_routes" ADD CONSTRAINT "climbing_routes_mountain_id_fkey" FOREIGN KEY ("mountain_id") REFERENCES "mountains"("id") ON DELETE CASCADE ON UPDATE CASCADE;
