#!/usr/bin/env node
import { readdir, readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const PACKAGE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

function getArgValue(name) {
  const index = process.argv.indexOf(name)
  if (index === -1) return undefined
  return process.argv[index + 1]
}

function resolveContentRoot() {
  const explicitRoot = getArgValue('--root') || process.env.DOTS_DESIGN_MCP_ROOT
  if (explicitRoot) return path.resolve(explicitRoot)

  const source = getArgValue('--source') || process.env.DOTS_DESIGN_MCP_SOURCE
  if (source === 'project') return process.cwd()

  return PACKAGE_ROOT
}

const ROOT = resolveContentRoot()
const REFERENCES_ROOT = path.join(ROOT, 'references')
const PUBLIC_ROOT = path.join(ROOT, 'public')

const SERVER_INFO = {
  name: 'dots-design-mcp',
  version: '0.1.0',
}

const DOC_EXTENSIONS = new Set(['.md', '.json'])
const PUBLIC_DOCS = ['llms.txt', 'design.md', 'components.md', 'components.json', 'skill.md']
const REFERENCE_ORDER = [
  'references/strategy.md',
  'references/agent-persona.md',
  'references/design-tokens.md',
  'references/design-principles.md',
  'references/haptics.md',
]

async function walkDocs(dir, baseDir = ROOT) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...await walkDocs(fullPath, baseDir))
      continue
    }

    if (!DOC_EXTENSIONS.has(path.extname(entry.name))) continue
    files.push(path.relative(baseDir, fullPath))
  }

  return files.sort((a, b) => a.localeCompare(b))
}

async function listDocs() {
  const references = await walkDocs(REFERENCES_ROOT)
  const publicDocs = []

  for (const filename of PUBLIC_DOCS) {
    const fullPath = path.join(PUBLIC_ROOT, filename)
    try {
      const fileStat = await stat(fullPath)
      if (fileStat.isFile()) publicDocs.push(path.relative(ROOT, fullPath))
    } catch {
      // public docs are optional in downstream packages
    }
  }

  return [...references, ...publicDocs]
}

