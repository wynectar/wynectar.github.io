call、apply、bind我们会经常听到，但是他们究竟是做什么的呢，怎么去使用它们，它们之间又有何差别呢？让我们来慢慢的揭开它们神秘的面纱。

# call、apply、bind使用和区别

## 作用

它们的作用就是：改变函数执行时的上下文，即改变函数运行时的this指向。

## 使用场景

### 将伪数组转化为数组

js中的伪数组(例如通过document.getElementsByTagName获取的元素、含有length属性的对象)具有length属性，并且可以通过0、1、2…下标来访问其中的元素，但是没有Array中的push、pop等方法。利用call，apply来转化成真正的数组，然后使用数组方法。

假如有三个dom节点，如下：

```html
<div class="div1">1</div>
<div class="div1">2</div>
<div class="div1">3</div>
```

那么我们可以这样处理：

```js
let div = document.getElementsByTagName('div');
console.log(div); // HTMLCollection(3) [div.div1, div.div1, div.div1] 里面包含length属性

let arr2 = Array.prototype.slice.call(div);
console.log(arr2); // 数组 [div.div1, div.div1, div.div1]
```

### 数组拼接，添加

```js
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

//数组的concat方法：返回一个新的数组
let arr3 = arr1.concat(arr2);
console.log(arr3); // [1, 2, 3, 4, 5, 6]
console.log(arr1); // [1, 2, 3] 不变
console.log(arr2); // [4, 5, 6] 不变

// 用 apply方法
[].push.apply(arr1, arr2); // 给arr1添加arr2
console.log(arr1); // [1, 2, 3, 4, 5, 6]
console.log(arr2); // 不变
```

### 利用call和apply做继承

```js
function Animal(name) {
  this.name = name;
  this.showName = function () {
    console.log(this.name);
  };
}

function Cat(name) {
  Animal.call(this, name);
}

// Animal.call(this) 的意思就是使用this对象代替Animal对象，那么
// Cat中不就有Animal的所有属性和方法了吗，Cat对象就能够直接调用Animal的方法以及属性了
var cat = new Cat('TONY');
cat.showName(); //TONY
```

## 区别

他们俩之间的差别在于参数的区别，call和apply的第一个参数都是要改变上下文的对象，而call从第二个参数开始以参数列表的形式展现，apply则是把除了改变上下文对象的参数放在一个数组里面作为它的第二个参数。

```js
let arr1 = [1, 2, 19, 6];
//例子：求数组中的最值
console.log(Math.max.call(null, 1, 2, 19, 6)); // 19
console.log(Math.max.call(null, arr1)); // NaN
console.log(Math.max.apply(null, arr1)); //  19 直接可以用arr1传递进去
```

# 总结

根据自己的需求，合理的去使用它们。
