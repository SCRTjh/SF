## ES6练习题（二）

* 出题人：杨标
* 时间：2022年9月29日
* 适用班级：H2204
* 主要内容：ECMAScript6

----

1. 说出至少5个ES6的新特性，并简述它们的作用。（简答题）

   >  这个题目多半会在面试的时候问
   >
   >  let 关键字用于创建一个变量，执行上下文中没有建立阶段，只有执行阶段，不允许重复声明，形成块级作用域
   >
   >  const 关键字用于创建一个常量，与let特点大致相同，声明时必须一并赋值，不允许被修改（锁栈）
   >
   >  解构赋值 用于简化数组、对象的赋值操作
   >
   >  箭头函数 解决es5中function的歧义性
   >
   >  class 可以更加便捷的创建对象与继承
   >
   >  Set集合 新数据类型  无序集合，只有值，没有索引，其值不允许重复，
   >
   >  Map哈希表 新数据类型 键值对集合，键(属性名)可以是任意类型，键不允许重复(后值覆盖前值)
   >
   >  ...运算符 可以遍历拥有iterable的数据
   >
   >  

2. 使用解构赋值，实现两个变量的值的交换（编程题）。

   ```javascript
   var a=0;
   var b=1;
   var [a, b] = [b, a];
   ```
   
3. 解释一下什么是暂时性死区？（简答题）

   ```javascript
   在不同上下文用let关键字声明的同名变量之间的区域称为暂时性死区，暂时性死区内不能调用声明的这个变量
   ```
   
4. 利用数组推导，计算出数组 [1,2,3,4] 每一个元素的平方并组成新的数组

   ```javascript
   [1, 2, 3, 4].map(item => item ** 2)
   ```

5. 用箭头函数的形式改写下面的代码。（ES5 to ES6改写题）

   ```javascript
   arr.forEach(function(v,i) {
       console.log(i);
       console.log(v);
   });
   arr.forEacg((v,i)=>{
       console.log(i);
       console.log(v)
   })
   ```

6. 设计一个对象**，**键名的类型至少包含一个symbol类型**，**并且实现遍历所有key。（编程题）

   ```javascript
   const a = {
       name:"123",
       sex:"男",
       [Symobol("pwd")]:"123456"
   }
   console.log([...Object.getOwnPropertyNames(a), ...Object.getOwnPropertySymbols(a)]);
   ```
   
7. 有一本书的属性为：{“name”:“《ES6基础系列》”, ”price”：56 }；要求使用Proxy对象对其进行拦截处理，name属性对外为“《ES6入门到懵逼》”,price属性为只读。（练习题）

   ```javascript
   let book_proxy = new Proxy((
       ()=>{
           return {
               name:"《ES6基础系列》",
               price:56
           }
       }
   )(),{
       get(target,p){
           if(p=="name"){
               return "《ES6入门到懵逼》"
           }else{
               return target[p]
           }
       },
       set(target,p,v){
           if(p=="price"){
               return;
           }else{
               target[p]=v;
           }
       },
       deleteProperty(target,p){
           if(p=="price"){
               return;
           }else{
               delete target[p];
           }
       }
   })
   ```
   
8. 关于Set结构，阅读下面的代码，回答问题**。（**代码阅读题**）。**

   ```javascript
   let s =new Set();
   s.add([1]);
   s.add([1]);
   console.log(s.size); //2	
   ```

   问：打印出来的size的值是多少？

9. 关于Map结构，阅读下面的代码，回答问题。（代码阅读题）

   ```javascript
   let map = new Map();
   map.set([1], "ES6系列");       
   let con = map.get([1]);        
   console.log(con); //undefined       
   ```
   
10. 定义一个类Animal，通过传参初始化它的类型，如：“猫科类”。它有一个实例方法：run，run函数体内容可自行定义。

    ```javascript
    class Animal{
        constructor(type,name,sex,age){
            this.type=type;
            this.name = name;
            this.sex = sex;
            this.age = age;
        } 
    
        run(){
            console.log("跑跑");
        }
    
    }
    ```
    
11. 基于上一题的Animal类，定义一个子类Cat并继承Animal类。初始化Cat类的昵称name和年龄age。并拥有实例方法eat，eat函数体内容可自行定义

    ```javascript
    class Cat extends Animal {
        constructor(name, sex, age) {
            super(name, sex, age)
        }
    
        eat() {
            console.log("吃东西");
        }
    
    
    }
    ```
    
    
    
    

