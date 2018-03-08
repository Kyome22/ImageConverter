#!/bin/bash

mkdir ${1}/watchos_icon_img
l=0
w=$(identify -format "%w" $1$2)
h=$(identify -format "%h" $1$2)
if [ $w -lt $h ]; then
    l=$w
else
    l=$h
fi
convert $1$2 -gravity center -crop ${l}x${l}+0+0 ${1}/crop.png
convert ${1}/crop.png -resize     48x48! ${1}/watchos_icon_img/Icon-App-24x24@2x.png
convert ${1}/crop.png -resize     55x55! ${1}/watchos_icon_img/Icon-App-27.5x27.5@2x.png
convert ${1}/crop.png -resize     58x58! ${1}/watchos_icon_img/Icon-App-29x29@2x.png
convert ${1}/crop.png -resize     87x87! ${1}/watchos_icon_img/Icon-App-29x29@3x.png
convert ${1}/crop.png -resize     40x40! ${1}/watchos_icon_img/Icon-App-40x40@1x.png
convert ${1}/crop.png -resize   172x172! ${1}/watchos_icon_img/Icon-App-86x86@2x.png
convert ${1}/crop.png -resize   196x196! ${1}/watchos_icon_img/Icon-App-98x98@3x.png
convert ${1}/crop.png -resize 1024x1024! ${1}/watchos_icon_img/Icon-App-1024x1024@1x.png
rm -f $1$2 ${1}/crop.png
cd ${1}
zip -r ./watchos_icon_img.zip ./watchos_icon_img/ -x ".DS_Store" &
wait $!
cd ../../
rm -rf ${1}/watchos_icon_img
chmod 755 ${1}/watchos_icon_img.zip
