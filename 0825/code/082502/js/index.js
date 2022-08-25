function $(selector) {
  return document.querySelectorAll(selector)
}

/**
 * @type {Element}
 */
var table1 = $('.table1')[0]

/**
 * @param {Event} event
 */
table1.onclick = function (event) {
  // 处理兼容性
  event = event || window.event
  // 监听单行删除事件
  if (event.target.matches('.btn-del')) {
    event.target.parentElement.parentElement.remove()
  }

  // 监听选中如果表格内的所有被选中则全选也被选中
  if (event.target.matches('.ck')) {
    var flag = $('.ck').length == $('.ck:checked').length
    $('.ckAll')[0].checked = flag
  }
}

/**
 * @param {HTMLInputElement} obj
 * @desc 全选方法
 */
function ckAll(obj) {
  var ckList = $('.ck')
  ckList.forEach(function (item) {
    item.checked = obj.checked
  })
}

/**
 * @desc 打开弹窗
 */
function showMask() {
  var mask = $('.mask')[0]
  mask.classList.add('visible')
}

/**
 * @desc 关闭弹窗并且清空里的数据
 */
function closeMask() {
  var mask = $('.mask')[0]
  mask.classList.remove('visible')
  var stuName = $('#stuName')[0]
  var sex = $('#sex')[0]
  var age = $('#age')[0]
  var hobby = $('#hobby')[0]
  stuName.value = ''
  sex.value = '男'
  age.value = ''
  hobby.value = ''
}
/**
 * @desc 批量删除
 */
function delAll() {
  var ckChecked = $('.ck:checked')
  ckChecked.forEach(function (item) {
    item.parentElement.parentElement.remove()
  })
}

/**
 * @desc 保存数据
 */
function saveData() {
  var stuName = $('#stuName')[0]
  var sex = $('#sex')[0]
  var age = $('#age')[0]
  var hobby = $('#hobby')[0]
  var tr = document.createElement('tr')
  var td0 = document.createElement('td')
  var td1 = td0.cloneNode(true)
  var td2 = td0.cloneNode(true)
  var td3 = td0.cloneNode(true)
  var td4 = td0.cloneNode(true)
  var td5 = td0.cloneNode(true)
  td0.innerHTML = '<input type="checkbox" class="ck">'
  td5.innerHTML =
    '<button type="button" class="btn btn-edit">编辑</button><button type="button" class="btn btn-del">删除</button>'
  td1.innerHTML = stuName.value
  td2.innerHTML = sex.value
  td3.innerHTML = age.value
  td4.innerHTML = hobby.value
  tr.appendChild(td0)
  tr.appendChild(td1)
  tr.appendChild(td2)
  tr.appendChild(td3)
  tr.appendChild(td4)
  tr.appendChild(td5)

  table1.appendChild(tr)
  closeMask()
}
