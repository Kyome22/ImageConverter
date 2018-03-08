#!/bin/bash

l=0
w=$(identify -format "%w" $1$2)
h=$(identify -format "%h" $1$2)
if [ $w -lt $h ]; then
    l=$w
else
    l=$h
fi
convert $1$2 -gravity center -crop ${l}x${l}+0+0 ${1}/crop.png
convert -size 1024x1024 xc:none -draw "roundrectangle 0,0 1024,1024 225,225" ${1}/crop.png -resize 1024x1024! -compose src-in -composite -unsharp 0x1 ${1}/icon_corner_radius@1024.png
rm -f $1$2 ${1}/crop.png
cd ${1}
zip -r ./ios_corner_radius_img.zip ./icon_corner_radius@1024.png -x ".DS_Store" &
wait $!
cd ../../
rm -rf ${1}/icon_corner_radius@1024.png
chmod 755 ${1}/ios_corner_radius_img.zip
