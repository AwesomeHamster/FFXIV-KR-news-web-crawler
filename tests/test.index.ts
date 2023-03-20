import { describe, it } from 'mocha'
import { expect } from 'chai'
import createHttpsProxyAgent from 'https-proxy-agent'
import KRNews from '../src'

describe('#ffxiv cn news crawler', () => {
  it('should fetch news', async () => {
    const agent = createHttpsProxyAgent('http://127.0.0.1:7890')
    const kr = new KRNews('/notice', undefined, { 'timeout': 10000, 'agent': agent })
    const arr = await kr.getNews()
    console.log(arr)
  })
})