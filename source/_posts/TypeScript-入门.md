---
title: TypeScript 入门
description: 'TypeScript 入门'
abbrlink: 8eff68f4
date: 2017-08-12 15:13:38
tags:
    - 前端
    - TypeScript
categories:
    - 技术
---


# TypeScript入门

## 简介

JavaScript是一门弱类型语言，没有类型检测，这让JavaScript很灵活，但也更容易出错

> TypeScript是一种由微软开发的自由和开源的编程语言。它是JavaScript的一个超集，而且本质上向这个语言添加了可选的静态类型和基于类的面向对象编程。  

## 网站
> 官网
[TypeScript](http://www.typescriptlang.org/)
> 中文文档
[tslang](https://www.tslang.cn/index.html)
> 查看编译后的结果
[typescriptlang](http://www.typescriptlang.org/play/index.html)

## 很多项目开始使用TypeScript
> Angular
<div class="github-widget" data-repo="angular/angular"></div>

> VSCode
<div class="github-widget" data-repo="Microsoft/vscode"></div>

> RxJS
<div class="github-widget" data-repo="Reactive-Extensions/RxJS"></div>

### 安装

```
npm install -g typescript
```

### 安装完后运行 tsc -v 查看是否正确安装
```
tsc -v
Version 2.4.2
```

### 查看帮助

tsc -h或tsc --help 查看帮助

```
$ tsc -h
Version 2.4.2
Syntax:  tsc [options] [file ...]

Examples: tsc hello.ts
          tsc --outFile file.js file.ts
          tsc @args.txt
Options:
...
```

### 配置文件

生成默认的配置文件 tsconfig.json

```
tsc init 

```

- 配置es6


![image.png](http://upload-images.jianshu.io/upload_images/3563580-084ac9734f4aceab.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 支持 TypeScript 的文本编辑器和IDE

通过本身或插件支持TypeScript的语法、智能提示、纠错等

- VSCode 微软开发的轻量级编辑器，内置支持TypeScript
- Sublime Text 有相关插件
- WebStorm 新版内置支持TypeScript
- 其他包括Vim，Atom，Emacs等

### 将TypeScrip编译成JavaScript

TypeScript的文件类型是.ts文件或JSX中的.tsx文件，不能直接运行在浏览器中，需要编译成.js文件

方法：
1.    用命令行工具进行编译

    ```

    Syntax:  tsc [options] [file ...]

    Examples: tsc hello.ts

              tsc --outFile file.js file.ts

              tsc @args.txt

    ```

    最后一个的作用是从一个文件中插入命令行选项和文件

    ```

    @<file>    Insert command line options and files from a file.

    ```

2.    在VSCode 或其他文本编辑器和IDE上操作

3.    使用自动化构建工具，如 gulp， webpack等

### 介绍一下第一种方法

下面的命令行把 TypeScript 文件 main.ts编译为 JavaScript 版本的 main.js。如果 main.js 已经存在的话会被覆盖。

```
tsc main.ts
```

可以同时编译多个文件

```
tsc main.ts other.ts

tsc *.ts
```

还可以通过--watch或-w来自动编译(修改后能自动转成.js文件)

```
tsc main.ts --watch
```

### 静态类型

TypeScript可以声明变量类型，这样编译器就可以确保赋值时不会产生类型错误
如果省略了类型声明，TypeScript 将会从代码中自动推测出正确的类型。

在变量，函数声明时可以定义自己的类型

```
var burger: string = 'hamburger',    // String 
    calories: number = 300,          // Numeric
    tasty: boolean = true;            // Boolean

function speak(food: string, energy: number): void {
  console.log("Our " + food + " has " + energy + " calories.");
}

speak(burger, calories);
```

编译后变量声明都会被移除

```
var burger = 'hamburger',
    calories = 300, 
    tasty = true; 

function speak(food, energy) {
    console.log("Our " + food + " has " + energy + " calories.");
}

speak(burger, calories);
```

如果输入的类型有错，TypeScript会有代码警告
但还是会转成js文件

ts文件

```
var carNum: Number = '10'
```

```
$ tsc err.ts --watch
err.ts(1,5): error TS2322: Type '"10"' is not assignable to type 'Number'.
10:36:46 - Compilation complete. Watching for file changes.
```

js文件

```
var carNum = '10';
```

### 数据类型
- Number ( 数值 ) - 包括整型，浮点型等

```
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

- String （字符串）- 包括单双引号的字符串

```
let color: string = "blue";
color = 'red';
let sentence: string = `Hello, my name is ${ fullName }.
I'll be ${ age + 1 } years old next month.`;
```

- Boolean （布尔）- true ,false, 不可用其他类型如数字, 空字符串，否则会报错 

```
let isDone: boolean = false
```

- Array （数组）- 有两种语法：my_arr: number[ ]或者my_arr: Array<number>
     
```
let list: number[] = [1, 2, 3]

let list: Array<number> = [1, 2, 3]
```


- Tuple ( 元组 ) - 数组中包含不同的类型，有顺序


```
let x: [string, number];
x = ["hello", 10]; // OK
x = [10, "hello"]; // Error
```

使用不是该数据类型的方法会报错

```
console.log(x[0].substr(1)); // OK
console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'
```

新赋值的类型必须是定义时规定的类型

```
x[3] = "world"; // OK, 'string' can be assigned to 'string | number'

console.log(x[5].toString()); // OK, 'string' and 'number' both have 'toString'

x[6] = true; // Error, 'boolean' isn't 'string | number'
```

- Enum （枚举类型）- 它用于声明一组命名的常数，当一个变量有几种可能的取值时，可以将它定义为枚举类型。

让代码更有语义化,可读性

```
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```

枚举类型的数字默认从 0 开始，可以自己设置

```
enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green;

enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;
```

当不知道enum类型的第N项是什么名称时，可以用N来代替

```
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];

alert(colorName);
```

```
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
})(Color || (Color = {}));
var colorName = Color[2];
alert(colorName);
```

- Any （任意）- 任何类型都可以（Never类型除外）

关闭类型检查

```
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
```

```
let notSure: any = 4;
notSure.ifItExists(); // okay, ifItExists might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)

let prettySure: Object = 4;
prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.
```

```
let list: any[] = [1, true, "free"];

list[1] = 100;
```

- Void （空）- 用在不返回任何值的函数中

```
function warnUser(): void {
    alert("This is my warning message");
}
```

可以用来标识 undefined 和 null

```
let unusable: void = undefined;
```

- Null and Undefined

```
let u: undefined = undefined;
let n: null = null;
```

默认为其他类型的亚类型，就是可以匹配其他类型
使用 --strictNullChecks 标识，就只匹配 null 、undefined、void
可以使用 string | null | undefined 类型来只匹配 string 、 null 、 undefined三种类型

> 官方鼓励使用--strictNullChecks

- Never - 表示值从未发生

Any类型不能匹配Never

```
// Function returning never must have unreachable end point
function error(message: string): never {
    throw new Error(message);
}

// Inferred return type is never
function fail() {
    return error("Something failed");
}

// Function returning never must have unreachable end point
function infiniteLoop(): never {
    while (true) {
    }
}
```

- Type assertions

“angle-bracket” syntax

```
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
```

as -syntax

```
let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;

```

一般情况下，两种写法等价，但在JSX中，只能用 as -style

> 官方文档中关于数据类型的介绍[Basic Types](http://www.typescriptlang.org/docs/handbook/basic-types.html)

### Interfaces 接口

接口会根据一个对象是否符合某种特定的数据结构来进行类型检查

只在开发是有效，编译后删除

```
interface Food {
    name: string;
    calories: number;
}

function speak(food: Food): void{
  console.log("Our " + food.name + " has " + food.calories + " calories.");
}

var ice_cream = {
  name: "ice cream", 
  calories: 200
}

speak(ice_cream);
```

属性的顺序并不重要。我们只需必要的属性存在并且是正确的类型。如果哪里有遗漏，类型错误，或者命名不同的话，编译器都会报警告信息。

```
interface Food {
    name: string;
    calories: number;
}

function speak(food: Food): void{
  console.log("Our " + food.name + " has " + food.calories + " grams.");
}

//将name改为nmae
var ice_cream = {
  nmae: "ice cream", 
  calories: 200
}

speak(ice_cream);
```

```
main.ts(16,7): error TS2345: Argument of type '{ nmae: string; calories: number; } 
is not assignable to parameter of type 'Food'. 
Property 'name' is missing in type '{ nmae: string; calories: number; }'.
```

接口可以在属性后面添加？表示可选
可以添加[propName:  类型] : any 表示可以添加任何某种类型的属性

```
interface Person {    name: string;
    age?: number;
    [propName: string]: any;
}

const preson: Person = { name: 'Tom', age: 20}
const student: Person = { name: 'Tom'}
```

- 类实现接口

关键字 implements

```
interface ClockInterface {
    currentTime: Date;
}

class Clock implements ClockInterface {
    currentTime: Date;
    constructor(h: number, m: number) { }
}
```

```
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}

