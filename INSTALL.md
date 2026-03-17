# 🐍 贪吃蛇微信小程序 - 安装指南

---

## 📁 项目位置

```
/root/.openclaw/workspace/snake-wechat-miniprogram/
```

---

## 📋 文件结构

```
snake-wechat-miniprogram/
├── app.js                 # 小程序入口
├── app.json               # 全局配置
├── app.wxss               # 全局样式
├── project.config.json    # 项目配置
├── sitemap.json           # 站点地图
└── pages/
    └── index/
        ├── index.js       # 游戏逻辑
        ├── index.wxml     # 页面结构
        └── index.wxss     # 页面样式
```

---

## 🚀 安装步骤

### 步骤 1：下载微信开发者工具

**官网地址**: https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html

选择对应系统版本下载：
- Windows
- macOS
- Linux

---

### 步骤 2：注册小程序账号（如果没有）

1. 访问 https://mp.weixin.qq.com/
2. 点击"立即注册"
3. 选择"小程序"
4. 填写邮箱、密码等信息
5. 完成邮箱验证
6. **记录 AppID**（在"开发" → "开发管理" → "开发设置"中查看）

> 💡 **提示**: 如果只是学习测试，可以使用微信提供的"测试号"

---

### 步骤 3：导入项目

1. **打开微信开发者工具**
2. 使用微信扫码登录
3. 点击 **"+"** 或 **"导入项目"**
4. 填写项目信息：
   - **项目目录**: `/root/.openclaw/workspace/snake-wechat-miniprogram/`
   - **AppID**: 
     - 有账号：填写你的小程序 AppID
     - 测试：选择"测试号"或使用 `wxd1234567890abcde`
   - **项目名称**: 贪吃蛇
   - **模板选择**: 不使用模板
5. 点击 **"确定"**

---

### 步骤 4：修改 AppID（如果需要）

如果已有小程序账号，编辑 `project.config.json`：

```json
{
  "appid": "你的小程序 AppID",
  "projectname": "snake-wechat-miniprogram"
}
```

---

### 步骤 5：运行和调试

1. 导入成功后，开发者工具会自动编译项目
2. 左侧模拟器会显示游戏界面
3. 右侧可以查看调试信息
4. **测试控制**:
   - 鼠标滑动模拟触摸操作
   - 上下左右滑动控制蛇的方向

---

### 步骤 6：预览和上传

#### 预览（真机测试）
1. 点击工具栏 **"预览"** 按钮
2. 用微信扫描二维码
3. 游戏会在手机上打开

#### 上传（发布）
1. 点击工具栏 **"上传"** 按钮
2. 填写版本号和备注
3. 登录 https://mp.weixin.qq.com/
4. 进入"版本管理"
5. 提交审核

---

## 🎮 游戏说明

| 功能 | 说明 |
|------|------|
| 🕹️ 控制 | 滑动屏幕控制蛇的方向 |
| 🏆 得分 | 吃到食物 +10 分 |
| 💾 存档 | 最高分自动保存到本地 |
| 📈 难度 | 每 50 分速度加快 |
| 💀 结束 | 撞墙或撞自己游戏结束 |
| 🔄 重玩 | 点击"重新开始"按钮 |

---

## ⚠️ 常见问题

### Q1: 导入项目后显示空白？
**A**: 检查 `app.json` 中的 `pages` 路径是否正确，确保 `pages/index/index` 存在。

### Q2: 无法预览？
**A**: 
- 确保已绑定开发者（在小程序后台添加）
- 检查微信版本是否支持
- 尝试重启开发者工具

### Q3: 触摸控制不灵敏？
**A**: 调整 `index.js` 中的滑动阈值 `minSwipeDistance`（默认 30px）。

### Q4: 没有 AppID 能运行吗？
**A**: 可以！选择"测试号"即可在开发者工具中运行和预览，但无法正式发布。

---

## 📱 真机预览步骤

1. 在开发者工具点击 **"预览"**
2. 生成二维码
3. 用微信扫描二维码
4. 游戏在手机上打开
5. 滑动屏幕控制蛇

---

## 🔗 相关资源

- [微信小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [微信开发者工具下载](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
- [小程序注册指南](https://developers.weixin.qq.com/miniprogram/introduction/)

---

*创建时间：2026-03-17*
*项目位置：/root/.openclaw/workspace/snake-wechat-miniprogram/*
