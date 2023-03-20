import https from 'https'
import { load } from 'cheerio'

class KRNews {
  path: string = ''
  category?: number = NaN
  host: string = 'https://www.ff14.co.kr/news/'
  url: string = ''
  options?: https.RequestOptions = {}

  constructor(path: string, category?: number, options?: https.RequestOptions) {
    this.path = path
    this.category = category
    this.url = this.host + this.path
    this.options = options
    if (!Number.isNaN(category)) {
      this.url += '?category=' + category
    }
  }

  async getNews() {
    const resp = await this.getPage()
    const $ = load(resp)
    const list = $('.ff14_board_list').children('tbody').contents()
    return list
  }

  async getPage() {
    return new Promise<string>((resolve, reject) => {
      https.get(
        this.url,
        { ...this.options },
        (res) => {
          let data = ''
          res.setEncoding('utf8')
          res.on('error', reject)
          res.on('data', (chunk) => {
            data += chunk as string
          })
          res.on('end', () => {
            resolve(data)
          })
        }
      )
    })
  }

}

export default KRNews