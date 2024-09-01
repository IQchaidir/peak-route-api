FROM oven/bun

WORKDIR /app

COPY . /app

RUN bun install

EXPOSE 80

CMD [ "bun","dev" ]