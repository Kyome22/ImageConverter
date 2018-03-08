#!/bin/bash
if [ $# -eq 1 ]; then
    node ./js/back.js $1
else
    node ./js/back.js 3000
fi
