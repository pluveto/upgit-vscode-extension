# Upgit for VSCode

将剪贴板的图片直接上传并插入文档。

后端采用 [pluveto/upgit: Another Typora image uploader](https://github.com/pluveto/upgit).

支持多种上传方式：

+ Github
+ Tencent QcloudCOS
+ Qiniu Kodo
+ Upyun
+ SM.MS
+ Imgur
+ ImgUrl.org
+ CatBox
+ LSkyPro
+ Chevereto
+ ImgBB
+ Cloudinary
+ EasyImage

## 起步

首先，请确保你正确安装并配置了 Upgit 程序本体。详见 [pluveto/upgit](https://github.com/pluveto/upgit).

在 VSCode 扩展市场搜索 `upgit`，安装并启用。

按 F1 搜索 `>Settings UI`，如下设置 `upgit.upgitPath`，填写你的 `upgit` 安装路径。

![upgit_20220413_1649824782.png](https://cdn.jsdelivr.net/gh/pluveto/0images@master/2022/04/upgit_20220413_1649824782.png)

> 如果需要自定义参数，请采用 JSON 格式的配置文件，示例如下：
>
>```json
>{
>  "upgitPath": "C:\\Users\\pluveto\\AppData\\Local\\upgit\\upgit.exe",
>  "upgitArgs": {
>   "": ":clipboard",
>   "--output-type": "stdout",
>   "--output-format": "markdown"
> }
>}
>```

## 命令

可向命令绑定快捷键，从而更方便使用。

`extension.upgit.upload-clipboard-image`: 上传剪贴板的图片。

