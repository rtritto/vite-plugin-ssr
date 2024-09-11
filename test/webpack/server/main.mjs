import { renderPage } from 'vike/server'
import express from 'express'

const app = express()

app.use(express.static(`${process.cwd()}/dist/client/`))

app.get('*', async (req, res) => {
  const pageContext = await renderPage({ urlOriginal: req.originalUrl })
  const { httpResponse } = pageContext
  httpResponse.headers.forEach(([name, value]) => res.setHeader(name, value))
  res.status(httpResponse.statusCode)
  httpResponse.pipe(res)
})

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
})