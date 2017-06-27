#!/bin/bash

#cd $(dirname $0)
mkdir ./up/android_img
l=0
w=$(identify -format "%w" ./up/$1)
h=$(identify -format "%h" ./up/$1)
if [ $w -lt $h ]
  then
   l=$w
else
  l=$h
fi
convert ./up/$1 -gravity center -crop ${l}x${l}+0+0 ./up/android_img/crop.png
#identify -format "%w x %h\n" ./up/android_image/crop.png
convert ./up/android_img/crop.png -resize   36x36! ./up/android_img/Icon-App-ldpi.png
convert ./up/android_img/crop.png -resize   48x48! ./up/android_img/Icon-App-mdpi.png
convert ./up/android_img/crop.png -resize   72x72! ./up/android_img/Icon-App-hdpi.png
convert ./up/android_img/crop.png -resize   96x96! ./up/android_img/Icon-App-xhdpi.png
convert ./up/android_img/crop.png -resize 144x144! ./up/android_img/Icon-App-xxhdpi.png
convert ./up/android_img/crop.png -resize 192x192! ./up/android_img/Icon-App-xxxhdpi.png
rm -f ./up/android_img/crop.png
cd ./up
zip -r ../down/android_img.zip ./android_img/ -x ".DS_Store"
wait 2
cd ..
rm -rf ./up/android_img ./up/$1
chmod 755 ./down/android_img.zip
