# 腾讯云EdgeOne Pages部署指南

## 项目概述

本项目是一个双色球AI智能选号助手，基于纯前端技术栈构建，无需后端服务器，可以直接部署到腾讯云EdgeOne Pages静态托管服务。

## 技术架构

- **前端技术**：HTML5 + CSS3 + JavaScript
- **UI框架**：Tailwind CSS v3
- **图表库**：Chart.js
- **图标库**：Font Awesome
- **数据存储**：LocalStorage（浏览器本地存储）
- **部署平台**：腾讯云EdgeOne Pages

## 部署优势

1. **零服务器成本**：静态网站托管，无需服务器费用
2. **全球CDN加速**：EdgeOne提供全球CDN分发
3. **自动HTTPS**：免费SSL证书，自动续期
4. **高可用性**：多节点部署，故障自动切换
5. **快速部署**：Git推送自动触发部署
6. **自定义域名**：支持绑定自定义域名

## 部署配置文件

项目包含以下部署配置文件：

- `edge.json` - EdgeOne Pages配置文件
- `.gitignore` - Git忽略文件配置
- `deploy.sh` - 部署脚本

## 详细部署步骤

### 方法一：通过控制台部署

1. **准备代码仓库**

   ```bash
   # 克隆项目
   git clone https://your-repo-url.git
   cd ssq-ai-v23
   
   # 初始化Git（如果不是Git仓库）
   git init
   git add .
   git commit -m "初始化项目"
   
   # 添加远程仓库
   git remote add origin https://your-repo-url.git
   git push -u origin main
   ```

