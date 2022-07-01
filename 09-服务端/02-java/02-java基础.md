# Java基础

## 基本数据类型

- 整数
  - byte
  - short
  - int
  - long
- 浮点数
  - float
  - double
- 字符
  - char
- 布尔
  - boolean

随便写的整数是int类型，加上L/l就是long类型的数据。

随便写的小数默认是double类型，加上F/f就是float类型。

## 类型转换

- 类型范围小的变量，可以直接赋值给类型范围大的变量。
- 最终类型由表达式中的最高类型决定的
- **byte / short / char在表达式中的运输是当int类型计算的**

```java
byte i = 10;
byte j = 20;
int k = i + j
```

### 强类型转换

数据类型 变量2 = （数据类型）变量1

```java
int a = 20;
byte b = (byte)a;
```

快捷键：alt + enter

浮点数转换成整数，会丢弃小数部分。

## 快捷键

`ctrl + alt + r`:

- 选中代码块，会自动出现条件判断语句