# Upgit for VSCode

Upload images from clipboard to remote and insert into document.

Backend [pluveto/upgit: Another Typora image uploader](https://github.com/pluveto/upgit) supports multiple upload methods:

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

## Get started

First, make sure you have installed and configured Upgit program. See [pluveto/upgit](https://github.com/pluveto/upgit).

Search `upgit` in VSCode extension market, install and enable.

在 VSCode 扩展市场搜索 `upgit`，安装并启用。

Press F1 to search `>Settings UI` and set `upgit.upgitPath` to your `upgit` installation path.

![upgit_20220413_1649824782.png](https://cdn.jsdelivr.net/gh/pluveto/0images@master/2022/04/upgit_20220413_1649824782.png)

> If you need to customize parameters, use JSON configuration file, example:
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

## Commands

You can bind commands to shortcut keys to make it easier to use.

`extension.upgit.upload-clipboard-image`: Upload images from clipboard.
