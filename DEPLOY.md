# 🚀 牛马等级测试 - 在线部署

## 推荐方式：Vercel Dashboard（最可靠，无需 CLI）

项目已配置好 `vercel.json`，构建产物在 `dist/` 目录。

### 步骤（5 分钟）：

1. 访问 **[vercel.com/new](https://vercel.com/new)**
2. 选择 **Import** → 导入你的 Git 仓库（推荐先推送到 GitHub）
3. Vercel 自动识别为 Vite 项目，**直接点 Deploy**
4. 部署完成后获得域名 `https://xxx.vercel.app`
5. 在 Dashboard → Settings → Domains 可绑定**自定义域名**

> 免费套餐支持：自动 HTTPS、全球 CDN、自定义域名绑定、无限流量

### 备选：Cloudflare Pages

1. 访问 **[dash.cloudflare.com](https://dash.cloudflare.com)** → Workers & Pages
2. 连接 GitHub 仓库
3. 构建命令：`npm run build`，输出目录：`dist`
4. 部署即可获得 `xxx.pages.dev` 域名
