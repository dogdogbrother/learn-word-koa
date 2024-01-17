import fs from 'fs'
import Koa from 'koa'
export default (app: Koa) => {
  fs.readdirSync(__dirname).forEach(async (file: string) => {
    if (file === 'index.ts') return
    const route = await import(`./${file}`)
    app.use(route.default.routes())
  })
}