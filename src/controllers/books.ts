import { Context } from "koa"
import { _JWT_KEY_ } from '../conf/secretKeys'
import { Book, type BookProp } from '../models/index'

export async function addBook(ctx: Context) {
  ctx.verifyParams({
    name: { type: 'string', required: true },
    type: { type: 'string', required: true},
    coverUrl: { type: 'string', required: true},
  })
  const { name, type, coverUrl } = ctx.request.body as BookProp
  const [ _, created ] = await Book.findOrCreate({
    where: { name },
    defaults: { type, coverUrl }
  })
  if (created) {
    return ctx.status = 201
  }
  return ctx.throw(403, '单词本名称重复')
}

export async function bookList(ctx: Context) {
  ctx.body = await Book.findAll()
}
