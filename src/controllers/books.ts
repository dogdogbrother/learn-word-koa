import { Context } from "koa"
import { _JWT_KEY_ } from '../conf/secretKeys'
import { Book, UserBookRelation, type BookProp } from '../models/index'
import sequelize from 'sequelize'
export async function addBook(ctx: Context) {
  ctx.verifyParams({
    name: { type: 'string', required: true },
    type: { type: 'string', required: true},
    coverUrl: { type: 'string', required: true},
  })
  const { name, type, coverUrl } = ctx.request.body as BookProp
  const [ _, created ] = await Book.findOrCreate({
    where: { name },
    defaults: { type, coverUrl },
  })
  if (created) {
    return ctx.status = 201
  }
  return ctx.throw(403, '单词本名称重复')
}

export async function bookList(ctx: Context) {
  ctx.body = await Book.findAll({
    attributes: {
      include: [
        [
          sequelize.literal(`(select count(*) from words where words.bookId = book.id)`),
          'wordCount'
        ],
        [
          sequelize.literal(`(select count(*) from phrases where phrases.bookId = book.id)`),
          'phraseCount'
        ]
      ]
    }
  })
}

export async function learnBook(ctx: Context) {
  ctx.verifyParams({
    bookId: { type: 'string', required: true },
  })
  const { id: userId } = ctx.state.user
  const { bookId } = ctx.params
  
  const [ _, created ] = await UserBookRelation.findOrCreate({
    where: { userId, bookId: Number(bookId) },
  })
  if (created) {
    return ctx.status = 201
  }
  return ctx.throw(403, '重复关注啦傻子')
}

export async function deleteLearnBook(ctx: Context) {
  ctx.verifyParams({
    id: { type: 'string', required: true },
  })
  const { id } = ctx.params
  const { id: userId } = ctx.state.user
  const findRelation = await UserBookRelation.findByPk(id)
  if (!findRelation) {
    return ctx.throw(403, 'id你就瞎传吧你')
  }
  if (findRelation.dataValues.userId == userId) {
    return ctx.status = 201
  } else return ctx.throw(403, '这不是你学习中单词本,不能取消学习')
}

export async function getUserLearnBook(ctx: Context) {
  const { id: userId } = ctx.state.user
  const userLearnBook = await UserBookRelation.findAll({
    where: { userId },
    include: [
      {
        model: Book
      }
    ]
  })
  return ctx.body = userLearnBook
}