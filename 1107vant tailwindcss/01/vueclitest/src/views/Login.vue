<template>
    <page-view class="flex flex-col">
        <title-bar :show-back="true">登录</title-bar>
        <div class="flex-1 overflow-auto bg-gray-100">
            <Form ref="loginFormEL">
                <CellGroup>
                    <Field label="用户名" v-model="loginUser.zh" placeholder="请输入用户名"
                        :rules="[{ pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/, message: '用户名应为手机号', trigger: 'onBlur' }]">
                    </Field>
                    <Field label="密码" type="password" v-model="loginUser.password" placeholder="请输入密码"
                        :rules="[{ required: true, message: '密码不能为空', trigger: 'onBlur' }]"></Field>
                    <div class="p-5">
                        <Button type="primary" @click="checkLogin" round block size="small">登录</Button>
                    </div>
                    <div class="text-center text-[12px] py-4">
                        还没有账号，去<router-link :to="{ name: 'Register' }" class="text-primaryColor">注册</router-link>
                    </div>
                </CellGroup>
            </Form>
        </div>
    </page-view>
</template>
<script>
import { CellGroup, Form, Field, Button } from 'vant';
export default {
    name: "Login",
    data() {
        return {
            loginUser: {
                zh: "",
                password: ""
            }
        }
    },
    methods: {
        checkLogin() {
            //验证表单
            this.$refs.loginFormEL.validate().then(() => {
                console.log('验证通过');
            }).catch((error) => {
                console.log('验证没通过');
            })
        }
    },
    components: {
        CellGroup,
        Form,
        Field,
        Button
    }
}
</script>
<style>

</style>