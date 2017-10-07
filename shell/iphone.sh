#!/bin/bash

mkdir ${1}/iphone_img
l=0
w=$(identify -format "%w" $1$2)
h=$(identify -format "%h" $1$2)
if [ $w -lt $h ]; then
    l=$w
else
    l=$ha
fi
convert $1$2 -gravity center -crop ${l}x${l}+0+0 ${1}/crop.png
convert ${1}/crop.png -resize     40x40! ${1}/iphone_img/Icon-App-20x20@2x.png
convert ${1}/crop.png -resize     60x60! ${1}/iphone_img/Icon-App-20x20@3x.png
convert ${1}/crop.png -resize     58x58! ${1}/iphone_img/Icon-App-29x29@2x.png
convert ${1}/crop.png -resize     87x87! ${1}/iphone_img/Icon-App-29x29@3x.png
convert ${1}/crop.png -resize     80x80! ${1}/iphone_img/Icon-App-40x40@2x.png
convert ${1}/crop.png -resize   120x120! ${1}/iphone_img/Icon-App-40x40@3x.png
convert ${1}/crop.png -resize   120x120! ${1}/iphone_img/Icon-App-60x60@2x.png
convert ${1}/crop.png -resize   180x180! ${1}/iphone_img/Icon-App-60x60@3x.png
convert ${1}/crop.png -resize 1024x1024! ${1}/iphone_img/Icon-App-1024x1024@1x.png
rm -f $1$2 ${1}/crop.png
cd ${1}
zip -r ./iphone_img.zip ./iphone_img/ -x ".DS_Store" &
wait $!
cd ../../
rm -rf ${1}/iphone_img
chmod 755 ${1}/iphone_img.zip
