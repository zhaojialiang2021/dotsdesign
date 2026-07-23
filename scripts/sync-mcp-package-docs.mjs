#!/usr/bin/env node
import { cp, mkdir, rm } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const root = process.cwd()
const packageRoot = path.join(root, 'packages/dots-design-mcp')

const targets = [
  ['references', 'references'],
  ['public/llms.txt', 'public/llms.txt'],
  ['public/design.md', 'public/design.md'],
  ['public/components.md', 'public/components.md'],
  ['public/components.json', 'public/components.json'],
  ['public/skill.md', 'public/skill.md'],
]

await rm(path.join(packageRoot, 'references'), { recursive: true, force: true })
await rm(path.join(packageRoot, 'public'), { recursive: true, force: true })

for (const [from, to] of targets) {
  const sourcePath = path.join(root, from)
  const targetPath = path.join(packageRoot, to)
  await mkdir(path.dirname(targetPath), { recursive: true })
  await cp(sourcePath, targetPath, { recursive: true })
}

console.log('已同步 MCP npm 包内置文档')
