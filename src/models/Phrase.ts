
import seq from '../db/seq'
import { STRING, INTEGER } from '../db/types'

export const Phrase = seq.define('phrase', {
  phrase: {
    type: STRING,
    allowNull: false,
    comment: '短剧正文'
  },
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '关联的上传用户id'
  },
  wordId: {
    type: INTEGER,
    allowNull: false,
    comment: '关联对应的单词本id'
  },
})