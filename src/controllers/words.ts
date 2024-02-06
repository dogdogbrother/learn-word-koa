import { Context } from "koa"
import { _JWT_KEY_ } from '../conf/secretKeys'
import { Word, Youdao, Phrase } from '../models/index'
import { getYoudaoAndFormat } from '../server/word'
import Sequelize from 'sequelize'

export async function addWord(ctx: Context) {
  ctx.verifyParams({
    bookId: { type: 'string', required: true },
    word: { type: 'string', required: true},
  })
  const { word } = ctx.request.body
  // 添加单词的时候要和youdao翻译表联动下,给存进去
  const searchYoudaoWrod = await Youdao.findOne({
    where: { word }
  })
  if (searchYoudaoWrod) {
    await _addWord(ctx, searchYoudaoWrod.dataValues.id)
  } else {
    const _youdao_ = await getYoudaoAndFormat(word)
    if (_youdao_.error) {
      return ctx.throw(400, '翻译失败了呀,请检查下单词是否正常')
    }
    const saveYoudaoWord = await Youdao.create(_youdao_)
    await _addWord(ctx, saveYoudaoWord.dataValues.id)
  }
}

export async function wordList(ctx: Context) {
  ctx.verifyParams({
    bookId: { type: 'string', required: true },
  })
  ctx.body = await Word.findAll({
    where: { bookId: ctx.request.query.bookId },
    include: [ 
      { model: Youdao },
      { model: Phrase },
    ], // 查有道翻译
  })
}
async function _addWord(ctx: Context, youdaoId) {
  const { id: userId } = ctx.state.user
  const { word, bookId } = ctx.request.body
  const [ _, created ] = await Word.findOrCreate({
    where: { word, bookId: Number(bookId) },
    defaults: { userId, youdaoId }
  })
  if (created) {
    ctx.status = 201
  } else ctx.throw(403, '此单词本下单词重复啦')
}