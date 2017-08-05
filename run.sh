#!/bin/bash
if [ $# -eq 1 ]; then
    node ./js/back.js $1
else
    node ./js/back.js 8080
fi
