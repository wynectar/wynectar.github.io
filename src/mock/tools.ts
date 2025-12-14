import rookie from "@/assets/imgs/tool/rookie.svg";
import panda from "@/assets/imgs/tool/panda.svg";
import reduce from "@/assets/imgs/tool/reduce.svg";
import forage from "@/assets/imgs/tool/forage.svg";
import id from "@/assets/imgs/tool/id.svg";
import deepseek from "@/assets/imgs/tool/deepseek.svg";

export const thirdTools = [
    {
        name: "DeepSeek",
        url: "https://chat.deepseek.com/",
        img: deepseek,
    },
    {
        name: "菜鸟工具",
        url: "https://c.runoob.com/",
        img: rookie,
    },
    {
        name: "tinypng 图片压缩",
        url: "https://tinypng.com/",
        img: panda,
    },
    {
        name: "10M以下 图片压缩",
        url: "https://www.gaitubao.com/jpg-gif-png",
        img: reduce,
    },
    {
        name: "草料二维码",
        url: "https://cli.im/url",
        img: forage,
    },
    {
        name: "身份证生成",
        url: "https://sfz.tool90.com/sfz/generate.html",
        img: id,
    },
]

export default [
    {
        name: "第三方工具",
        componentName: "ThirdTools",
        component: null,
    },
    {
        name: "身体质量指数（BMI）计算",
        componentName: "BmiCount",
        component: null,
    },
    {
        name: "日期时间转换",
        componentName: "DatetimeConversion",
        component: null,
    },
    {
        name: "颜色选择器",
        componentName: "ColorPicker",
        component: null,
    },
];