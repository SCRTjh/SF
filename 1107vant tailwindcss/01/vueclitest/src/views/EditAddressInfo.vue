<template>
    <page-view>
        <title-bar :show-back="true">编辑收货地址</title-bar>
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
    name: "EditAddressInfo",
    data() {
        return {
            isShowPopup: false,
            cascaderOptions: [],
            addressInfoData: {
                id: "",
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
        let id = this.$route.params.id;
        this.findById(id)
        console.log(id);
        this.addressInfoData.id = id;
        this.getProvinceList();
    },
    methods: {
        async findById(id) {
            let result = await API.addressInfo.findById(id);
            console.log(result);
            this.addressInfoData.phone = result.phone;
            this.addressInfoData.person_name = result.person_name;
            this.addressInfoData.tag = result.tag;
            this.addressInfoData.id = result.id;
            this.addressInfoData.address = result.address;
            //拆分address
            let temp = result.address.split(" ");
            this.addressInfoData.province_city_county = temp.slice(0, 3).join(" ");
            this.addressInfoData.detailAddress = temp.pop();
        },

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
                this.editAddressInfo();
            }).catch(() => {
                Notify({
                    type: "warning",
                    message: "请正确填写表单"
                })
            })
        },
        //编辑地址
        async editAddressInfo() {
            this.addressInfoData.address = this.addressInfoData.province_city_county + ' ' + this.addressInfoData.detailAddress;
            await API.addressInfo.update(this.addressInfoData);
            Toast.success("修改成功");
            this.$router.replace({
                name: "AddressInfoList"
            });
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