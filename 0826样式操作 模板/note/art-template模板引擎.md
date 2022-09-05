## 模板引擎art-template

模板引擎用于根据定义好的模板来批量生成HTML的一个工具

### 存在的问题

我们之前希望通过这个一个数据来动态的生成我们的网页结构

```javascript
var stus = [
  {
    stuName: "张三",
    sex: "女",
    age: 18,
    hobby: ["看书", "睡觉"]
  },
  {
    stuName: "李四",
    sex: "女",
    age: 22,
    hobby: ["看书", "睡觉"]
  }
  // ...这里还有很多
]
```

以前要实现这种动态数据的渲染，我们需要去遍历数据如何通过`createElement`来创建元素，如何去追加元素，这么做就很麻烦

```html
<body>
  <ul class="list"></ul>
</body>
<script src="./js/stus.js"></script>
<script>
  var list = document.querySelector(".list")
  stus.forEach(function (item, index) {
    var li = document.createElement("li")
    li.innerHTML = "姓名：" + item.stuName + "-----性别：" + item.sex;
    list.appendChild(li)
  })
</script>
```

### 模板的使用

前面说到了模板引擎就是根据一个定义好的摹本去批量的生成我们的HTML页面，这个固定的模板我们就叫他模板引擎

现在的模板引擎有很多

* `art-template`
* `ejs`
* `jade`
* `pug`
* `hbs`

本堂课我们以`art-template`为标准来学习，我们需要从网站上面下周这个程序库，然后引入到网页中

```html
<script src="./js/template-web.js"></script>
```

### 标准语法

`art-template`有两种语法，一种是标准语法，还有一种是简洁语法，现在我们先从标准语法开始

#### 定义模板

```html
<script type="type/html" id="temp1">
    <%for(var i = 0;i<arr.length;i++){%>
      <%if(arr[i].sex == '男') {%>
        <li>姓名：<%=arr[i].stuName%>------性别：<%=arr[i].sex%></li>
      <%}%>
    <%}%>
 </script>
```

在上面的模板定义里面，我们使用了`<%%>`这个符号，这个符号的作用就是在模板内部可以写`ECMAScript`代码，同时我们在这个符号里面写了一个`for`循环，同时我们也使用了一个`if`的条件判断语句

#### 使用模板

当我们在页面中引入了`template-web.js`这个文件后，他就会给我们一个方法，叫`template`，这个方法是让我们根据数据来批量的生成这个HTML标签

```html
<script src="./js/template-web.js"></script>
<script src="./js/stus.js"></script>
<script>
  var htmlStr = template("temp1", {
    arr: stus
  })
  var box = document.querySelector(".box")
  box.innerHTML = htmlStr
</script>
```

![image-20220826150348547](art-template%E6%A8%A1%E6%9D%BF%E5%BC%95%E6%93%8E.assets/image-20220826150348547.png)

### 简洁语法

这个语法使用起来非常简单，只需要记住几个命令即可

```html
<script type="type/html" id="temp1">
    {{each arr item index}}
      {{if item.sex == "男"}}
        <li>序号：{{index}}-----姓名：{{item.stuName}}-----性别：{{item.sex}}</li>
      {{/if}}
    {{/each}}
</script>
```

在上面的代码里面，我们可以看到，我们使用了`{{each}}`来进行遍历，使用了`{{if}}`来进行判断，我们可以得出一个结论`{{}}`内部就是我们的JS代码

### 案例

现在有一组，数据需要渲染，性别为男的文字颜色就渲染为蓝色，性别为女的文字颜色就渲染为红色

```javascript
var stus = [
  {
    stuName: "张三",
    sex: "女",
    age: 18,
    hobby: ["看书", "睡觉"]
  },
  {
    stuName: "李四",
    sex: "女",
    age: 22,
    hobby: ["看书", "睡觉"]
  }
  // ...这里还有很多
]
```

**第一种模板写法**