class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}
```

> 官方文档有更详细的介绍[interfaces](http://www.typescriptlang.org/docs/handbook/interfaces.html)

### 类

包括了构造器、继承，抽象类，接口，构造函数、setters、getters、public、private、protected、readonly、static 等

ES6中也有实现
- 属性
默认为public
private 只有自己可以用
protected 自己和子类可用
readonly 只读(原理 object.freeze)
- 抽象类 不能实例化

实现继承

```
class Menu {
  // Our properties:
  // By default they are public, but can also be private or protected.
  items: Array<string>;  // The items in the menu, an array of strings.
  pages: number;        // How many pages will the menu be, a number.

  constructor(item_list: Array<string>, total_pages: number) {
    // The this keyword is mandatory.
    this.items = item_list;    
    this.pages = total_pages;
  }

  // Methods
  list(): void {
    console.log("Our menu for today:");
    for(var i=0; i<this.items.length; i++) {
      console.log(this.items[i]);
    }
  }

} 

// Create a new instance of the Menu class.
var sundayMenu = new Menu(["pancakes","waffles","orange juice"], 1);

// Call the list method.
sundayMenu.list();
```

```
class HappyMeal extends Menu {
  // Properties are inherited

  // A new constructor has to be defined.
  constructor(item_list: Array<string>, total_pages: number) {
    // In this case we want the exact same constructor as the parent class (Menu), 
    // To automatically copy it we can call super() - a reference to the parent's constructor.
    super(item_list, total_pages);
  }

