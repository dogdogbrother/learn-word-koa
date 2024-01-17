import Router from 'koa-router'
import jwt from 'koa-jwt'
import { _JWT_KEY_ } from '../conf/secretKeys'
import { addWord, wordList } from '../controllers/words'

const router = new Router({ prefix: '/word' })
const auth = jwt({ secret: _JWT_KEY_ })

router.post('/', auth, addWord)
router.get('/list', auth, wordList)

export default router