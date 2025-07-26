# 使用GitHub Pages托管博客或在已托管的情况下修改博客地址

## 步骤1：配置自定义域名
登录到你的GitHub账户。

导航到你的仓库（Repository）。

点击“Settings”（设置）。

在左侧菜单中找到“Pages”部分。

在“Custom domain”部分，输入你的自定义域名，然后点击“Save”（保存）。


mingxixiugai
Settings - Account - Change username

新建仓库 New repository. 创建新的 newusername.github.io 仓库


echo "# wynectar.github.io" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/wynectar/wynectar.github.io.git
git push -u origin main



git remote add origin https://github.com/wynectar/wynectar.github.io.git
git branch -M main
git push -u origin main