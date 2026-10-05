import { spawnSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { join, relative, resolve } from 'node:path'

const require = createRequire(import.meta.url)
const nextBin = require.resolve('next/dist/bin/next')
const result = spawnSync(process.execPath, [nextBin, 'build'], {
  env: { ...process.env, GITHUB_PAGES: 'true' },
  stdio: 'inherit',
})

if (result.error) throw result.error
if (result.status !== 0) process.exit(result.status ?? 1)

const workspace = process.cwd()
const exportDir = resolve(workspace, 'out')
const publishDir = resolve(workspace, '.pages-dist')
const destination = relative(workspace, publishDir)
if (destination !== '.pages-dist') throw new Error('Invalid Pages staging path')

await rm(publishDir, { recursive: true, force: true })
await cp(exportDir, publishDir, {
  recursive: true,
  filter: path => !path.split(/[\\/]/).includes('.git'),
})

const publicAsset = /(?<![\w/-])\/(showcase|image|icons|fonts)\//g
let replaced = 0

async function prefixAssets(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filePath = join(directory, entry.name)
    if (entry.isDirectory()) {
      await prefixAssets(filePath)
      continue
    }
    if (!/\.(html|css|js|json|txt)$/.test(entry.name)) continue
    const original = await readFile(filePath, 'utf8')
    const updated = original.replace(publicAsset, (_, folder) => {
      replaced += 1
      return `/portafolio-2026/${folder}/`
    })
    if (updated !== original) await writeFile(filePath, updated)
  }
}

await prefixAssets(publishDir)
if (!replaced) throw new Error('No public asset URLs were prefixed for GitHub Pages')
await mkdir(publishDir, { recursive: true })
await writeFile(join(publishDir, '.nojekyll'), '')
console.log(`GitHub Pages export ready: ${replaced} public asset URLs prefixed`)
