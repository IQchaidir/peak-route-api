# Menggunakan Bun sebagai base image
FROM oven/bun:latest

# Set working directory
WORKDIR /app

# Salin package.json dan bun.lockb terlebih dahulu
COPY package.json bun.lockb /app/

# Install dependencies
RUN bun install

# Salin semua file ke dalam container
COPY . /app

# Generate Prisma client
RUN bunx prisma generate

# Jalankan aplikasi
CMD ["bun", "start"]