import seq from '../db/seq'
import { STRING, INTEGER } from '../db/types'

export const Word = seq.define('word', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '关联的上传用户id'
  },
  bookId: {
    type: INTEGER,
    allowNull: false,
    comment: '关联的上传用户id'
  },
  word: {
    type: STRING,
    allowNull: false,
    comment: '单词内容'
  },
  youdaoId: {
    type: INTEGER,
    allowNull: false,
    comment: '关联的有道id'
  }
})