2. **登录腾讯云控制台**

   - 访问 [腾讯云官网](https://cloud.tencent.com/)
   - 使用账号密码登录
   - 进入控制台首页

3. **配置EdgeOne Pages**

   - 在控制台中搜索并进入 **EdgeOne** 服务
   - 选择 **Pages** 功能模块
   - 点击 **新建项目**
   - 选择 **从Git仓库导入**

4. **连接代码仓库**

   - 选择代码仓库类型（GitHub/GitLab/Gitee等）
   - 授权腾讯云访问您的代码仓库
   - 选择要部署的仓库和分支（建议使用main分支）

5. **构建配置**

   由于本项目是纯静态网站，无需构建步骤：

   - **构建命令**：留空（无需构建）
   - **输出目录**：`./`（根目录）
   - **根目录**：`./`（项目根目录）

6. **环境变量（可选）**

   如需配置环境变量，可在项目设置中添加：

   | 变量名 | 值 | 说明 |
   |--------|-----|------|
   | `NODE_ENV` | `production` | 生产环境标识 |
   | `API_ENDPOINT` | `https://api.example.com` | 如需API调用时使用 |

7. **部署触发**

   - 点击 **立即部署**
   - 等待部署完成（通常1-3分钟）
   - 查看部署日志确认是否成功

### 方法二：使用部署脚本

本项目包含自动化部署脚本 `deploy.sh`：

```bash
# 赋予执行权限
chmod +x deploy.sh

# 执行部署脚本
./deploy.sh
```

脚本会自动检查Git状态、提交更改并推送到远程仓库，触发EdgeOne Pages的自动部署。

## 自定义域名配置

1. **添加自定义域名**

   - 在EdgeOne Pages项目中，进入 **域名管理**
   - 点击 **添加自定义域名**
   - 输入您的域名（如：`ssq-ai.example.com`）
   - 点击 **保存**

2. **DNS配置**

   根据系统提示，在您的域名注册商处添加以下DNS记录：

   | 记录类型 | 主机记录 | 记录值 | TTL |
   |----------|----------|--------|-----|
   | CNAME | ssq-ai | cname.pages.dev | 600 |

3. **SSL证书**

   - EdgeOne Pages会自动为您的域名申请免费SSL证书
   - 证书通常在10分钟内签发完成
   - 支持自动续期

4. **域名验证**

   - DNS配置生效后（通常5-30分钟）
   - 点击 **验证域名**
   - 确认域名配置成功

## 性能优化建议

1. **CDN缓存配置**

   项目的 `edge.json` 已配置了合理的缓存策略：

   - HTML文件：不缓存，确保实时更新
   - JavaScript文件：缓存1年，配合文件哈希使用
   - CSS文件：缓存1年，配合文件哈希使用

2. **图片优化**

   - 使用适当尺寸的图片
   - 考虑使用WebP格式
   - 实现懒加载

3. **代码分割**

   如需进一步优化，可考虑：
   - 将大型JS文件拆分为多个小文件
   - 实现按需加载
   - 使用动态import()

## 监控与维护

1. **访问统计**

   - 在EdgeOne Pages控制台查看访问统计
   - 支持PV/UV、带宽、响应时间等指标
   - 可按地区、设备类型等维度分析

2. **错误监控**

   - 配置错误监控（如Sentry）
   - 定期检查浏览器控制台错误
   - 关注用户反馈的问题

3. **数据更新**

   本项目的历史开奖数据存储在前端代码中：
   - 定期更新 `index.html` 中的 `historicalData` 数组
   - 更新后推送到Git仓库，自动触发重新部署

## 常见问题解决

### 部署失败

**症状**：部署日志显示错误

**解决方案**：
1. 检查Git仓库配置是否正确
2. 确认分支名称是否为main（或master）
3. 检查项目文件是否完整
4. 查看详细错误日志定位问题

### 页面加载缓慢

**症状**：网站访问速度慢

**解决方案**：
1. 检查网络连接
2. 确认EdgeOne CDN是否正常工作
3. 优化图片和资源大小
4. 考虑启用GZIP压缩（EdgeOne默认开启）

### 自定义域名无法访问

**症状**：自定义域名显示404或无法访问

**解决方案**：
1. 检查DNS记录是否正确配置
2. 确认DNS缓存是否已刷新
3. 验证域名是否已在EdgeOne Pages中验证通过
4. 检查SSL证书状态

### 数据更新不生效

**症状**：页面显示的还是旧数据

**解决方案**：
1. 强制刷新浏览器缓存（Ctrl+F5）
2. 检查Git提交是否成功
3. 确认部署是否已完成
4. 验证更新的文件是否包含在部署范围内

## 安全建议

1. **内容安全策略（CSP）**

   建议在EdgeOne Pages中配置CSP头：

   ```
   Content-Security-Policy: default-src 'self'; script-src 'self' https://cdn.tailwindcss.com https://cdn.jsdelivr.net; style-src 'self' https://cdn.tailwindcss.com https://cdn.jsdelivr.net; img-src 'self' data:; font-src 'self' https://cdn.jsdelivr.net;
   ```

2. **XSS防护**

   - 本项目已内置XSS防护措施
   - 所有用户输入都经过严格过滤
   - 使用安全的DOM操作方法

3. **敏感信息保护**

   - 不在前端代码中存储敏感信息
   - 使用LocalStorage存储非敏感数据
   - 避免在URL中传递敏感参数

## 扩展功能

如需添加后端功能，可考虑：

1. **云函数集成**
   - 使用腾讯云云函数SCF
   - 通过API网关提供接口
   - 前端通过fetch API调用

2. **数据库集成**
   - 使用腾讯云数据库（如TencentDB for MySQL）
   - 通过云函数作为中间层
   - 实现数据持久化存储

## 部署检查清单

- [ ] Git仓库已准备就绪
- [ ] 项目文件完整且无错误
- [ ] `edge.json` 配置正确
- [ ] `.gitignore` 已配置
- [ ] 静态资源已优化
- [ ] 页面在本地测试通过
- [ ] 自定义域名DNS已配置
- [ ] SSL证书已签发
- [ ] 访问权限已设置
- [ ] 监控告警已配置

## 联系支持

如遇部署问题，可通过以下渠道获取支持：

1. **腾讯云技术支持**
   - 官方文档：[EdgeOne Pages文档](https://cloud.tencent.com/document/product/1552)
   - 在线客服：腾讯云控制台右下角
   - 工单系统：提交技术工单

2. **社区支持**
   - GitHub Issues：提交问题描述
   - 技术论坛：腾讯云开发者社区

---

**部署成功后，请访问：**
- EdgeOne Pages默认域名：`https://your-project-id.pages.dev`
- 自定义域名：`https://your-custom-domain.com`

祝您部署顺利！ 🚀