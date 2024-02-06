import Router from 'koa-router'
import jwt from 'koa-jwt'
import { _JWT_KEY_ } from '../conf/secretKeys'
import { addBook, bookList, learnBook, deleteLearnBook, getUserLearnBook } from '../controllers/books'

const router = new Router({ prefix: '/book' })
const auth = jwt({ secret: _JWT_KEY_ })

router.post('/', auth, addBook)
router.get('/list', auth, bookList)
router.post('/learn/:bookId', auth, learnBook)
router.delete('/learn/:id', auth, deleteLearnBook)

router.get('/user-learn', auth, getUserLearnBook)
export default router