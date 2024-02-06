import Router from 'koa-router'
import jwt from 'koa-jwt'
import { _JWT_KEY_ } from '../conf/secretKeys'
import { getTranslate, addPhrase } from '../controllers/phrases'

const router = new Router({ prefix: '/phrase' })
const auth = jwt({ secret: _JWT_KEY_ })

router.post('/translate', auth, getTranslate)

router.post('/', auth, addPhrase)

export default router