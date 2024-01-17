import Koa from 'koa'
import parameter from 'koa-parameter'
import { koaBody } from 'koa-body'
import routing from './routes'

const app = new Koa()
app.use(koaBody({multipart: true}))
app.use(parameter(app))
routing(app)
app.listen(7001, () => console.log('7001端口已经开启'))