#!/bin/bash

titles=(
  "01-image-processing"
)

for title in ${titles[@]}; do
  mkdir -p ./$title
  cp -r ../../materials/homework/$title/* ./$titles
done