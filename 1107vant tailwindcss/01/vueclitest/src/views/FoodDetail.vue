<template>
    <page-view>
        <title-bar :show-back="true">
            【{{ foodDetail?.food_name }}】菜品详情
            <template #menu>
                <Icon name="share-o" :size="22" @click="showShare = true"></Icon>
            </template>
        </title-bar>
        <!-- 加载栏 -->
        <my-loading :isLoading="!foodDetail">
            <!-- 根据底边栏预留空位 -->
            <div class="flex-1 overflow-auto pb-[var(--van-action-bar-height)]" ref="foodDetailContent">
                <!-- 运用List组件设置上拉加载 -->
                <List v-model:loading="isLoading" :finished="finished" finished-text="没有更多了" @load="loadNextPageComment"
                    loading-text="正在加载...">
                    <div class="w-full h-[230px]">
                        <!-- 设置crossorigin来使html2canvas有效 -->
                        <img crossorigin="anonymous" v-lazy="baseURL + foodDetail.food_img"
                            class="w-full h-full object-cover">
                    </div>
                    <ul
                        class="text-[14px] leading-[22px] box-border p-[5px] border-0 border-b border-dash border-gray-200">
                        <li><span class="font-bold">菜品名称：</span>{{ foodDetail.food_name }}</li>
                        <li><span class="font-bold">价格：￥</span>{{ foodDetail.price }}</li>
                        <li><span class="font-bold">类别：</span>{{ foodDetail.categoryInfo.category_name }}</li>
                        <li class="indent-[2em]">{{ foodDetail.food_desc }}</li>
                    </ul>
                    <!-- 评论信息 -->
                    <div class="p-[5px]">
                        <div class="text-primaryColor font-bold text-[18px]">
                            最新评论
                        </div>
                        <transition-group enter-active-class="animate__animated animate__slideInUp">
                            <div class="comment-item" v-for="item in commentInfoList" :key="item.id">
                                <div class="flex flex-row py-2 items-center">
                                    <img crossorigin="anonymous" v-lazy="baseURL + item.userInfo.user_photo"
                                        class="w-[40px] h-[40px] rounded-full" alt="">
                                    <div class="flex-1 ml-2">
                                        {{ item.userInfo.nickName }}
                                    </div>
                                    <div class="h-[40px] flex flex-col justify-between">
                                        <!-- 封装dayjs处理时间 -->
                                        <div class="text-[12px] text-gray-600"> {{ formatDateTime(item.create_time,
                                                "YYYY年MM月DD日 HH:mm:ss")
                                        }}</div>
                                        <!-- 评分:星星进度条 -->
                                        <Rate v-model="item.star" color="#ffd22e" void-icon="star" void-color="#eee">
                                        </Rate>
                                    </div>
                                </div>
                                <div class="text-[14ox] leading-[24px]">
                                    {{ item.foodInfo.food_desc }}
                                </div>
                            </div>
                        </transition-group>
                    </div>
                </List>

            </div>
            <ActionBar>
                <ActionBarIcon icon="cart-o" text="购物车" :badge="totalCount"></ActionBarIcon>
                <ActionBarIcon icon="balance-o" text="金额" :badge="totalPrice"></ActionBarIcon>
                <ActionBarIcon icon="star" text="已收藏" color="#ff5500"></ActionBarIcon>
                <ActionBarButton :loading="isAddingShopCart" @click="addToShopCart" type="warning" text="加入购物车">
                </ActionBarButton>
                <ActionBarButton @click="toShopCartList" type="danger" text="立即购买"></ActionBarButton>
            </ActionBar>
        </my-loading>
    </page-view>
    <!-- 分享表单 -->
    <ShareSheet v-model:show="showShare" title="立即分享给好友" :options="shareOptions" @select="shareOptionSelect">
    </ShareSheet>
</template>
<script>
import { ActionBar, ActionBarIcon, ActionBarButton, Rate, List, Icon, ShareSheet, Toast, ImagePreview, Dialog } from 'vant';
import API from '@/utils/API';
import { mapGetters } from 'vuex';
import { formatDateTime } from "@/utils/DateTimeUtils.js";
//导入剪贴板插件
import useClipboard from "vue-clipboard3";
//导入二维码插件
import QRCode from "qrcode";
// 导入html转canvans插件
import html2canvas from "html2canvas";

