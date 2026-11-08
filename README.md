# 用户管理后台（Vue 3）

一个用 Vue 3 全家桶实现的后台管理面板练手项目：用户列表、搜索、分页、详情、新增，共 5 个页面路由。
数据来自 [JSONPlaceholder](https://jsonplaceholder.typicode.com/) 这个公开假接口，不需要自建后端。

## 在线演示

- **演示地址**：https://vue-admin-panel-nu.vercel.app （部署在 Vercel，国内访问需外网环境）
- 国内备用：https://vue-user-panel.app.workbuddy.host/?sharecode=NSTDUHSJE3
- **源码仓库**：https://github.com/Ysolt-bit/vue-admin-panel
- <img width="946" height="522" alt="屏幕截图 2026-11-08 220102" src="https://github.com/user-attachments/assets/1cadc176-2cb8-4f79-b471-0c28a1102d82" />
<img width="544" height="422" alt="屏幕截图 2026-11-08 220120" src="https://github.com/user-attachments/assets/62f7b1b4-fe06-4b30-9432-2361719ae2be" />
<img width="509" height="472" alt="屏幕截图 2026-11-08 220156" src="https://github.com/user-attachments/assets/70795f8d-48eb-4825-92c3-26630e390a61" />


## 技术栈

| 类别 | 选择 |
| --- | --- |
| 框架 | Vue 3（`<script setup>` 组合式 API） |
| 构建工具 | Vite |
| 路由 | Vue Router 4（History 模式） |
| 状态管理 | Pinia |
| HTTP 请求 | axios（统一实例 + 请求/响应拦截器） |
| 样式 | 原生 CSS + `<style scoped>` + 媒体查询 |

## 功能

- **用户列表**：表格展示 10 条用户数据，含加载中 / 出错 / 空数据 / 正常四态
- **搜索**：按姓名实时过滤，大小写不敏感，关键词变化后自动回到第 1 页
- **分页**：每页 5 条，首页时「上一页」禁用、末页时「下一页」禁用
- **用户详情**：`/users/:id` 单独请求，同一路由切换 id 时数据跟着刷新，直接刷新页面也不丢
- **新增用户**：姓名必填、邮箱必填且校验格式，提交期间按钮禁用并显示「提交中…」
- **响应式适配**：375px 屏幕下导航折成两行、表格横向滚动、自动隐藏电话列

## 目录结构

```
src/
├── api/
│   ├── request.js        # axios 实例：baseURL、超时、请求/响应拦截器
│   └── user.js           # 用户相关接口：列表 / 详情 / 新增
├── components/           # 无路由的展示型组件
│   ├── EmptyState.vue    # 空状态提示
│   ├── PaginationBar.vue # 分页条
│   ├── SearchBar.vue     # 搜索框
│   └── UserTable.vue     # 用户表格
├── router/
│   └── index.js          # 5 条路由 + 根路径重定向
├── stores/
│   └── userStore.js      # 用户数据、loading、error、fetchUsers
├── views/                # 有路由的页面
│   ├── UserListView.vue  # 列表页（搜索 + 分页 + 四态）
│   ├── UserDetailView.vue# 详情页
│   ├── UserFormView.vue  # 新增用户表单页
│   └── AboutView.vue     # 关于页
├── App.vue               # 导航 + RouterView
├── main.js               # 挂载 App，注册 Pinia 与 Router
└── style.css
```

**分层判据**：`views` 放有地址的页面，`components` 放没有地址、只负责展示和触发事件的组件。

## 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器（默认 http://localhost:5173）
npm run dev

# 生产构建，产物在 dist/
npm run build
```

开发环境通过 `vite.config.js` 里的代理把 `/api` 转发到 `jsonplaceholder.typicode.com`，以避开跨域限制。

## 实现要点

### 1. 用环境变量区分开发与生产的接口地址

`vite.config.js` 里的 `server.proxy` **只在开发服务器上生效**，构建后的静态站点没有这层转发。所以 `api/request.js` 里按环境取不同的 `baseURL`：

```js
const request = axios.create({
    baseURL: import.meta.env.DEV ? "/api" : "https://jsonplaceholder.typicode.com",
    timeout: 5000
});
```

开发时走 `/api` 由 Vite 代理转发，生产时直连真实地址（该接口允许跨域）。

### 2. 数据放在 Pinia，切路由不丢

列表页挂载时先判断 `store.users.length === 0`，非空就不重复请求：

```js
onMounted(() => {
    if (store.users.length === 0) {
        store.fetchUsers();
    }
});
```

这样从列表进详情再返回，数据还在仓库里，不会重新发一遍请求。

### 3. 搜索用 computed，不用 watch

搜索结果是从「原始数据 + 关键词」算出来的派生值，没有自己的状态，所以用 `computed` 自动重算；`watch` 只用于「关键词变了之后重置页码」这种副作用。

关键词为空时直接返回原数组，不新建数组，避免无谓的 DOM 重建：

```js
const filtered = computed(() => {
    const k = keyword.value.trim().toLowerCase();
    if (!k) return store.users;
    return store.users.filter((u) => u.name.toLowerCase().includes(k));
});
```

### 4. 详情页用 `watch` + `immediate`

`/users/3` 改成 `/users/4` 时，命中的是同一条路由记录，组件实例会被复用、**不会重新挂载**，所以 `onMounted` 里的代码不会再执行。要让数据跟着 id 变化，必须监听 `route.params.id`，并加 `immediate: true` 保证首次进入也发请求：

```js
watch(
    () => route.params.id,
    (id) => { if (id) load(id); },
    { immediate: true }
);
```

### 5. 表格在窄屏的溢出处理

`<table>` 的宽度由内容决定，它永远不会溢出自己，所以直接给 `table` 写 `overflow-x` 不生效。做法是外面套一层宽度受父级约束的容器，再给表格设置 `min-width` 逼出溢出：

```css
.table-wrap { overflow-x: auto; }
.user-table { width: 100%; min-width: 560px; }
```

### 6. 响应式：优先让布局自己折，媒体查询只用于结构性差异

导航用 `flex-wrap: wrap` + `height: auto` 处理折行；表格用横向滚动代替逐列压缩；只有「窄屏隐藏电话列」这种结构性差异才用 `@media (max-width: 640px)`。

## 已知限制

- JSONPlaceholder 是只读假接口，新增用户会返回成功但**不会真的保存**，刷新后数据恢复原样
- 没有登录与权限控制，所有页面都可直接访问
- 窄屏采用「横向滚动 + 隐藏次要列」，没有做移动端卡片式布局
- 没有单元测试与端到端测试

## 可继续扩展的方向

- 表头点击排序、每页条数可选（5 / 10 / 20）
- 编辑与删除（`PUT` / `DELETE`）
- 表单校验抽成可复用的组合式函数
- 移动端改为卡片列表布局
