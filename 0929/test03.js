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

console.log(
    roleList.filter(item => !selectedRoleList.some(item2 => item2.id == item.id))
);

console.log(
    selectedRoleList.map(item => item.id)
);