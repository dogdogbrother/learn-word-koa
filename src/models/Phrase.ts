
import seq from '../db/seq'
import { STRING, INTEGER } from '../db/types'

export const Phrase = seq.define('phrase', {
  phrase: {
    type: STRING,
    allowNull: false,
    comment: '短剧正文'
  },
  translation: {
    type: STRING,
    allowNull: false,
    comment: '短剧翻译过来的中文解释'
  },
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '关联的上传用户id'
  },
  wordId: {
    type: INTEGER,
    allowNull: false,
    comment: '关联对应的单词id'
  },
  bookId: {
    type: INTEGER,
    allowNull: false,
    comment: '关联对应的单词本id'
  },
  speakUrl: {
    type: STRING,
    allowNull: true,
    comment: '翻译整句的语音url'
  },
})