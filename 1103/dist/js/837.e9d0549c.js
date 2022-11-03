"use strict";(self["webpackChunkmovie_manager"]=self["webpackChunkmovie_manager"]||[]).push([[837],{9837:function(e,l,a){a.r(l),a.d(l,{default:function(){return B}});var t=a(3396),r=a(4870),s=a(9242),u=a(7139),n=a(250),d=a(2748),o=a(5499),i=a(2807),p=a(946),m=a(678);const c=e=>((0,t.dD)("data-v-6288c88f"),e=e(),(0,t.Cn)(),e),f={class:"flex flex-row justify-between"},g=c((()=>(0,t._)("span",null,"编辑影厅",-1))),v=(0,t.Uk)("返回列表"),w={class:"w-full mt-[-5px]"},_=(0,t.Uk)("添加一行"),h=(0,t.Uk)("复制一行"),x=c((()=>(0,t._)("img",{src:n,alt:""},null,-1))),A=[x],k=c((()=>(0,t._)("span",{class:"ml-[5px]"},"可选",-1))),W=c((()=>(0,t._)("span",{class:"ml-[5px]"},"空位",-1))),b={class:"site-list"},y=["onDrop"],C={key:0,src:n},U=(0,t.Uk)("保存数据"),D=(0,t.Uk)("返回列表");var I={__name:"EditHallInfo",setup(e){const l=(0,m.yj)(),a=(0,m.tv)(),n=(0,r.iH)({id:"",hall_name:"",tags:[],sites:"",address:""}),c=(0,r.iH)([]);(0,t.YP)((()=>c),((e,l)=>{n.value.sites=JSON.stringify(c.value)}),{deep:!0});const x={hall_name:[{required:!0,message:"请输入影厅名称",trigger:"blur"}],tags:[{required:!0,message:"请输入影厅标签",trigger:"blur"}],sites:[{required:!0,message:"请设计影厅座位",trigger:"blur"}],address:[{required:!0,message:"请输入影厅地址",trigger:"blur"}]},I=(0,r.iH)(null),V=(0,r.iH)(!1),H=()=>{V.value=!0,n.value.id=l.params.id,p.Z.hallInfo.findById(n.value.id).then((e=>{n.value=e.data,n.value.tags=e.data.tags.split(","),c.value=JSON.parse(e.data.sites)})).finally((()=>{V.value=!1}))};H();const B=()=>{c.value.push([])},Q=e=>{o.T.confirm("确定要删除这一行吗？","请确认",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{c.value.splice(e,1)}))},q=()=>{if(c.value.length>0){const e=c.value[c.value.length-1];c.value.push([...e])}else i.z8.error("请先添加一行")},K=(e,l)=>{e.dataTransfer.setData("site",l)},T=(e,l)=>{var a=e.dataTransfer.getData("site");c.value[l].push(+a)},Z=()=>{I.value.validate((e=>{e?E():i.z8.error("请将数据填写完整")}))},z=(0,r.iH)(!1),E=()=>{z.value=!0,p.Z.hallInfo.update(n.value.id,{...n.value,tags:n.value.tags.join(",")}).then((e=>{i.z8.success("数据保存成功"),a.replace({name:"HallInfoList"})})).finally((()=>{z.value=!1}))};return(e,l)=>{const a=(0,t.up)("router-link"),o=(0,t.up)("el-input"),i=(0,t.up)("el-form-item"),p=(0,t.up)("el-option"),m=(0,t.up)("el-select"),H=(0,t.up)("el-button"),E=(0,t.up)("el-button-group"),J=(0,t.up)("el-col"),O=(0,t.up)("el-row"),X=(0,t.up)("el-icon"),G=(0,t.up)("el-form"),N=(0,t.up)("el-skeleton"),S=(0,t.up)("el-card");return(0,t.wg)(),(0,t.j4)(S,null,{header:(0,t.w5)((()=>[(0,t._)("div",f,[g,(0,t.Wm)(a,{class:"text-blue-500",to:{name:"HallInfoList"}},{default:(0,t.w5)((()=>[v])),_:1})])])),default:(0,t.w5)((()=>[(0,t.Wm)(N,{rows:5,animated:"",loading:V.value},{default:(0,t.w5)((()=>[(0,t.Wm)(G,{model:n.value,rules:x,"label-width":"120px",ref_key:"formEl",ref:I},{default:(0,t.w5)((()=>[(0,t.Wm)(i,{label:"影厅名称",prop:"hall_name"},{default:(0,t.w5)((()=>[(0,t.Wm)(o,{placeholder:"请输入影厅名称",modelValue:n.value.hall_name,"onUpdate:modelValue":l[0]||(l[0]=e=>n.value.hall_name=e)},null,8,["modelValue"])])),_:1}),(0,t.Wm)(i,{label:"影厅标签",prop:"tags"},{default:(0,t.w5)((()=>[(0,t.Wm)(m,{multiple:"",filterable:"","allow-create":"","default-first-option":"","reserve-keyword":!1,placeholder:"请选择影厅标签",modelValue:n.value.tags,"onUpdate:modelValue":l[1]||(l[1]=e=>n.value.tags=e),class:"w-full"},{default:(0,t.w5)((()=>[((0,t.wg)(),(0,t.iD)(t.HY,null,(0,t.Ko)(["退","改签","折扣卡","4K厅","全景声","IMAX厅","小吃","杜比全景声"],(e=>(0,t.Wm)(p,{label:e,value:e,key:e},null,8,["label","value"]))),64))])),_:1},8,["modelValue"])])),_:1}),(0,t.Wm)(i,{label:"影厅地址",prop:"address"},{default:(0,t.w5)((()=>[(0,t.Wm)(o,{placeholder:"影厅地址",modelValue:n.value.address,"onUpdate:modelValue":l[2]||(l[2]=e=>n.value.address=e)},null,8,["modelValue"])])),_:1}),(0,t.Wm)(i,{label:"影厅坐位",prop:"sites"},{default:(0,t.w5)((()=>[(0,t._)("div",w,[(0,t.Wm)(E,{class:"my-[10px]"},{default:(0,t.w5)((()=>[(0,t.Wm)(H,{type:"info",onClick:B,icon:(0,r.SU)(d.Gq5)},{default:(0,t.w5)((()=>[_])),_:1},8,["icon"]),(0,t.Wm)(H,{type:"success",onClick:q,icon:(0,r.SU)(d.IBc)},{default:(0,t.w5)((()=>[h])),_:1},8,["icon"])])),_:1}),(0,t.Wm)(O,{class:"mt-[10px]"},{default:(0,t.w5)((()=>[(0,t.Wm)(J,{span:12,class:"flex flex-row text-[14px] items-center"},{default:(0,t.w5)((()=>[(0,t._)("div",{class:"w-[30px] h-[26px]",draggable:"true","data-site":"0",onDragstart:l[3]||(l[3]=e=>K(e,0))},A,32),k])),_:1}),(0,t.Wm)(J,{span:12,class:"flex flex-row text-[14px] items-center"},{default:(0,t.w5)((()=>[(0,t._)("div",{class:"w-[30px] h-[26px] border border-dashed border-gray-500","data-site":"-1",draggable:"true",onDragstart:l[4]||(l[4]=e=>K(e,-1))},null,32),W])),_:1})])),_:1}),(0,t._)("ul",b,[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(c.value,((e,a)=>((0,t.wg)(),(0,t.iD)("li",{onDragend:l[5]||(l[5]=(0,s.iM)((()=>{}),["prevent"])),onDragover:l[6]||(l[6]=(0,s.iM)((()=>{}),["prevent"])),onDrop:(0,s.iM)((e=>T(e,a)),["prevent"]),key:a},[(0,t.Wm)(X,{color:"red",size:22,class:"absolute right-[10px] cursor-pointer",onClick:e=>Q(a)},{default:(0,t.w5)((()=>[(0,t.Wm)((0,r.SU)(d.Tw$))])),_:2},1032,["onClick"]),((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(e,((e,l)=>((0,t.wg)(),(0,t.iD)("div",{class:(0,u.C_)(["mr-[5px] w-[30px] h-[26px] border border-gray-500",{"border-dashed":-1==e}]),key:l},[0==e?((0,t.wg)(),(0,t.iD)("img",C)):(0,t.kq)("",!0)],2)))),128))],40,y)))),128))])])])),_:1}),(0,t.Wm)(i,null,{default:(0,t.w5)((()=>[(0,t.Wm)(H,{type:"primary",onClick:Z,loading:z.value},{default:(0,t.w5)((()=>[U])),_:1},8,["loading"]),(0,t.Wm)(H,{type:"danger",onClick:l[7]||(l[7]=l=>e.$router.back())},{default:(0,t.w5)((()=>[D])),_:1})])),_:1})])),_:1},8,["model"])])),_:1},8,["loading"])])),_:1})}}},V=a(89);const H=(0,V.Z)(I,[["__scopeId","data-v-6288c88f"]]);var B=H},250:function(e){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAaCAYAAACgoey0AAAAAXNSR0IArs4c6QAAAY9JREFUSA3tVs1qg0AQ3l1/i5eCFC8+QSC0+BQ999QeC32t9lLovac8RQwk6BOUXLzVitFE0/mEDVIiJsbkUgeM7jjzfd/OjpvlrGZhGL6uVqvnsix5zX3yoxBia5rm22g0etkL5vt+WRTFtm8DJrDrpKI+wExJXd3VyzMw/1axf5YDpe6IqRSPUJZlGdQdmN4eBixgAps4nmRGRUyOCTneXddlnHOWJEkv5CAFFjCBTeOP2Wz2CXI+nU7vqZkmnudVAXBuNptKpWVZGHa2OI4ZdTPTNK3CIB42n89TarYHQWpuHcfJoEqaqqqViFNKDhKUV5ICGxy2bQt6d4cfU1EUQ5LKO4KQ3NWQW5+MxAEXCbraNZd8can7QHypSrOh1EOpz1YBtQkZOw+2zK67V1teI7FhGGy9XjfpavWDWNf1xrhGYtpTGa5z2f/6jmkZFPwff0VR1H0xj1yL5XKJhv3hQRDoaZriILClKz8S5+hwIk3ptHNTHTtowBeLxXWe5/2d8vZIoi4X4/H4myZY/AJMWAAq2pF/7QAAAABJRU5ErkJggg=="}}]);
//# sourceMappingURL=837.e9d0549c.js.map