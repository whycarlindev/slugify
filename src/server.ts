import { buildApp } from './infra/app'
import { env } from './infra/env'

async function start() {
  const app = await buildApp()

  const port = env.PORT
  const host = env.HOST

  try {
    await app.listen({ port, host })
    console.log(`🚀 Server is running on port: ${port}!`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
