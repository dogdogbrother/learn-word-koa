import seq from '../db/seq'
import { STRING, ENUM } from '../db/types'
import { Model, InferAttributes, InferCreationAttributes } from 'sequelize'

export interface BookProp {
  name: string
  coverUrl: string
  type: '1' | '2' | '3'
}
class BookModel extends Model<InferAttributes<BookModel>, InferCreationAttributes<BookModel>>  {
  public id?: number;
  public name!: string;
  public coverUrl!: string;
  public type!: '1' | '2' | '3';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
export const Book = seq.define<BookModel, BookProp>('book', {
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '单词本名'
  },
  coverUrl: {
    type: STRING,
    allowNull: false,
    comment: '单词本封面'
  },
  type : {
    type: ENUM('1', '2', '3'),
    allowNull: false,
    comment: '类型,1-词汇本 2-电影台词集 3-观影'
  }
})