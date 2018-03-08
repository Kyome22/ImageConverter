#!/bin/bash

mkdir ${1}/macos_icon_img
l=0
w=$(identify -format "%w" $1$2)
h=$(identify -format "%h" $1$2)
if [ $w -lt $h ]; then
    l=$w
else
    l=$h
fi
convert $1$2 -gravity center -crop ${l}x${l}+0+0 ${1}/crop.png
convert ${1}/crop.png -resize     16x16! ${1}/macos_icon_img/Icon-App-16x16@1x.png
convert ${1}/crop.png -resize     32x32! ${1}/macos_icon_img/Icon-App-16x16@2x.png
convert ${1}/crop.png -resize     32x32! ${1}/macos_icon_img/Icon-App-32x32@1x.png
convert ${1}/crop.png -resize     64x64! ${1}/macos_icon_img/Icon-App-32x32@2x.png
convert ${1}/crop.png -resize   128x128! ${1}/macos_icon_img/Icon-App-128x128@1x.png
convert ${1}/crop.png -resize   256x256! ${1}/macos_icon_img/Icon-App-128x128@2x.png
convert ${1}/crop.png -resize   256x256! ${1}/macos_icon_img/Icon-App-256x256@1x.png
convert ${1}/crop.png -resize   512x512! ${1}/macos_icon_img/Icon-App-256x256@2x.png
convert ${1}/crop.png -resize   512x512! ${1}/macos_icon_img/Icon-App-512x512@1x.png
convert ${1}/crop.png -resize 1024x1024! ${1}/macos_icon_img/Icon-App-512x512@2x.png
rm -f $1$2 ${1}/crop.png
cd ${1}
zip -r ./macos_icon_img.zip ./macos_icon_img/ -x ".DS_Store" &
wait $!
cd ../../
rm -rf ${1}/macos_icon_img
chmod 755 ${1}/macos_icon_img.zip
