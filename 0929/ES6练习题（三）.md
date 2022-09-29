## ES6练习题（三）

* 出题人：杨标
* 时间：2021年9月29日
* 内容：ECMAScript6
* 适用班级：H2204

-----

### 一、简答题

1. let、const、var定义变量的区别是什么？

   ```
   let 执行上下文中没有建立阶段，var有，只有执行阶段，不允许重复声明，var可以，形成块级作用域，var不会形成块级作用域
   
   const 关键字用于创建一个常量，声明时必须一并赋值，不允许被修改（锁栈）
   ```
   
2. promise分为几种状态？什么时候会进入catch方法？

   ```
   pending暂停 resolve/fulfill 成功  reject 失败,reject
   ```
   
3. 箭头函数和普通函数的区别是什么？

   ```
   普通函数的this指向当前作用域，而箭头函数指向上一级作用域，箭头函数只有一个参数时可以省略()括号，函数体只有一条语句时可以省略return和{}花括号
   ```
   
4. == 和=== 有什么区别?

   ```
   ==是抽象相等，数据类型不一样时会先尝试转换类型再检测，===是严格相等，数据类型会一起判断
   ```
   
5. Set和数组有什么区别？set中如何增加、删除元素？

   ```
   set是无序集合，数组是有序的，set只有值没有索引，并且值不允许重复，而数组有值和索引，并且值允许重复，set.add(),set.delete()
   ```
   
6. Map中如何设置元素，如何获取元素？

   ```
   map.set([k,v]);  map.get()
   ```
   
7. 如何在多个Promise执行完成之后做一些操作？多个Promise同时执行有一个执行完了就进行一些操作?

   ```
   利用promise.then()进行下一步操作
   ```

8. 如何获取对象的所有key值？

   ```javascript
   Object.keys(),Object.getOwnPropertyNames(),Object.getOwnSymbols()
   ```

9. ES6中如何实现类的继承？

   ```
   利用extends和super()
   ```

10. 类中static关键字有什么作用？

    ```
    用在变量上时，让用static的方法调用到该变量，用到方法上，可以让该方法不用实例化，只用类名。方法名就能调用
    ```

11. 类中的静态方法和普通方法有什么区别？如何定义静态方法？

    ```
    普通方法必须再实例化后才能被调用，而静态方法不需要， static method(){}
    ```

### 二、看程序写结果

1. 下图代码执行完成后打印的结果是？

   ```javascript
   const obj = {
       id:123,
       age:20,
       name:"cyrus",
       school:"河北科技大学"
   }
   let obj1 = {
       age:18,
       ...obj,
       name:"李四"
   }
   console.log(obj1.age); //20		
   console.log(obj1.id);  //123		
   console.log(obj1.name);   //cyrus
   ```

2. 下图代码打印的内容分别是什么？

   ```javascript
   const promise = new Promise((resolve, reject) => {
       console.log(1);
       resolve(3);		
       console.log(2);
       reject(4)		
   })
   promise.then((res) => {
       console.log(res);
   }).catch(err=>{
       console.log(err);
   })
   console.log(5); // 1 2 5 3
   
   ```

3. 下图打印的结果是什么？

   ```javascript
   let name = Symbol('name')
   let name1 = Symbol.for('name')
   console.log(name == name1);	false		
   ```

4. 下图打印的内容分别是什么？

   ```javascript
   function * gen(){
       let params = yield 2
       let params1 = yield 3
       let params2 = yield params1 + 6
       let params3 = yield 7
       return params2 * params + params3
   }
   let lt = gen();
   console.log(lt.next()); //{value:2,done:false}
   console.log(lt.next(3)); //{value:3,done:false}
   console.log(lt.next(lt.next(1).value); //{velue:7,done:false}
   console.log(lt.next(4)); //{value:7,done:true} 14
   ```

