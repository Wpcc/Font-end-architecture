# Git

### 学习文档

https://git-scm.com/book/en/v2

### 起步

![git模型](./img-git/git.png)



git将文件的存储划分为三个区域，分别为**本地的工作区**、**本地的版本区（其中版本区又划分出暂存区与主存区）**、以及**远程主机上的origin区**。

为什么会额外地划分一个暂存区？

类似于购物网站中的收藏夹，当我们在工作区修改、更新大量的文件时，而我们又不能确定哪些文件是确定修改的，此时暂存区就彰显了它的作用所在，它可以将确定修改的文件集合然后一次提交。

### 下载

通过上面的链接下载 git，通常会带有 git 中的 bash 窗口，通过 bash 窗口配置用户身份信息。

```shell
git config --user.name 'zhangsan'
git config --user.email 'youremail@example.com'
```

### 建立连接

git 本地与远程需要建立 SSH 密钥连接。类似于口令，远程与本地需要密码才能安全对接。

```shell
ssh-keygen -t rsa -C 'youremail@example.com'    创建本地密钥
cat ~/.ssh/id_rsa.pub       查看本地密钥
```

将命令行密钥复制后粘贴到远程github创建的密钥中，远程密钥在settings/SSH and GPG keys中创建，至此整个口令完成。

### 常用命令语句

```shell
### 将文件添加到暂存区

git add filename # 单独提交文件
git add -A # 提交所有变化
git add -u  # 提交被修改（modified）和被删除（deleted）文件，不包括新文件（new）
git add . # 提交新文件（new）和被修改的（modefied）文件，但不包括被删除（deleted）文件

git status # 查看本地工作区与暂存区的差别

git commit -m "修改了一个bug" # 将文件提交到主存区并留言
git commit -a -m "修改了一个bug" # 将文件直接提交并留言

git push # 将文件提交到远程主机，第一次需要配置远程主机名

git remote rm origin # 删除远程仓库
```

### 案例

**第一次提交步骤：**

- 创建本地文件，对该文件添加 .git 控制

```shell
git init
```

- 将该文件添加到本地仓库

```shell
git add -A
git commit -m"第一次提交文件"
```

- 创建远程仓库，生成SSH密钥，并与本地仓库建立连接。

```shell
git remote add origin yourlibarary@example.com
```

- 提交

```shell
git push -u origin master
```

**之后提交步骤：**

```shell
git add -A
git commit -m"第二次提交文件"
git push
```

### 分支

- 拉取分支

```shell
git fetch
```

- 查看分支

```shell
git branch -a
```

- 切换分支（dev为分支名）

```shell
git checkout dev
```



### .gitignore文件

该文件用来控制项目中的上传文件。如 node_modules

- 使用说明
  - https://blog.csdn.net/jiandan1127/article/details/81205530

### 常见问题

- 拒绝访问：permission denied(public key) ?

  - 要么本地没有远程密钥（通过命令行`ssh -T git@github.com`可以查看是否存在），若存在将密钥复制到远程密钥中，若不存在通过`ssh-keygen -t rsa -C 'youremail@example.com'`创建。

  - 也可以通过`cat ~/.ssh/id_ras.pub`查看密钥在本地的绝对路径，一般位于：c:/administrator/.ssh文件下，其中id_rsa.pub是公钥，id_rsa是私钥

- 如果子目录存在.git文件，那么提交到github中的文件为空。

  - 如果依旧不行，那证明主目录中的.git已经默认忽略子目录了。这个时候可以删除主目录的.git文件，然后重新与远程仓库建立连接。

    由于远程仓库原本已经有了本地连接，此刻需要将连接覆盖掉。

     `git push origin master -f`