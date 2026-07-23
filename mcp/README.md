# Dots MCP Server

Dots 的 MCP 接入有两种方式：外部使用默认走 npm 包；本目录下的 `server.mjs` 只给仓库维护者做本地调试。

## 推荐接入：npm 包

把以下配置加到 Codex、Claude Code、Cursor 或其他 MCP Client：

```json
{
  "mcpServers": {
    "dots-design": {
      "command": "npx",
      "args": ["-y", "dots-design-mcp"]
    }
  }
}
```

这个方式读取 npm 包内置的 `references/` 文档快照，不依赖当前电脑是否 clone 了仓库。

## 本地项目模式

维护 Dots 设计系统时，可以读取当前工作区的实时文档：

```bash
npm run mcp
```

项目级 `.mcp.json` 已经指向这个命令。改完 `references/` 后，不需要重新发包也能在本机验证。

## 工具

| 工具 | 说明 |
|------|------|
| `search_design_system` | 搜索设计系统规范、页面模板、组件文档和 demo 规则 |
| `read_design_doc` | 读取指定文档 |
| `get_demo_workflow` | 返回 demo 制作前必须读取的文档顺序、页面基座规则和回答 loading 规范 |
| `validate_demo_request` | 生成实现前检查清单 |
| `get_component_spec` | 读取组件规格 |
| `get_page_template` | 读取页面模板 |

## 本地测试

```bash
node mcp/server.mjs <<< '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

## 发布前同步

```bash
npm run mcp:sync
npm publish ./packages/dots-design-mcp --access public
```

`npm run mcp:sync` 会把仓库里的 `references/` 和公开 AI 文档复制进 npm 包，保证外部 AI 工具读到的是最新规范。
