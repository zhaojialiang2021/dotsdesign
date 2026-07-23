#!/usr/bin/env node
process.argv.push('--source', 'project')
await import('../packages/dots-design-mcp/bin/dots-design-mcp.mjs')
