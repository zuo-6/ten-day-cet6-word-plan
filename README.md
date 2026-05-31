# 十天六级核心词

一个纯静态的六级核心词学习网站。项目可以直接部署到 GitHub Pages，也可以下载后本地打开使用。学习进度保存在访问者自己的浏览器里，不需要服务器、数据库或登录账号。

## 功能

- 10 天学习计划
- 每天 300 词，分为 6 组
- 每组乱序学习
- 导入词库时自动去重并随机分组
- 单词发音，基于浏览器 Web Speech API
- 认识 / 模糊 / 不认识反馈
- 复习队列
- 重点词
- 本地保存学习进度
- 备份和恢复学习记录
- 支持 Safari 和 Edge

## 直接使用

下载或克隆项目后，用浏览器打开：

```text
index.html
```

项目至少需要保留这几个文件：

```text
index.html
styles.css
app.js
```

## 部署到 GitHub Pages

1. 新建 GitHub 仓库。
2. 上传本项目中的所有文件。
3. 进入仓库的 `Settings`。
4. 打开 `Pages`。
5. Source 选择 `Deploy from a branch`。
6. Branch 选择 `main`，目录选择 `/root`。
7. 保存后等待 GitHub 生成访问链接。

部署后，别人访问你的 GitHub Pages 链接即可学习。

## 学习记录保存在哪里

学习记录保存在访问者自己的浏览器 `localStorage` 里。

这意味着：

- 每个人的记录互不影响。
- 记录不会上传到 GitHub。
- 换浏览器或换设备不会自动同步。
- 清理浏览器网站数据可能导致记录丢失。

如果需要换设备或备份记录，请在网站的“设置”页使用“备份进度”和“恢复进度”。

## 导入 3000 词库

网站支持导入 JSON 或 CSV。

CSV 表头建议：

```csv
word,phonetic,meaning,englishMeaning,example,exampleCn,phrase
```

JSON 示例：

```json
[
  {
    "word": "abandon",
    "phonetic": "/əˈbændən/",
    "meaning": "v. 放弃；抛弃",
    "englishMeaning": "to leave or stop doing something",
    "example": "He decided to abandon the original plan.",
    "exampleCn": "他决定放弃原来的计划。",
    "phrase": "abandon a plan"
  }
]
```

导入时会按英文单词去重，然后随机切分为：

```text
10 天 × 每天 6 组 × 每组 50 词
```

如果去重后少于 3000 个词，实际计划会少于 3000 个不同词。

## 发音说明

发音使用浏览器内置的 `speechSynthesis`。

- Edge 通常可以直接使用。
- Safari 可能需要先点击一次播放按钮来授权声音。
- 不同系统和浏览器的音色可能不同。

## 适合的使用方式

这个版本适合做开源静态背词工具：

```text
GitHub Pages 托管网页
访问者浏览器本地保存进度
无需服务器
无需数据库
无需登录
```

如果以后需要账号登录、跨设备自动同步、排行榜或后台管理，需要升级为带后端和数据库的版本。
