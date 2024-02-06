import { Context } from "koa"
import { getYoudaoAndFormat } from '../server/word'
import { Phrase, Youdao } from '../models'

export async function getTranslate(ctx: Context) {
  ctx.verifyParams({
    phrase: { type: 'string', required: true },
  })
  const { phrase } = ctx.request.body
  const searchYoudaoWrod = await Youdao.findOne({
    where: { word: phrase }
  })
  if (searchYoudaoWrod) {
    ctx.body = searchYoudaoWrod
  } else {
    const _youdao_ = await getYoudaoAndFormat(phrase)
    if (_youdao_.error) {
      return ctx.throw(400, '翻译失败了呀,这句子怕不是有点毛病')
    }
    ctx.body = _youdao_
  }
}

export async function addPhrase(ctx: Context) {
  ctx.verifyParams({
    phrase: { type: 'string', required: true },
    wordId: { type: 'number', required: true },
    translation: { type: 'string', required: true },
  })
  const { id: userId } = ctx.state.user
  const { phrase, wordId, bookId, translation, speakUrl } = ctx.request.body
  const [ _, created ] = await Phrase.findOrCreate({
    where: { phrase, wordId, bookId },
    defaults: { wordId, translation, userId, speakUrl }
  })
  if (created) {
    return ctx.status = 201
  }
  return ctx.throw(403, '此单词下已有此例句了')
}