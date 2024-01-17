import Router from 'koa-router'
import jwt from 'koa-jwt'
import { Context } from 'koa'
import qiniu from 'qiniu'
import { _JWT_KEY_, accessKey, secretKey, bucket } from '../conf/secretKeys'
import fs from 'fs'

const auth = jwt({ secret: _JWT_KEY_ })
const router = new Router({ prefix: '/file' })

router.post('/img', auth, async (ctx: Context) => {
  const url = await uploadQiniu(ctx)
  ctx.body = { url }
})

function uploadQiniu(ctx: Context) {
  return new Promise((resolve) => {
    const { filepath, originalFilename } = ctx.request.files.file as any
    // 七牛云 相关文档 https://developer.qiniu.com/kodo/1289/nodejs#1
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
    const putPolicy = new qiniu.rs.PutPolicy({scope: bucket, expires: 3600 * 24 * 365 * 60})  // 3600为一小时  共60年
    const uploadToken = putPolicy.uploadToken(mac);
    const config: any = new qiniu.conf.Config()
    config.zone = qiniu.zone.Zone_z1;
    const formUploader = new qiniu.form_up.FormUploader(config)
    const putExtra = new qiniu.form_up.PutExtra()
    const bucketManager = new qiniu.rs.BucketManager(mac, config);
    const publicBucketDomain = 'http://file.freetoplay.cn/'
    
    formUploader.putFile(uploadToken, originalFilename, filepath, putExtra, (_respErr, respBody, _respInfo) => {
      const publicDownloadUrl = bucketManager.publicDownloadUrl(publicBucketDomain, respBody.key);
      resolve(publicDownloadUrl)
      // 上次成功后删除缓存
      fs.unlink(filepath, () => {})
    })
  })
}

export default router