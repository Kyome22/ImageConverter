#!/bin/bash

#cd $(dirname $0)
mkdir ./up/ios_img
l=0
w=$(identify -format "%w" ./up/$1)
h=$(identify -format "%h" ./up/$1)
if [ $w -lt $h ]
  then
   l=$w
else
  l=$h
fi
convert ./up/$1 -gravity center -crop ${l}x${l}+0+0 ./up/ios_img/crop.png
#identify -format "%w x %h\n" ./up/ios_image/crop.png
convert ./up/ios_img/crop.png -resize   40x40! ./up/ios_img/Icon-App-20x20@2x.png
convert ./up/ios_img/crop.png -resize   60x60! ./up/ios_img/Icon-App-20x20@3x.png
convert ./up/ios_img/crop.png -resize   58x58! ./up/ios_img/Icon-App-29x29@2x.png
convert ./up/ios_img/crop.png -resize   87x87! ./up/ios_img/Icon-App-29x29@3x.png
convert ./up/ios_img/crop.png -resize   80x80! ./up/ios_img/Icon-App-40x40@2x.png
convert ./up/ios_img/crop.png -resize 120x120! ./up/ios_img/Icon-App-40x40@3x.png
convert ./up/ios_img/crop.png -resize 120x120! ./up/ios_img/Icon-App-60x60@2x.png
convert ./up/ios_img/crop.png -resize 180x180! ./up/ios_img/Icon-App-60x60@3x.png
rm -f ./up/ios_img/crop.png
cd ./up
zip -r ../down/ios_img.zip ./ios_img/ -x ".DS_Store"
wait 2
cd ..
rm -rf ./up/ios_img ./up/$1
chmod 755 ./down/ios_img.zip
