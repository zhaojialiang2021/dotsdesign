# AI 工具接入

Dots 给 AI 工具提供三种接入方式。默认推荐 npm MCP 包，因为它不依赖本机路径，产品、设计和工程同学换电脑也能用。

先把三件事分清楚：

- MCP：给 AI 工具读 Dots 规范、页面模板、组件规则和 demo 工作流。
- 本地预览：给自己看 demo 效果，通常是 AI 在本机跑一个 HTML 或页面服务。
- Vercel：给别人看稳定版本，不是 AI 接入的前置条件。

## 1. npm MCP 包

适合长期接入 Codex、Claude Code、Cursor 或其他支持 MCP 的 AI 工具。接入后，AI 可以自己读取 Dots 的规范、页面模板、组件规则和 demo 工作流。

把下面配置放进 AI 工具的 MCP 配置里，然后重启 AI 工具：

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

### 怎么算接入成功

成功不是看配置贴没贴上，而是看 AI 能不能真的读到 Dots：

1. AI 工具的 MCP 列表里能看到 `dots-design`。
2. 让 AI 调用 `get_demo_workflow`，它能返回 demo 制作流程、页面基座规则和文档读取顺序。
3. 让 AI 搜索“回答 loading”“页面模板”或组件名，它能找到对应规范。
4. 让 AI 做 demo 时，它会先在本地跑预览，而不是直接要求你发布到线上。

只要上面几项能跑通，就说明接入已经成功。

可以直接把这段发给 AI 做验收：

```text
请先调用 dots-design 的 get_demo_workflow，确认你能读取 Dots 的 demo 制作流程。

然后告诉我三件事：
1. 是否接入成功；
2. 你读到了哪些关键规则；
3. 如果我要做一个页面 demo，你会先本地预览还是直接发布到 Vercel，为什么。
```

### 失败了怎么办

先按这个顺序排查：

1. 检查包名是不是 `dots-design-mcp`，命令是不是 `npx`，参数里有没有 `-y`。
2. 改完 MCP 配置后重启 AI 工具。很多工具不会热加载 MCP 配置。
3. 如果提示找不到包，先确认这台电脑能访问 npm。
4. 如果 AI 看得到 MCP 但不会主动查规范，直接要求它先调用 `get_demo_workflow`。
5. 如果临时接不上 MCP，可以先把 `/skill.md` 的内容复制给 AI，当作一次性上下文使用。

常见现象和处理方式：

| 现象 | 处理方式 |
|------|----------|
| MCP 列表里没有 `dots-design` | 先重启 AI 工具，再检查配置是不是放在当前工具真正读取的 MCP 配置文件里。 |
| 提示找不到 `dots-design-mcp` | 先确认这台电脑能访问 npm；再检查包名是否写成 `dots-design-mcp`，命令是否是 `npx`，参数是否有 `-y`。 |
| AI 看得到工具，但还是凭空写 demo | 直接要求它先调用 `get_demo_workflow`，再调用 `search_design_system` 查页面模板或组件规范。 |
| 本地地址打不开 | 通常是本地预览服务没启动，或者端口变了。让 AI 重新启动本地服务，并给你最新地址。 |
| Vercel 链接不是最新效果 | 检查代码是否已经推到 GitHub，以及 Vercel 部署是否完成。Vercel 只是分享链接，不影响 MCP 接入。 |

## 2. 本地预览

本地预览是制作阶段用的。AI 在你的电脑上生成 HTML 或页面 demo，你直接打开本地地址检查效果。

本地预览适合：

- 快速看交互和动效是否对。
- 一边反馈一边改。
- 还没有准备好给别人看时，先不发布。

本地预览不等于线上发布。别人换一台电脑访问不了你的 `localhost`，所以它只适合自己调试。

## 3. Vercel 线上预览

Vercel 是分享阶段用的。demo 在本地确认后，需要给产品、设计、业务方或同事看，再发布到 Vercel。

Vercel 适合：

- 给别人一个能直接打开的链接。
- 评审一版已经稳定的 demo。
- 对齐线上文档、demo 和 npm 包版本。

不要把 Vercel 当成 AI 工具接入的前置条件。AI 工具接入靠 MCP，本地预览靠本机开发服务，Vercel 只是最后的分享方式。

## 4. 线上静态文档

线上静态文档适合临时给 AI 或人读，不适合作为长期接入方式。

- `/skill.md`：一站式 Skill 包。
- `/design.md`：Token 紧凑 markdown。
- `/components.md`：组件契约 markdown。
- `/components.json`：组件契约 JSON。
- `/llms.txt`：AI 入口说明。

这种方式简单，但 AI 不能主动搜索和按需读取，只能依赖一次性拉取或粘贴。

## 5. 维护者调试用：本地实时文档

这不是普通接入方式。只有已经 clone `dots-design` 仓库、需要调试最新 `references/` 文档时才用。

它读取当前工作区的实时文档，不读取 npm 包快照。普通使用者请用上面的 `npx -y dots-design-mcp`。

```bash
npm run mcp
```

项目级 `.mcp.json` 指向这个命令：

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

这个方式只适合已经 clone 仓库的人。不要把它作为产品团队跨电脑接入的默认方案。

## 推荐工作流

### 产品 / 设计使用者

1. 在自己的 AI 工具里配置 `npx -y dots-design-mcp`。
2. 重启 AI 工具，确认能看到 `dots-design`。
3. 让 AI 先调用 `get_demo_workflow`。
4. 需要查组件、页面或回答 loading 规则时，让 AI 用 `search_design_system` 和 `read_design_doc` 按需读取。
5. 让 AI 在本地生成并跑起 HTML / 页面 demo，先自己预览。
6. 确认后，如果需要给别人看，再部署到 Vercel。

一句话版本：

```text
先让 AI 接 Dots MCP，再让 AI 本地跑 demo；要给别人看时，最后再发 Vercel 链接。
```

### 设计系统维护者

1. 先改 `references/`，再改代码和 demo。
2. 本地用 `npm run mcp` 验证实时文档。
3. 发 npm 包前运行：

```bash
npm run lint:tokens
npm run mcp:sync
```

4. 发布 `dots-design-mcp`。
5. 需要让人看最新页面时，再同步部署 Vercel。

## MCP 工具

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
