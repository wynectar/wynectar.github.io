# 如何使用GitHub Pages托管博客

## 配置自定义域名

- 登录到你的GitHub账户。
- 点击“Settings”（设置）。
- 点击“Account”（账户）。
- 设置 username 或 Change username
- 新建仓库 New repository. 创建新的 newusername.github.io 仓库

## 创建gh-pages

新建仓库后，会有一个main分支，此时我们需要再创建一个分支gh-pages（或者自己喜欢的分支名字）

## 设置博客使用分支

- 进入新的 newusername.github.io 仓库
- 选择 “Settings”
- 选择 “Branch” 中新建的分支，如gh-pages

## 创建一个博客文件，如blog，并关联此项目

```bash
git init
git add .
git commit -m "first commit"
git remote add origin https://github.com/newusername/newusername.github.io.git
git push -u origin main
```

## 把blog项目打包后的dist文件，推送到gh-pages分支

如果`gh-pages`分支有问题可先删除再创建，删除命令

```bash
git push origin --delete gh-pages  # 删除远程分支
git branch -D gh-pages             # 删除本地分支
```

基于main分支创建`gh-pages`分支

```bash
git subtree split --prefix dist -b gh-pages
git push origin gh-pages
```

把dist文件推送到main分支后，再把dist推送到gh-pages

```bash
git subtree push --prefix dist origin gh-pages  # 无冲突
git push origin `git subtree split --prefix dist main`:gh-pages --force  # 有冲突
```
