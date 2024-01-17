import { Context } from "koa"
import Sequelize from 'sequelize'
import { _JWT_KEY_ } from '../conf/secretKeys'
import jsonwebtoken from 'jsonwebtoken'
import { User } from '../models/index'
import doCrypto from '../utils/cryp'

const Op = Sequelize.Op

export interface LoginProp{
  username: string
  password: string
}
export async function login(ctx: Context) {
  ctx.verifyParams({
    username: { type: 'string', required: true, min: 1 },
    password: { type: 'string', required: true, min: 1 },
  })
  const { username, password } = ctx.request.body as LoginProp
  const findUserName = await User.findOne({
    where: { username }
  })
  const user = await User.findOne({
    attributes: ['username', 'id'],
    where: {
      [Op.and]: [{ username },{ password: doCrypto(password) }]
    }
  })
  // 连用户名都没,直接注册
  if (!findUserName) {
    const createUser = await register({username, password}, User)
    return sign(ctx, createUser.id, createUser.username, 'register')
  }
  // 有用户名但是密码不对
  if (findUserName && !user) {
    return ctx.throw(403, '密码错误')
  }
  // 匹配 登录
  return sign(ctx, user.id, user.username, 'login')
}

export async function info(ctx: Context) {
  const { id } = ctx.state.user
  const user = await User.findByPk(id)
  ctx.body = user
}
export function sign(ctx: Context, id: number, username: string, type: 'login' | 'register') {
  const token = jsonwebtoken.sign(
    { 
      id,
    }, 
    _JWT_KEY_, 
    { expiresIn: '20d' }
  )
  ctx.body = {
    username,
    id,
    token,
    type
  } 
}
export async function register(data: LoginProp, Model: any) {
  return await Model.create({
    username: data.username,
    password: doCrypto(data.password)
  })
}