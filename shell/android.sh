#!/bin/bash

mkdir ${1}/android_img
l=0
w=$(identify -format "%w" $1$2)
h=$(identify -format "%h" $1$2)
if [ $w -lt $h ]; then
    l=$w
else
    l=$h
fi
convert $1$2 -gravity center -crop ${l}x${l}+0+0 ${1}/crop.png
convert ${1}/crop.png -resize   36x36! ${1}/android_img/Icon-App-ldpi.png
convert ${1}/crop.png -resize   48x48! ${1}/android_img/Icon-App-mdpi.png
convert ${1}/crop.png -resize   72x72! ${1}/android_img/Icon-App-hdpi.png
convert ${1}/crop.png -resize   96x96! ${1}/android_img/Icon-App-xhdpi.png
convert ${1}/crop.png -resize 144x144! ${1}/android_img/Icon-App-xxhdpi.png
convert ${1}/crop.png -resize 192x192! ${1}/android_img/Icon-App-xxxhdpi.png
rm -f $1$2 ${1}/crop.png
cd ${1}
zip -r ./android_img.zip ./android_img/ -x ".DS_Store" &
wait $!
cd ../../
rm -rf ${1}/android_img
chmod 755 ${1}/android_img.zip