5. 下列代码的打印结果分别是什么

   ```javascript
   let obj = {name:"张三",age:16}
   let proxy = new Proxy(obj,{
       get(target,property){
           if(target.age < 18){
               return "未成年人"
           } 
           return target[property]
       },
       set(target,property,value){
           if(property == 'name'&&target.age< 18){
               console.log("未成年人不允许改名字");
           }
           target[property] = value
       }
   })
   console.log(proxy.name);//张三		
   proxy.name = "李四" //未成年人不允许改名字
   console.log(proxy.name); //李四
   proxy.age = 20 //
   console.log(proxy.name); //李四
   ```

### 三、编程题

1. 使用解构赋值，实现两个变量的值的交换。

   ```javascript
   let [a,b]=[1,2];
   [b,a] = [a,b];
   ```
   
2. 设计一个对象，键名的类型至少包含一个symbol类型，并且实现遍历所有key。

    ```javascript
      const s = {
       name: "123",
       sex: "男",
       [Symbol("pwd")]: "123456"
   }
    
   console.log([...Object.getOwnPropertyNames(s), ...Object.getOwnPropertySymbols(s)]);
   console.log(Reflect.ownKeys(s));
   ```
   
   **说明**：`Reflect.ownKeys()`是可以拿到`enumerable:false`及`Symbol()`的属性名的
   
3. 使用set实现数组去重

   ```javascript
   let arr = ["a", "b", "c", "a", "d", "c", "e", "f", "b"];
   let arr2 = Array.from(new Set(arr));
   ```
   
4. 说一下ES6的导入和导出模块(ESModule),在浏览器端去实现

   ```javascript
   //暂不完成
   ```
   
   **注意**： 这种`ESModule`模块化的写法，只支持`http`或`https`这种协议，不支持`file`的协议，所以网页是不能本地打开
   
5. 编程实现找到所有姓杨的人；找到所有包含天这个字的人；找到周芷若的id

   ```javascript
   const list = [
       {id:3,name:"张三丰"},
       {id:5,name:"张无忌"},
       {id:13,name:"杨逍"},
       {id:33,name:"殷天正"},
       {id:12,name:"赵敏"},
       {id:97,name:"周芷若"},
   ]
   
   console.log(list.filter(item => item.name.startsWith("杨")));
   console.log(list.filter(item => item.name.includes("天")));
   let zid = list.filter((item) => {
       return item.name == "周芷若"
   })
   console.log(zid[0].id);
   ```
   
6. 还是上面的那个数组，要求获取一个新的数组，数组中每一项的id\*2，并且增加updateTime属性，值为当前时间。

   ```javascript
   const list = [
       {id:3,name:"张三丰"},
       {id:5,name:"张无忌"},
       {id:13,name:"杨逍"},
       {id:33,name:"殷天正"},
       {id:12,name:"赵敏"},
       {id:97,name:"周芷若"},
   ]
   
   let newArr = [];
   for (let i of list) {
       let newObj = {};
       for (let j in i) {
           if (j == "id") {
               newObj[j] = i[j] * 2;
           } else {
               newObj[j] = i[j];
           }
       }
       newObj["updateTime"] = Date.now();
       newArr.push(newObj);
   }
   
   console.log(newArr);
   ```

### 四、上机题

1. 现在有用户的角色有数组，如：[{id:1,name:’经理’},{id:2,name:’员工’}]，用户已选择的数组[{id:2,name:’经理’}], 要求获取用户未选中的角色列表，和用户已选择的角色的id数组。（使用es6语法实现）map、filter、some

   ```javascript
   const roleList = [{
       id: 1,
       name: '老板'
   }, {
       id: 2,
       name: '经理'
   }, {
       id: 3,
       name: '运营总监'
   }, {
       id: 4,
       name: 'CEO'
   }, {
       id: 5,
       name: '销售'
   }, {
       id: 6,
       name: '实施'
   }, {
       id: 7,
       name: '程序员'
   }, {
       id: 8,
       name: 'UI工程师'
   }, {
       id: 9,
       name: '产品经理'
   }];
   // 用户已选择的数组
   const selectedRoleList = [{
       id: 2,
       name: '经理'
   }, {
       id: 3,
       name: '运营总监'
   }, {
       id: 6,
       name: '实施'
   }, {
       id: 7,
       name: '程序员'
   }, {
       id: 9,
       name: '产品经理'
   }];
   ```

   
   
   