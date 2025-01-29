# retreatbot

`retreatbot` is a discord bot that provides assistance in managing an online book club.

The bot relies on the [openlibrary API](https://openlibrary.org/dev/docs/restful_api) as a source of data and requires
a [PostgreSQL](https://www.postgresql.org/) instance to run.

## Commands

```
/book <searchQuery>

Responds with the first book found on openlibrary.org
```


## Running

### Local

```shell
deno install
deno run src/main.ts
```

### In production

```shell
docker build -t retreatbot .
docker run -d \
  --name retreatbot \
  --restart unless-stopped \
  retreatbot
```
