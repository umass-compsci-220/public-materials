#!/bin/bash

titles=(
  "01-image-processing"
  "02-image-processing-with-hof"
)

shopt -s dotglob
shopt -s extglob

for title in ${titles[@]}; do
  mkdir -p ./$title

  if [[ -f ./$title/README.md ]]; then
    cp -r ../../materials/homework/$title/!(README.md) ./$title
    cp ./$title/README.md ../../materials/homework/$title
  else
    cp -r ../../materials/homework/$title/* ./$title
  fi
done
