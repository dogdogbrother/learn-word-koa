import seq from '../db/seq'
import { INTEGER } from '../db/types'
import { Model, InferAttributes, InferCreationAttributes } from 'sequelize'

export interface UserBookRelationProp {
  userId: number
  bookId: number
}
class UserBookRelationModel extends Model<InferAttributes<UserBookRelationModel>, InferCreationAttributes<UserBookRelationModel>>  {
  public userId: number;
  public bookId: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
export const UserBookRelation = seq.define<UserBookRelationModel, UserBookRelationProp>('userBookRelation', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '关联的用户ID'
  },
  bookId: {
    type: INTEGER,
    allowNull: false,
    comment: '关联的书籍ID'
  },
})