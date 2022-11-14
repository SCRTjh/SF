<template>
    <page-view>
        <title-bar :show-back="true">新增收货地址</title-bar>
        <Form class="mt-4" ref="addressInfoFormEL">
            <CellGroup>
                <Field label="姓名" v-model="addressInfoData.person_name" placeholder="请输入收件人姓名"
                    :rules="[{ required: true, message: '收件人姓名不能为空', trigger: 'onBlur' }]"></Field>
                <Field label="电话" v-model="addressInfoData.phone" placeholder="请输入收件人电话"
                    :rules="[{ pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/, message: '请输入正确的电话号码', trigger: 'onBlur' }]">
                </Field>
                <Field label="地区" v-model="addressInfoData.province_city_county" placeholder="请选择地区" readonly is-link
                    @click="isShowPopup = true"></Field>
                <Field :rules="[{ required: true, message: '详细地址不能为空', trigger: 'onBlur' }]" label="详细地址"
                    v-model="addressInfoData.detailAddress" placeholder="街道门排信息"></Field>
                <Field label="标签" :rules="[{ required: true, message: '标签不能为空', trigger: 'onBlur' }]"
                    v-model="addressInfoData.tag" placeholder="给地址起标签"></Field>
                <div class="px-2 py-3">
                    <Button type="primary" block round size="small" @click="submitForm">保存</Button>
                </div>
            </CellGroup>
        </Form>
    </page-view>
    <Popup v-model:show="isShowPopup" position="bottom">
        <Cascader title="请选择所在地区" :options="cascaderOptions" @finish="cascaderFinish" />
    </Popup>
</template>
<script>
import API from '@/utils/API';
import { Form, CellGroup, Field, Button, Popup, Cascader, Notify, Toast } from 'vant';
export default {
    name: "AddAddressInfo",
    data() {
        return {
            isShowPopup: false,
            cascaderOptions: [],
            addressInfoData: {
                phone: "",
                person_name: "",
                tag: "",
                address: "",
                province_city_county: "",
                detailAddress: ""
            }
        }
    },
    created() {
        this.getProvinceList();
    },
    methods: {
        //取得地区数据并进行处理
        async getProvinceList() {
            let result = await API.area.getAllList();
            console.log(result);
            let list = result.filter(province => province.level == 1).map(item => {
                return {
                    text: item.areaName,
                    value: item.id,
                    children: result.filter(city => city.level == 2 && city.parentId == item.id).map(item => {
                        return {
                            text: item.areaName,
                            value: item.id,
                            children: result.filter(county => county.level == 3 && county.parentId == item.id).map(item => {
                                return {
                                    text: item.areaName,
                                    value: item.id,
                                }
                            })
                        }
                    })
                }
            })
            console.log(list);
            this.cascaderOptions = list;
        },
        //取得地区数据
        async getAllList() {
            let result = await API.area.getAllList();
            console.log(result);
        },
        cascaderFinish({ selectedOptions }) {
            this.addressInfoData.province_city_county = selectedOptions.map(item => item.text).join(" ");
            this.isShowPopup = false;
            console.log(selectedOptions);
        },
        submitForm() {
            this.$refs.addressInfoFormEL.validate().then(() => {
                this.addAddress();
            }).catch(() => {
                Notify({
                    type: "warning",
                    message: "请正确填写表单"
                })
            })
        },
        async addAddress() {
            this.addressInfoData.address = this.addressInfoData.province_city_county + ' ' + this.addressInfoData.detailAddress;
            let result = await API.addressInfo.addAddress(this.addressInfoData);
            console.log(result);
            Toast.success("新增地址成功");
            this.$router.back();
        }
    },
    components: {
        Form,
        CellGroup,
        Field,
        Button,
        Popup,
        Cascader
    }
}
</script>
<style scoped>

</style>