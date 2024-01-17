import { User as _User } from './User'
export type { BookProp } from './Book'
import { Book as _Book } from './Book'
import { Word as _Word } from './Word'
import { Youdao as _Youdao } from './Youdao'
import { Phrase as _Phrase} from './Phrase'
export const User = _User
export const Book = _Book
export const Word = _Word
export const Youdao = _Youdao
export const Phrase = _Phrase

Word.belongsTo(User, {foreignKey: 'userId'})
Word.belongsTo(Book, {foreignKey: 'bookId'})
Word.belongsTo(Youdao, {foreignKey: 'youdaoId'})

Word.hasMany(Phrase, {foreignKey: 'wordId'})
