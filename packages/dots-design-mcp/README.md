# Dots Design MCP

Dots 设计系统的 MCP Server。它把 `references/` 和公开 AI 文档暴露给 Codex、Claude Code 等工具，用来制作 demo、读取组件规范、校验页面基座规则。

## 推荐接入

发布到 npm 后，外部项目只需要在 MCP 配置里写：

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

这条链路读取的是 npm 包内置的文档快照，适合产品、设计、业务工程师在自己的项目里直接接入。

## 本仓库开发

在 Dots 设计系统仓库里调试时，使用项目内实时文档：

```bash
npm run mcp
```

项目级 `.mcp.json` 已经指向这个命令。这样本地改完 `references/` 后，AI 工具读到的是当前工作区内容。

## 发包前同步

每次准备发 npm 包前先同步文档：

```bash
npm run mcp:sync
npm pack ./packages/dots-design-mcp
```

同步会把仓库根目录下的 `references/` 以及 `public/llms.txt`、`public/design.md`、`public/components.md`、`public/components.json`、`public/skill.md` 复制进 npm 包。

## 暴露能力

- `search_design_system`：搜索设计系统文档、组件、页面模板和 demo 规范
- `read_design_doc`：读取指定文档
- `get_demo_workflow`：返回 demo 制作前必须读取的文档顺序和关键规则
- `validate_demo_request`：生成实现前检查清单
- `get_component_spec`：读取组件规格
- `get_page_template`：读取页面模板

## 分发边界

npm 包解决“别人电脑怎么接入”的问题；Vercel 站点解决“人怎么看文档和 demo”的问题。两者应该并行存在，不互相替代。
