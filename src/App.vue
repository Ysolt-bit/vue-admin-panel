<template>
  <header class="nav">
    <strong class="logo">管理面板</strong>
    <RouterLink to="/users">用户列表</RouterLink>
    <RouterLink to="/about">关于</RouterLink>
    <RouterLink to="/users/new">新增用户</RouterLink>
  </header>

  <main class="container">
    <RouterView />
  </main>
</template>

<style>
:root {
  --color-text: #1f2937;
  --color-muted: #6b7280;
  --color-border: #e5e7eb;
  --color-primary: #2563eb;
  --color-danger: #dc2626;
  --radius: 6px;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
}
* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: system-ui, -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif;
  color: #222;
}
.nav {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 0 20px;
  height: 56px;
  border-bottom: 1px solid #e5e5e5;
}
.logo { margin-right: 16px; }
.nav a { color: #555; text-decoration: none; }
.nav a.router-link-active { color: #3b82f6; font-weight: 600; }
.container { max-width: 960px; margin: 0 auto; }
@media (max-width: 640px){
  .nav {
    flex-wrap: wrap;
    gap: 12px;
    height: auto;
    padding: 8px 12px;
  }
  .logo { margin-right: 0; font-size: 15px; }
  .nav a { font-size: 14px; }
  .container { padding: 0 12px; }
}

</style>
