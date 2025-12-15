import { buildApp } from './infra/app'

async function start() {
  const app = await buildApp()

  const port = Number(process.env.PORT) || 3000
  const host = process.env.HOST || '0.0.0.0'

  try {
    await app.listen({ port, host })
    console.log(`🚀 Server is running on port: ${port}!`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
