# mysql

### 安装

- 下载
  - 由于mysql官网比较卡，可以通过国内镜像进行下载
  - 网址：http://mirrors.sohu.com/mysql/MySQL-8.0/
  - Ctrl + F 输入 winx64 查找对应版本

- windows

  - msi格式

    - 直接点击安装，由于需要做各种选择比较麻烦
    - 具体安装步骤访问菜鸟教程https://www.runoob.com/w3cnote/windows10-mysql-installer.html

  - zip格式

    - 下载后解压到指定目录

      - 比如解压到`C:/web/mysql-8.0-1.1`

    - 创建my.ini目录

      - 粘贴内容（**my.ini的文本格式是ansi**）

      ```ini
      [mysqld]
      # 设置3306端口
      default_authentication_plugin=mysql_native_password
      port=3306
      # 设置mysql的安装目录
      basedir=D:\mysql-8.0.11-winx64
      # 设置mysql数据库的数据的存放目录
      datadir=D:\mysql-8.0.11-winx64\data
      # 允许最大连接数
      max_connections=200
      # 允许连接失败的次数。这是为了防止有人从该主机试图攻击数据库系统
      max_connect_errors=10
      # 服务端使用的字符集默认为UTF8
      character-set-server=utf8
      # 创建新表时将使用的默认存储引擎
      default-storage-engine=INNODB
      # 默认使用“mysql_native_password”插件认证
      default_authentication_plugin=mysql_native_password
      [mysql]
      # 设置mysql客户端默认字符集
      default-character-set=utf8
      [client]
      # 设置mysql客户端连接服务端时默认使用的端口
      port=3306
      default-character-set=utf8
      ```

    - 修改内容

      - 将安装目录修改成具体的解压目录
      - 将存放目录修改成具体的存放目录（如果没有data文件夹，需创建）

    - 输入命令语句打印初始密码

      - `mysqld --initialize --console`
      - 记下初始密码（后续登陆要用）

    - 安装并启动

      - 安装：`mysqld --install`
      - 启动：`net start mysql`
      - 登陆（输入初始密码）：`mysql -u root -p`
      - 修改密码
        - `alter user 'root'@'localhost' identified with mysql_native_password by 'root';`
        - `flush privileges;`

  - 下载navicat进行数据库连接

    - navicat可以进行可视化数据库操作

- linux

  - 可参考菜鸟教程

  

### 使用

#### 命令行

#### navicat

- 新建数据库
  - 字符集选择（一般为utf8mb4）
  - 排序规则选择（一般为utf8mb4_general_ci）
- 创建表
  - 默认为 0
  - timestamp设置自动获取时间为 CURRENT_TIMESTAMP

### sql语句

**表名最好用``符号括起来，这是由于表名有可能是sql语句保留关键字**

- 登陆
  - `mysql -u root -p`
  - 输入密码（如）：`root`

- 数据库

  - 显示：`show databases;`
  - 使用：`use databases;`

- 表

  - 显示：`show tables;`
  - 显示单个表（内容）：`select * from table_name`
  
- 基本的sql语句

  - 选择语句

  - ```text
    select column_name,column_name from table_name where column_name operator value
    ```

  - select（选择），from（后面跟表格），where（满足条件）

  - 插入语句

  - ```text
    # 无需指定插入数据的列名
    insert into table_name values (values,values2,values3)
    ```

  - ```text
    # 指定插入数据的列名
    insert into table_name (values) values (values,values2,values3)
    ```

  - 更新语句

  - ```text
    update table_name set column1=value1,column2=value where some_column=some_value
    ```

  - **一定要注意后面的条件语句，如果没有将更新表格所有数据**

  - 删除语句

  - ```text
    delete from table_name where some_column=some_value
    ```

  - **同样需要注意后面的条件语句**

  - 如果表和表相互关联需要关闭约束
  
  - ```javascript
    SET foreign_key_checks = 0; // 先设置外键约束检查关闭
    delete from table_name where some_column=some_value // 删除表中数据
    SET foregin_key_checks = 1; // 开启外键约束检查，以保持表结构完整性
    
    SELECT @@foreign_key_checks; // 查询外链约束是否关闭 0是关闭 1是打开
    ```
  
  - 
  
  


### 在express中的使用

- 使用npm包管理工具进行安装
  
- `npm install mysql `
  
- 与mysql进行连接

  - 直接连接

    - ```javascript
      let mysql = require('mysql')
      let connection = mysql.createConnection({
          host:'localhost',
          user:'root',
          password:'root',
          database:'music'
      })
      
      connection.connect() // 01.连接数据库
      
      connection.query('SELECT 1 + 1 AS solution',function(error,results,fields){ // 02.输入sql语句
          if (error){
              throw error
          }
          console.log('The solution is:',results[0].solution)
      })
      
      connection.end() // 03.关闭连接
      ```

      

  - 创建连接池

    - 直接**使用query进行查询和获取connection进行查询的区别**

    - 如果使用query进行查询，后续的query查询可能使用不同的连接并行运行。

    - ```javascript
      // 直接使用sql语句进行连接
      let mysql = require('mysql')
      let pool = mysql.createPool({
          connectionLimit:10,
          host:127.0.0.1,
          user:'root',
          password:'root',
          database:'music'
      })
      pool.query('SELECT 1 + 1 AS solution',function(error,results,fields){
          if(error){
              throw error
          }
          console.log('the solution is:',results[0].solution)
      })
      ```
      
    - ```javascript
      // 使用getConnection()
      let mysql = require('mysql')
      let pool = mysql.createPool(……)
      
      pool.getConnection(function(err,connection){
          if(err){
              throw err
          }
        connection.query('SELECT something FROM sometable',function(error,results,fields){
              // when done with the connection, relase it
              connection.release()
              
              // Handle error after the release
              if(error){
                  throw error
              }
              
              // Don't use the connection here, it has been returned to the pool.
          })
      })
      ```
      
      

    

- mysql直接连接和连接池的区别
  
  - 数据库频繁建立、关闭连接会极大的降低性能，所以在数据库内部建立一个连接池（负责维护一定量的数据库连接），这样可以避免性能上的消耗。