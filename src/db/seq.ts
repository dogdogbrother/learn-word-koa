import { Sequelize } from 'sequelize'
import { MYSQL_CONF } from '../conf/db'
import { isProd } from '../utils/env'
const { user, password, database, host } = MYSQL_CONF
const conf: any = {
  dialect: 'mysql',
  dialectOptions: {
    dateStrings: true,
    typeCast: true
  },
  timezone: '+08:00'
}

// 线上环境，使用连接池
if (isProd) {
  conf.pool = {
    max: 5, // 连接池中最大的连接数量
    min: 0, // 最小
    idle: 10000  // 如果一个连接池 10 s 之内没有被使用，则释放
  }
} else {
  conf.host = host
}

const seq = new Sequelize(database, user, password, conf)

seq.authenticate().then(() => {
  console.log('连接成功')
}).catch((err) => {
  console.log('连接失败',err)
})

export default seq