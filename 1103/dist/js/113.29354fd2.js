"use strict";(self["webpackChunkmovie_manager"]=self["webpackChunkmovie_manager"]||[]).push([[113],{6113:function(e,l,a){a.r(l),a.d(l,{default:function(){return w}});var u=a(3396),o=a(4870),r=a(2748),i=a(2807),d=a(946),m=a(678);const t=e=>((0,u.dD)("data-v-9a644ca2"),e=e(),(0,u.Cn)(),e),s={class:"flex flex-row justify-between"},n=t((()=>(0,u._)("span",null,"编辑电影",-1))),p=(0,u.Uk)("返回列表"),v=["src"],c=(0,u.Uk)("保存数据"),g=(0,u.Uk)("重置表单");var _={__name:"EditMovieInfo",setup(e){const l=(0,m.tv)(),a=(0,m.yj)(),t=(0,u.f3)("baseURL"),_=(0,o.iH)({id:"",movie_name:"",duration:"",movie_pc:"",movie_desc:"",publicTime:"",tags:[],role:"",movie_score:0}),f={movie_name:[{required:!0,message:"请输入电影名称",trigger:"blur"}],duration:[{required:!0,message:"请输入电影时长",trigger:"blur"},{pattern:/^\d+$/,message:"请输入正确的电影时长",trigger:"blur"}],movie_pc:[{required:!0,message:"请输入电影海报",trigger:"blur"}],movie_desc:[{required:!0,message:"请输入电影描述",trigger:"blur"}],publicTime:[{required:!0,message:"请输入电影上映时间",trigger:"blur"}],tags:[{required:!0,message:"请输入电影标签",trigger:"blur"}],role:[{required:!0,message:"请输入电影角色",trigger:"blur"}],movie_score:[{required:!0,message:"请输入电影评分",trigger:"blur"},{pattern:/^\d(\.\d+)?$/,message:"请输入正确的电影评分",trigger:"blur"}]},b=(0,o.iH)(!1),w=()=>{_.value.id=a.params.id,b.value=!0,d.Z.movieInfo.findById(_.value.id).then((e=>{_.value=e.data})).finally((()=>{b.value=!1}))};w();const W=(0,o.iH)(null),V=e=>{_.value.movie_pc=e.data,i.z8.success("上传成功")},h=e=>/^image\/(jpe?g|png|gif|svg|webp|bmp)$/.test(e.type)?!(e.size/1024/1024>2)||(i.z8.error("图片大小不能超过2MB!"),!1):(i.z8.error("请选择图片格式"),!1),y=()=>{W.value.validate((e=>{e?U():i.z8.error("请将信息填写完整")}))},k=(0,o.iH)(!1),U=()=>{k.value=!0,d.Z.movieInfo.update(_.value.id,_.value).then((e=>{i.z8.success("添加成功"),l.replace({name:"MovieInfoList"})})).finally((()=>{k.value=!1}))},x=()=>{W.value.resetFields()};return(e,l)=>{const a=(0,u.up)("router-link"),i=(0,u.up)("el-input"),d=(0,u.up)("el-form-item"),m=(0,u.up)("el-icon"),w=(0,u.up)("el-upload"),U=(0,u.up)("el-date-picker"),q=(0,u.up)("el-input-number"),z=(0,u.up)("el-button"),I=(0,u.up)("el-form"),M=(0,u.up)("el-skeleton"),j=(0,u.up)("el-card");return(0,u.wg)(),(0,u.j4)(j,null,{header:(0,u.w5)((()=>[(0,u._)("div",s,[n,(0,u.Wm)(a,{class:"text-blue-500",to:{name:"MovieInfoList"}},{default:(0,u.w5)((()=>[p])),_:1})])])),default:(0,u.w5)((()=>[(0,u.Wm)(M,{rows:8,animated:"",loading:b.value},{default:(0,u.w5)((()=>[(0,u.Wm)(I,{"label-width":"120px",model:_.value,rules:f,ref_key:"formEl",ref:W},{default:(0,u.w5)((()=>[(0,u.Wm)(d,{label:"电影名称",prop:"movie_name"},{default:(0,u.w5)((()=>[(0,u.Wm)(i,{placeholder:"请输入管理员名称",modelValue:_.value.movie_name,"onUpdate:modelValue":l[0]||(l[0]=e=>_.value.movie_name=e)},null,8,["modelValue"])])),_:1}),(0,u.Wm)(d,{label:"电影时长",prop:"duration"},{default:(0,u.w5)((()=>[(0,u.Wm)(i,{placeholder:"请输入电影时长",modelValue:_.value.duration,"onUpdate:modelValue":l[1]||(l[1]=e=>_.value.duration=e)},null,8,["modelValue"])])),_:1}),(0,u.Wm)(d,{label:"电影图片",prop:"movie_pc"},{default:(0,u.w5)((()=>[(0,u.Wm)(w,{class:"upload-box w-[120px] h-[150px] border-dashed border border-gray-500 flex justify-center items-center",action:(0,o.SU)(t)+"/movie-info/uploadMoviePc","show-file-list":!1,"on-success":V,"before-upload":h,name:"movie_pc"},{default:(0,u.w5)((()=>[_.value.movie_pc?((0,u.wg)(),(0,u.iD)("img",{key:0,src:(0,o.SU)(t)+_.value.movie_pc,class:"avatar"},null,8,v)):((0,u.wg)(),(0,u.j4)(m,{key:1,size:60},{default:(0,u.w5)((()=>[(0,u.Wm)((0,o.SU)(r.D5R))])),_:1}))])),_:1},8,["action"])])),_:1}),(0,u.Wm)(d,{label:"上映时间",prop:"publicTime"},{default:(0,u.w5)((()=>[(0,u.Wm)(U,{modelValue:_.value.publicTime,"onUpdate:modelValue":l[2]||(l[2]=e=>_.value.publicTime=e),type:"date",placeholder:"请选择上映日期","value-format":"YYYY-MM-DD"},null,8,["modelValue"])])),_:1}),(0,u.Wm)(d,{label:"电影类型",prop:"tags"},{default:(0,u.w5)((()=>[(0,u.Wm)(i,{placeholder:"请输入电影类型 ，用空格隔开",modelValue:_.value.tags,"onUpdate:modelValue":l[3]||(l[3]=e=>_.value.tags=e)},null,8,["modelValue"])])),_:1}),(0,u.Wm)(d,{label:"主演人员",prop:"role"},{default:(0,u.w5)((()=>[(0,u.Wm)(i,{placeholder:"请输入主演人员，用空格隔开",modelValue:_.value.role,"onUpdate:modelValue":l[4]||(l[4]=e=>_.value.role=e)},null,8,["modelValue"])])),_:1}),(0,u.Wm)(d,{label:"电影评分",prop:"movie_score"},{default:(0,u.w5)((()=>[(0,u.Wm)(q,{placeholder:"请输入电影评分",modelValue:_.value.movie_score,"onUpdate:modelValue":l[5]||(l[5]=e=>_.value.movie_score=e),precision:1,step:.1,max:9.9},null,8,["modelValue","step","max"])])),_:1}),(0,u.Wm)(d,{label:"电影简介",prop:"movie_desc"},{default:(0,u.w5)((()=>[(0,u.Wm)(i,{placeholder:"请输入电影简介",modelValue:_.value.movie_desc,"onUpdate:modelValue":l[6]||(l[6]=e=>_.value.movie_desc=e),type:"textarea",rows:"8"},null,8,["modelValue"])])),_:1}),(0,u.Wm)(d,null,{default:(0,u.w5)((()=>[(0,u.Wm)(z,{type:"primary",onClick:y,loading:k.value},{default:(0,u.w5)((()=>[c])),_:1},8,["loading"]),(0,u.Wm)(z,{type:"danger",onClick:x},{default:(0,u.w5)((()=>[g])),_:1})])),_:1})])),_:1},8,["model"])])),_:1},8,["loading"])])),_:1})}}},f=a(89);const b=(0,f.Z)(_,[["__scopeId","data-v-9a644ca2"]]);var w=b}}]);
//# sourceMappingURL=113.29354fd2.js.map