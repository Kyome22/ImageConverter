#!/bin/bash

mkdir ${1}/ipad_img
l=0
w=$(identify -format "%w" $1$2)
h=$(identify -format "%h" $1$2)
if [ $w -lt $h ]; then
    l=$w
else
    l=$ha
fi
convert $1$2 -gravity center -crop ${l}x${l}+0+0 ${1}/crop.png
convert ${1}/crop.png -resize     20x20! ${1}/ipad_img/Icon-App-20x20@1x.png
convert ${1}/crop.png -resize     40x40! ${1}/ipad_img/Icon-App-20x20@2x.png
convert ${1}/crop.png -resize     29x29! ${1}/ipad_img/Icon-App-29x29@1x.png
convert ${1}/crop.png -resize     58x58! ${1}/ipad_img/Icon-App-29x29@2x.png
convert ${1}/crop.png -resize     40x40! ${1}/ipad_img/Icon-App-40x40@1x.png
convert ${1}/crop.png -resize     80x80! ${1}/ipad_img/Icon-App-40x40@2x.png
convert ${1}/crop.png -resize     76x76! ${1}/ipad_img/Icon-App-76x76@1x.png
convert ${1}/crop.png -resize   152x152! ${1}/ipad_img/Icon-App-76x76@2x.png
convert ${1}/crop.png -resize   167x167! ${1}/ipad_img/Icon-App-83.5x83.5@2x.png
convert ${1}/crop.png -resize 1024x1024! ${1}/ipad_img/Icon-App-1024x1024@1x.png
rm -f $1$2 ${1}/crop.png
cd ${1}
zip -r ./ipad_img.zip ./ipad_img/ -x ".DS_Store" &
wait $!
cd ../../
rm -rf ${1}/ipad_img
chmod 755 ${1}/ipad_img.zip
