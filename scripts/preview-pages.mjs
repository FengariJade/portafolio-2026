import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, relative, resolve } from 'node:path'

const root = resolve('.pages-dist')
const prefix = '/portafolio-2026'
const mimeTypes = {
  '.css': 'text/css', '.html': 'text/html', '.js': 'text/javascript',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf',
  '.otf': 'font/otf', '.txt': 'text/plain',
}

createServer(async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname)
  if (pathname !== prefix && !pathname.startsWith(`${prefix}/`)) {
    response.writeHead(404).end()
    return
  }

  const requested = pathname.slice(prefix.length) || '/'
  const file = resolve(root, `.${requested}`, requested.endsWith('/') ? 'index.html' : '')
  const inside = relative(root, file)
  if (inside.startsWith('..') || inside === '') {
    response.writeHead(404).end()
    return
  }

  try {
    if (!(await stat(file)).isFile()) throw new Error('Not a file')
    const body = await readFile(file)
    response.writeHead(200, { 'Content-Type': mimeTypes[extname(file)] ?? 'application/octet-stream' }).end(body)
  } catch {
    response.writeHead(404).end()
  }
}).listen(4173, '127.0.0.1', () => {
  console.log('GitHub Pages preview: http://127.0.0.1:4173/portafolio-2026/')
})