function safeResolve(relativePath) {
  const normalized = relativePath.replace(/^dots:\/\//, '')
  const fullPath = path.resolve(ROOT, normalized)
  if (fullPath !== ROOT && !fullPath.startsWith(ROOT + path.sep)) {
    throw new Error('路径超出 Dots MCP 内容目录')
  }
  return fullPath
}

async function readProjectFile(relativePath) {
  return readFile(safeResolve(relativePath), 'utf8')
}

function splitTerms(query) {
  return query.toLowerCase().split(/\s+/).filter(Boolean)
}

function scoreMatch(text, query) {
  const terms = splitTerms(query)
  const lower = text.toLowerCase()
  return terms.reduce((score, term) => score + (lower.includes(term) ? 1 : 0), 0)
}

async function searchDocs(query, limit = 8) {
  const docs = await listDocs()
  const results = []
  const firstTerm = splitTerms(query)[0] ?? ''

  for (const docPath of docs) {
    const text = await readProjectFile(docPath)
    const score = scoreMatch(`${docPath}\n${text}`, query)
    if (score === 0) continue

    const index = firstTerm ? Math.max(0, text.toLowerCase().indexOf(firstTerm) - 120) : 0
    const excerpt = text.slice(index, index + 420).replace(/\s+/g, ' ').trim()
    results.push({ path: docPath, score, excerpt })
  }

  return results
    .sort((a, b) => b.score - a.score || a.path.localeCompare(b.path))
    .slice(0, limit)
}

function textContent(text) {
  return { content: [{ type: 'text', text }] }
}

const tools = [
  {
    name: 'search_design_system',
    description: '搜索 Dots 设计系统规范、页面模板、组件文档和 AI 入口文档。',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: '搜索关键词，例如“回答 loading”“对话页模板”“message bubble”。' },
        limit: { type: 'number', description: '最多返回条数，默认 8。' },
      },
      required: ['query'],
      additionalProperties: false,
    },
  },
  {
    name: 'read_design_doc',
    description: '读取一份 Dots 设计系统文档。path 来自 search_design_system 或 resources/list。',
    inputSchema: {
      type: 'object',
      properties: {
        path: { type: 'string', description: '相对路径，例如 references/frameworks/answer-loading.md。' },
      },
      required: ['path'],
      additionalProperties: false,
    },
  },
  {
    name: 'get_demo_workflow',
    description: '获取制作 Dots demo 前必须读取的文档顺序、页面基座规则和回答 loading 相关规范。',
    inputSchema: {
      type: 'object',
      properties: {
        demoType: { type: 'string', description: '可选：conversation、answer-loading、long-thinking。' },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'validate_demo_request',
    description: '根据 Dots demo 规则生成实现前检查清单，帮助 AI 避免脱离页面模板或误改规范。',
    inputSchema: {
      type: 'object',
      properties: {
        request: { type: 'string', description: '产品提出的 demo 需求。' },
      },
      required: ['request'],
      additionalProperties: false,
    },
  },
  {
    name: 'get_component_spec',
    description: '读取指定组件规范。',
    inputSchema: {
      type: 'object',
      properties: {
        component: { type: 'string', description: '组件名或文档名，例如 message-bubble、card、sheet。' },
      },
      required: ['component'],
      additionalProperties: false,
    },
  },
  {
    name: 'get_page_template',
    description: '读取指定页面模板规范。',
    inputSchema: {
      type: 'object',
      properties: {
        page: { type: 'string', description: '页面名或文档名，例如 dotted-demo、home。' },
      },
      required: ['page'],
      additionalProperties: false,
    },
  },
]

async function readNamedDoc(folder, name) {
  const normalized = String(name).trim().replace(/\.md$/, '')
  const directPath = `references/${folder}/${normalized}.md`

  try {
    return await readProjectFile(directPath)
  } catch {
    const results = await searchDocs(normalized, 1)
    const fallback = results.find((item) => item.path.startsWith(`references/${folder}/`))
    if (!fallback) throw new Error(`找不到 ${folder} 文档：${name}`)
    return readProjectFile(fallback.path)
  }
}

async function callTool(name, args = {}) {
  if (name === 'search_design_system') {
    const query = String(args.query ?? '').trim()
    if (!query) return textContent('query 不能为空')
    return textContent(JSON.stringify(await searchDocs(query, Number(args.limit ?? 8)), null, 2))
  }

  if (name === 'read_design_doc') {
    const docPath = String(args.path ?? '').trim()
    if (!docPath) return textContent('path 不能为空')
    return textContent(await readProjectFile(docPath))
  }

  if (name === 'get_demo_workflow') {
    const demoType = String(args.demoType ?? 'answer-loading')
    const workflow = [
      '# Dots demo workflow',
      '',
      `demoType: ${demoType}`,
      '',
      '必须先读：',
      ...REFERENCE_ORDER.map((item, index) => `${index + 1}. ${item}`),
      '',
      '核心规则：',
      '- demo 必须基于真实页面模板，不允许脱离页面基座。',
      '- 对话页能力必须复用真实状态栏、导航、消息流、输入框和消息组件。',
      '- 临时实验先不沉淀到规范，确认完成后再统一收拢。',
      '- 先给计划，确认后再改代码。',
      '',
      '回答 loading / 长思考规范：',
      await readProjectFile('references/frameworks/answer-loading.md'),
      '',
      '对话页基座：',
      await readProjectFile('references/pages/dotted-demo.md'),
    ]
    return textContent(workflow.join('\n'))
  }

  if (name === 'validate_demo_request') {
    const request = String(args.request ?? '').trim()
    const checklist = [
      `需求：${request}`,
      '',
      '实现前检查：',
      '- 是否基于真实对话页模板，而不是单独造展示页',
      '- 是否复用状态栏、顶部导航、消息流、输入框和对话气泡',
      '- 是否只把汇报说明放在页面模板外侧',
      '- 是否读取 references/frameworks/answer-loading.md',
      '- 是否区分长思考链路和快速回答链路',
      '- 是否没有把临时实验直接沉淀到规范',
      '- 是否跑过类型检查和构建',
    ]
    return textContent(checklist.join('\n'))
  }

  if (name === 'get_component_spec') {
    return textContent(await readNamedDoc('components', args.component))
  }

  if (name === 'get_page_template') {
    return textContent(await readNamedDoc('pages', args.page))
  }

  return textContent(`未知工具：${name}`)
}

const prompts = [
  {
    name: 'create_dots_demo',
    description: '生成 Dots 项目 demo 的标准协作提示词。',
    arguments: [
      { name: 'request', description: '产品需求原文', required: true },
    ],
  },
]

function getPrompt(name, args = {}) {
  if (name !== 'create_dots_demo') {
    throw new Error(`未知 prompt：${name}`)
  }

  return {
    description: 'Dots demo 制作提示词',
    messages: [
      {
        role: 'user',
        content: {
          type: 'text',
          text: [
            '你是 Dots 设计系统 demo 实现助手。',
            '先调用 get_demo_workflow，按读取顺序理解规范。',
            'demo 必须基于真实页面模板，不允许脱离页面基座。',
            '先给实现计划，确认后再改代码。',
            '',
            `产品需求：${String(args.request ?? '')}`,
          ].join('\n'),
        },
      },
    ],
  }
}

async function handleRequest(message) {
  const { id, method, params = {} } = message

  if (method === 'initialize') {
    return {
      jsonrpc: '2.0',
      id,
      result: {
        protocolVersion: params.protocolVersion ?? '2024-11-05',
        capabilities: {
          resources: {},
          tools: {},
          prompts: {},
        },
        serverInfo: SERVER_INFO,
      },
    }
  }

  if (method === 'resources/list') {
    const docs = await listDocs()
    return {
      jsonrpc: '2.0',
      id,
      result: {
        resources: docs.map((docPath) => ({
          uri: `dots://${docPath}`,
          name: docPath,
          mimeType: docPath.endsWith('.json') ? 'application/json' : 'text/markdown',
        })),
      },
    }
  }

  if (method === 'resources/read') {
    const uri = String(params.uri ?? '')
    const docPath = uri.replace(/^dots:\/\//, '')
    return {
      jsonrpc: '2.0',
      id,
      result: {
        contents: [{
          uri,
          mimeType: docPath.endsWith('.json') ? 'application/json' : 'text/markdown',
          text: await readProjectFile(docPath),
        }],
      },
    }
  }

  if (method === 'tools/list') return { jsonrpc: '2.0', id, result: { tools } }

  if (method === 'tools/call') {
    return { jsonrpc: '2.0', id, result: await callTool(params.name, params.arguments) }
  }

  if (method === 'prompts/list') return { jsonrpc: '2.0', id, result: { prompts } }

  if (method === 'prompts/get') {
    return { jsonrpc: '2.0', id, result: getPrompt(params.name, params.arguments) }
  }

  if (method?.startsWith('notifications/')) return null

  return {
    jsonrpc: '2.0',
    id,
    error: { code: -32601, message: `Method not found: ${method}` },
  }
}

function send(message) {
  if (message) process.stdout.write(`${JSON.stringify(message)}\n`)
}

let buffer = ''

process.stdin.setEncoding('utf8')
process.stdin.on('data', async (chunk) => {
  buffer += chunk
  const lines = buffer.split('\n')
  buffer = lines.pop() ?? ''

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue

    try {
      send(await handleRequest(JSON.parse(trimmed)))
    } catch (error) {
      send({
        jsonrpc: '2.0',
        id: null,
        error: {
          code: -32603,
          message: error instanceof Error ? error.message : 'Unknown error',
        },
      })
    }
  }
})

process.stdin.resume()
