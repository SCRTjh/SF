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
                        <Button loading-text="正在登录" :loading="isSubmiting" loading-type="spinner" type="primary"
                            @click="checkLogin" round block size="small">登录</Button>
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
import { CellGroup, Form, Field, Button, Toast } from 'vant';
import API from '@/utils/API';
import { mapActions } from "vuex"

export default {
    name: "Login",
    data() {
        return {
            loginUser: {
                zh: '15172222222',
                password: '123456',
            },
            isSubmiting: false
        }
    },
    computed: {

    },
    methods: {
        ...mapActions(["setLoginUserInfo", "setToken"]),
        checkLogin() {
            //验证表单
            this.$refs.loginFormEL.validate().then(() => {
                console.log('验证通过');
                this.submitLoginForm()
            }).catch((error) => {
                console.log('验证没通过');
            })
        },
        async submitLoginForm() {
            this.isSubmiting = true;
            try {
                let result = await API.userInfo.checkLogin(this.loginUser);
                Toast.success("登录成功");
                console.log(result);
                //设置全局状态（数据）
                this.setLoginUserInfo(result.loginUserInfo);
                this.setToken(result.token);
                this.$router.back();
            } catch (error) {
                Toast.fail("登录失败");
            }
            this.isSubmiting = false;
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