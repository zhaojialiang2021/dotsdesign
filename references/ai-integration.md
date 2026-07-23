# AI 工具接入

Dots 对 AI 工具提供三条接入链路，优先级从高到低是：MCP npm 包、线上静态文档、本地项目模式。

## 1. MCP npm 包

适合产品、设计、业务工程师在自己的 Codex、Claude Code 或其他 MCP Client 里长期接入。这个方式不依赖本机路径，别人换电脑也能用。

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

npm 包内置 `references/` 文档快照，暴露以下工具：

- `search_design_system`：搜索设计系统规范、页面模板、组件文档和 demo 规则。
- `read_design_doc`：读取指定文档。
- `get_demo_workflow`：返回 demo 制作前必须读取的文档顺序、页面基座规则和回答 loading 规范。
- `validate_demo_request`：生成实现前检查清单。
- `get_component_spec`：读取组件规格。
- `get_page_template`：读取页面模板。

每次发 npm 包前必须先运行：

```bash
npm run mcp:sync
```

这样包里的文档快照才会和仓库里的 `references/` 对齐。

## 2. 线上静态文档

适合快速给 AI 工具喂一次上下文，或给人阅读。

- `/skill.md`：一站式 Skill 包。
- `/design.md`：Token 紧凑 markdown。
- `/components.md`：组件契约 markdown。
- `/components.json`：组件契约 JSON。
- `/llms.txt`：AI 入口说明。

这种方式简单，但 AI 不能主动搜索和按需读取文档，只能依赖一次性粘贴或拉取。

## 3. 本地项目模式

适合设计系统仓库维护者调试。它读取当前工作区的实时文档，不读取 npm 包快照。

```bash
npm run mcp
```

项目级 `.mcp.json` 已经指向这个命令：

```json
{
  "mcpServers": {
    "dots-design": {
      "command": "npm",
      "args": ["run", "mcp", "--silent"]
    }
  }
}
```

这个方式只适合已经 clone 仓库的人。不能作为产品团队跨电脑接入的默认方案。

## 选择规则

- 要给别人用：发 npm 包。
- 要给人看 demo 和文档：部署 Vercel。
- 要在本仓库实时调试：用本地项目模式。
- 要临时喂上下文：用 `/skill.md`。

MCP 和 Vercel 是互补关系：MCP 给 AI 工具读规范，Vercel 给人看页面和 demo。

## 推荐工作流

### 产品 / 设计使用者

1. 在自己的 AI 工具里配置 `npx -y dots-design-mcp`。
2. 让 AI 先调用 `get_demo_workflow`，确认页面基座、文档读取顺序和 demo 规则。
3. 需要查组件、页面或回答 loading 规则时，用 `search_design_system` 和 `read_design_doc` 按需读取。
4. 做完 demo 后，用 Vercel 站点预览，避免只看 AI 文本描述。

### 设计系统维护者

1. 先改 `references/`，再改代码和 demo。
2. 本地用 `npm run mcp` 验证实时文档。
3. 发给别人前运行 `npm run mcp:sync`，再发布 `dots-design-mcp`。
4. 同步部署 Vercel，让人看的文档和 AI 读的 npm 包保持同一版本。