  // Just like the properties, methods are inherited from the parent.
  // However, we want to override the list() function so we redefine it.
  list(): void{
    console.log("Our special menu for children:");
    for(var i=0; i<this.items.length; i++) {
      console.log(this.items[i]);
    }

  }
}

// Create a new instance of the HappyMeal class.
var menu_for_children = new HappyMeal(["candy","drink","toy"], 1);

// This time the log message will begin with the special introduction.
menu_for_children.list();
```

> 阅读官方文档，获得更多信息[classes](http://www.typescriptlang.org/docs/handbook/classes.html)

### 泛型

泛型是允许同一个函数接受不同类型参数的一种模板。相比于使用 any 类型，使用泛型来创建可复用的组件要更好，因为泛型会保留参数类型。

```
function genericFunc<T>(argument: T): T[] {    
  var arrayOfT: T[] = [];    // Create empty array of type T.
  arrayOfT.push(argument);  // Push, now arrayOfT = [argument].
  return arrayOfT;
}

var arrayFromString = genericFunc<string>("beep");
console.log(arrayFromString[0]);        // "beep"
console.log(typeof arrayFromString[0])  // String

var arrayFromNumber = genericFunc(42);
console.log(arrayFromNumber[0]);        // 42
console.log(typeof arrayFromNumber[0])  // number
```
- 带泛型的函数类型

```
let f: () => any = function() {}

let f: <T>(arg: T) => T = function() {}
```
- 带泛型的接口

```
interface Gen<T> {    (arg: T) : T
}

function fn<T>(arg: T): T {
    return arg;
}

let id: Gen<number> = fn;

Gen(2)
```
- 带泛型的类 

```
class Gen<T> {    value: T
    add: (x: T, y: T) => T
}

let myGenNum = new Gen<number>()

myGenNum.value = 0
myGenNum.add = (x, y) => x + y

myGenNum.add(2,3)
```
- 泛型约束

```
interface Length {    length: number
}

function fn<T extends Length>(arg: T): T {
    console.log(arg.length)
    return arg
}

fn<string>("hello")

```

> 官方文档介绍了更多关于泛型类，泛型类与接口绑定等例子   
[generics](http://www.typescriptlang.org/docs/handbook/generics.html)

### 函数

```
function add(x: number, y: number): number {
    return x + y;
}

let myAdd = function(x: number, y: number): number { return x+y; };
```
- 箭头函数

```
// myAdd has the full function type
let myAdd = function(x: number, y: number): number { return  x + y; };

// The parameters 'x' and 'y' have the type number
let myAdd: (baseValue:number, increment:number) => number =
    function(x, y) { return x + y; };
```

参数可选

```
function buildName(firstName: string, lastName?: string) {
    // ...
}
```

剩余参数

```
function buildName(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
```

> 官方文档[functions](http://www.typescriptlang.org/docs/handbook/functions.html)

### 高级类型

- 联合

```
function padLeft(value: string, padding: string | number) {
    // ...
}

let indentedString = padLeft("Hello world", true); // errors during compilation

```

> 官方文档[Advanced Types](http://www.typescriptlang.org/docs/handbook/advanced-types.html)

### 模块化

如：require.js （AMD规范）

exporter.ts
```
var sayHi = function(): void {
    console.log("Hello!");
}

export = sayHi;
```

importer.ts
```
import sayHi = require('./exporter');
sayHi();
```

引入require.js，查看官方文档[requirejs](http://requirejs.org/docs/start.html#add)

```
tsc --module amd *.ts
```

> 更多模块化的内容，可查看官方文档[modules](http://www.typescriptlang.org/docs/handbook/modules.html)

### 第三方声明文件

声明文件用来是说明第三方JavaScript库是否和TypeScript兼容
一个声明文件包含.d.ts扩展名和关于该库的多种信息，还有API

声明文件通常是手写的，但也可以用其他人写好的
[DefinitelyTyped](http://definitelytyped.org/)
- The repository for high quality TypeScript type definitions
也有一个用来管理 TypeScript 定义的 Node.js 流行模块，叫 Typings。

> 官方文档[introduction](http://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)

## 参考资料
**三十分钟学会TypeScript**: http://web.jobbole.com/87535/
**官方文档**: http://www.typescriptlang.org/docs/home.html
**中文文档**: https://www.tslang.cn/index.html


