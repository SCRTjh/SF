<template>
    <page-view class="flex flex-col">
        <title-bar :show-back="true">注册</title-bar>
        <div class="flex-1 overflow-auto bg-gray-100">
            <Form ref="registerFormEL">
                <CellGroup>
                    <Field label="昵称" placeholder="输入昵称" v-model="userInfo.nickName"
                        :rules="[{ required: true, message: '请输入昵称', trigger: 'onBlur' }]"></Field>
                    <Field label="性别">
                        <template #input>
                            <RadioGroup v-model="userInfo.user_sex" direction="horizontal">
                                <Radio name="男">男</Radio>
                                <Radio name="女">女</Radio>
                            </RadioGroup>
                        </template>
                    </Field>

                    <Field label="密码" type="password" placeholder="输入密码" v-model="userInfo.password"
                        :rules="[{ required: true, message: '请输入密码', trigger: 'onBlur' }]"></Field>
                    <Field label="确认密码" type="password" placeholder="再次输入密码" v-model="userInfo.confirmPwd" :rules="[{ required: true, message: '请输入密码', trigger: 'onBlur' },
                    { validator: validatePwd, message: '确认密码错误', trigger: 'onBlur' }]"></Field>
                    <Field label="手机号" placeholder="输入手机号" v-model="userInfo.user_phone"
                        :rules="[{ pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/, message: '用户名应为手机号', trigger: 'onBlur' }]">
                    </Field>
                    <Field label="邮箱" placeholder="输入邮箱" v-model="userInfo.user_email"
                        :rules="[{ pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, message: '请正确输入邮箱', trigger: 'onBlur' }]">
                    </Field>

                    <!-- 用户头像 -->
                    <Field label="用户头像">
                        <template #input>
                            <Uploader :after-read="afterRead" v-model="imgList" :max-count="1" />
                        </template>
                    </Field>

                    <div class="p-5">
                        <Button @click="formSubmit" :loading="isSubmiting" loading-text="正在提交数据" loading-type="spinner"
                            type="primary" size="small" round block>提交</Button>
                    </div>
                </CellGroup>
            </Form>
        </div>
    </page-view>
</template>
<script>
import API from '@/utils/API';
import { Form, Field, CellGroup, Button, RadioGroup, Radio, Uploader, Notify } from 'vant';
export default {
    name: "Register",
    inject: ["baseURL"],
    data() {
        return {
            userInfo: {
                nickName: "",
                user_sex: "男",
                user_phone: "",
                user_email: "",
                password: "",
                confirmPwd: "",
                user_photo: ""
            },
            imgList: [],
            isSubmiting: false
        }
    },
    methods: {
        validatePwd() {
            if (this.userInfo.confirmPwd == "") {
                return false
            }
            if (this.userInfo.confirmPwd != this.userInfo.password) {
                return false
            }
        },
        formSubmit() {
            this.$refs.registerFormEL.validate().then(() => {
                console.log('验证成功');
                this.submitData();
            }).catch((error) => {
                console.log('验证失败');
                console.log(error);
            })
        },
        submitData() {
            this.isSubmiting = true;
            API.userInfo.add(this.userInfo).then(() => {
                Notify({
                    type: 'success',
                    message: "注册成功"
                })
            }).catch(() => {
                Notify({
                    type: 'warning',
                    message: "注册失败",
                    onClose: () => {
                        this.$router.replace({ name: 'Login' });
                    }
                })
            }).finally(() => {
                this.isSubmiting = false;
            })
        },
        async afterRead(file) {
            console.log(file);
            //将file里面的文件进行上传
            let result = await API.userInfo.uploadUserPhoto(file.file);
            console.log(result);
            this.userInfo.user_photo = result;
            this.imgList = [{
                url: this.baseURL + result
            }]
        }
    },
    components: {
        Form,
        Field,
        CellGroup,
        Button,
        RadioGroup,
        Radio,
        Uploader
    }
}
</script>
<style scoped>

</style>