```html
<script type="type/html" id="temp1">
    {{each arr item index}}
      {{if item.sex == "男"}}
        <li class="blue"> 姓名：{{item.stuName}}-----性别：{{item.sex}}</li>
      {{else if item.sex == "女"}}
        <li class="red"> 姓名：{{item.stuName}}-----性别：{{item.sex}}</li>
      {{/if}}
    {{/each}}
</script>
```

**第二种模板写法**

```html
<script type="type/html" id="temp1">
    {{each arr item index}}
        <li style="color: {{item.sex=="男"?'blue':'red'}}"> 姓名：{{item.stuName}}-----性别：{{item.sex}}</li>
    {{/each}}
</script>
```

**第三种模板写法**

```html
<script type="type/html" id="temp1">
    {{each arr item index}}
        <li class="{{item.sex=="男"?'blue':'red'}}"> 姓名：{{item.stuName}}-----性别：{{item.sex}}</li>
    {{/each}}
</script>
```



同时我们也可以用上面的数据生成一个`table`，如下所示

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>模板引擎</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      list-style-type: none;
    }

    .container {
      width: 80%;
      margin: auto;
    }

    .title {
      text-align: center;
      margin: 20px 0;
    }

    .btn {
      padding: 6px 10px;
      border: none;
      color: #fff;
      border-radius: 3px;
    }

    .btn-del {
      background-color: red;
    }

    .btn-edit {
      background-color: orange;
    }

    .btn-add {
      background-color: lightseagreen;
    }

    .table1 {
      width: 100%;
      border: 1px solid black;
      border-spacing: 0;
    }

    .table1 td,
    .table1 th {
      text-align: center;
      border: 1px dotted black;
      height: 40px;
    }
  </style>
</head>

<body>
  <div class="container">
    <h2 class="title">学生信息列表</h2>
    <div class="btn-box">
      <button type="button" class="btn btn-add" onclick="showMask()">新增</button>
      <button type="button" class="btn btn-del">批量删除</button>
    </div>
    <table class="table1">
    </table>
  </div>

  <div class="mask">
    <form name="stuForm" class="stuForm">
      <div class="form-item">
        <span class="label">姓名</span>
        <input type="text" id="stuName" class="aaa">
      </div>
      <div class="form-item">
        <span class="label">性别</span>
        <select id="sex" class="aaa">
          <option value="男">男</option>
          <option value="女">女</option>
        </select>
      </div>
      <div class="form-item">
        <span class="label">年龄</span>
        <input type="number" id="age" class="aaa">
      </div>
      <div class="form-item">
        <span class="label">爱好</span>
        <input type="text" id="hobby" class="aaa">
      </div>
      <div class="form-item">
        <button type="button" class="btn btn-add" onclick="saveData()">保存</button>
        <button type="button" class="btn btn-del" onclick="closeMask()">取消</button>
      </div>
    </form>
  </div>
  <script type="type/html" id="stuTemp">
      <tr>
        <th><label><input type="checkbox">全选</label></th>
        <th>姓名</th>
        <th>性别</th>
        <th>年龄</th>
        <th>爱好</th>
        <th>操作</th>
      </tr>
      {{each stuArr item index}}
        <tr>
          <td><input type="checkbox"></td>
          <td>{{item.stuName}}</td>
          <td>{{item.sex}}</td>
          <td>{{item.age}}</td>
          <td>{{item.hobby.toString()}}</td>
          <td>
            <button type="button" class="btn btn-edit">编辑</button>
            <button type="button" class="btn btn-del">删除</button>
          </td>
        </tr>
      {{/each}}
    </script>
</body>
<script src="./js/template-web.js"></script>
<script src="./js/stus.js"></script>
<script>
  function renderHtml() {
    var htmlStr = template("stuTemp", {
      stuArr: stus
    })
    document.querySelector(".table1").innerHTML = htmlStr
  }
  renderHtml()
</script>

</html>
```

