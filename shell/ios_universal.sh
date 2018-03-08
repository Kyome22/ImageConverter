#!/bin/bash

mkdir ${1}/ios_universal_img
w=$(identify -format "%w" $1$2)
l1=$((w/3))
l2=$((2*w/3))
convert $1$2 -resize  ${l1}x ${1}/ios_universal_img/${3}@1x.png
convert $1$2 -resize  ${l2}x ${1}/ios_universal_img/${3}@2x.png
mv $1$2 ${1}/ios_universal_img/${3}@3x.png
cd ${1}
zip -r ./ios_universal_img.zip ./ios_universal_img/ -x ".DS_Store" &
wait $!
cd ../../
rm -rf ${1}/ios_universal_img
chmod 755 ${1}/ios_universal_img.zip