export default {
    name: "FoodDetail",
    inject: ["baseURL"],
    data() {
        return {
            isLoading: false,
            // 接收数据
            foodDetail: null,
            fid: null,
            pageIndex: 1,
            pageCount: null,
            //累计下一页
            commentInfoList: [],
            //分享栏
            shareOptions: [
                { name: "微信", icon: "wechat" },
                { name: "微博", icon: "weibo" },
                { name: "复制链接", icon: "link" },
                { name: "分享海报", icon: "poster" },
                { name: "二维码", icon: "qrcode" },
            ],
            showShare: false,
            //购物车总计信息
            totalPrice: 0,
            totalCount: 0,
            // 是否正在加入购物车
            isAddingShopCart: false

        }
    },
    async created() {
        // 从路由获取params
        let id = this.$route.params.id;
        await this.findById(id);
        await this.getCommentInfoListByFid({ fid: id, pageIndex: this.pageIndex });
        if (this.loginUserInfo) {
            await this.getMyShopCartTotalInfo()
        }
    },
    computed: {
        ...mapGetters(["loginUserInfo"]),
        //计算是否显示“没有更多了“
        finished() {
            return this.pageIndex >= this.pageCount;
        }
    },
    methods: {
        //根据id请求数据
        async findById(id) {
            let result = await API.foodInfo.findById(id);
            this.foodDetail = result;
        },
        //根据菜品id与页码获取评论数据
        async getCommentInfoListByFid({ fid, pageIndex }) {
            this.isLoading = true;
            let result = await API.commentInfo.getCommentInfoListByFid({ fid, pageIndex });
            this.pageIndex = result.pageIndex;
            this.pageCount = result.pageCount;
            //加载下一页
            this.commentInfoList.push(...result.listData);
            this.isLoading = false
        },
        //加载下一页,页码加1再发请求
        loadNextPageComment() {
            this.pageIndex++;
            this.getCommentInfoListByFid({ fid: this.id, pageIndex: this.pageIndex });
        },
        //分享栏选择事件
        shareOptionSelect(option, index) {
            if (index == 2) {
                //点了复制链接
                const { toClipboard } = useClipboard();
                toClipboard(`分享一下·${location.href}`)
                    .then(() => {
                        Toast.success("快发给小伙伴看一下")
                    })
            } else if (index == 3) {
                this.showFoodPost()
            }
            else if (index == 4) {
                this.shareQRCode();
            }
        },
        //分享二维码
        shareQRCode() {
            //url转base64转二维码
            QRCode.toDataURL(location.href).then((b64) => {
                ImagePreview({
                    images: [b64],
                    onClose() {
                        Dialog.confirm({
                            title: "请确定",
                            message: "要将分享二维码保存到本地吗"
                        }).then(() => {
                            let a = document.createElement("a");
                            a.href = b64;
                            a.download = "分享二维码.png";
                            a.click();
                        }).catch(() => {
                            console.log('没有下载二维码');
                        })
                    }
                })
            });
        },
        //分享海报
        async showFoodPost() {
            //播放音效
            // let audio = new Audio();
            // audio.src = require();
            // audio.play()

            //插件元素转canvas,图片不能跨域
            let canvas = await html2canvas(this.$refs.foodDetailContent, {
                useCORS: true
            });

            let ctx = canvas.getContext("2d");

            ctx.save();
            //找中心
            let x = parseInt(canvas.style.width) / 2;
            let y = parseInt(canvas.style.height) / 2;
            //重置ctx锚点
            ctx.translate(x, y)
            ctx.font = "36px 微软雅黑"
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            ctx.rotate(-Math.PI / 4);
            let grd = ctx.createLinearGradient(-x, -y, canvas.width, canvas.height);
            grd.addColorStop(0, "red");
            grd.addColorStop(0.5, "gold");
            grd.addColorStop(1, "cyan");
            ctx.fillStyle = grd;
            ctx.fillText("H2204·美食分享", 0, 0);
            ctx.restore();
            //获取二维码图片base64
            let qrb64 = await QRCode.toDataURL(location.href);
            let img = new Image();
            img.src = qrb64;
            img.onload = () => {
                ctx.drawImage(img, 20, 50, 100, 100);
                //canvas转base64
                let b64 = canvas.toDataURL("image/png");
                ImagePreview({
                    images: [b64],
                    className: "animate__animated animate__bounceIn",
                    onClose() {
                        Dialog.confirm({
                            title: "请确定",
                            message: "要将海报保存到本地吗"
                        }).then(() => {
                            let a = document.createElement("a");
                            a.href = b64;
                            a.download = `${this.foodDetail.food_name}海报.png`;
                            a.click();
                        }).catch(() => {
                            console.log('没有下载海报');
                        })
                    }

                })

            }

        },
        formatDateTime,
        //获取我的购物车的统计信息
        async getMyShopCartTotalInfo() {
            let result = await API.shopCart.getMyshopCartTotalInfo();
            this.totalCount = result.totalCount;
            this.totalPrice = result.totalPrice;
        },
        //添加到购物车
        async addToShopCart() {
            if (this.loginUserInfo) {
                this.isAddingShopCart = true;
                await API.shopCart.addToShopCart({ fid: this.foodDetail.id, count: 1 })
                Toast.success("加入购物车成功");
                this.getMyShopCartTotalInfo();
                this.isAddingShopCart = false;
            } else {
                Dialog.confirm({
                    title: "提示",
                    message: "你还没有登录，要去登录吗"
                }).then(() => {
                    this.$router.push({ name: "Login" });
                }).catch(() => {

                })
            }
        },
        //跳转购物车
        toShopCartList() {
            if (this.loginUserInfo) {
                this.$router.push({ name: "ShopCartList" })
            } else
                Dialog.confirm({
                    title: "提示",
                    message: "你还没有登录，要去登录吗"
                }).then(() => {
                    this.$router.push({ name: "login" });
                }).catch(() => {

                })
        }

    },
    components: {
        ActionBar,
        ActionBarIcon,
        ActionBarButton,
        Rate,
        List,
        Icon,
        ShareSheet,
        Toast
    }
}
</script>
<style>

</style>