#!/bin/bash

titles=(
  # "01-image-processing"
  # "02-image-processing-with-hof"
  "03-more-image-processing-with-hof"
  "04-oracles"
  "05-streams-and-series"
  "ec-observables"
  "06-fluent-filter-and-json"
)

shopt -s dotglob
shopt -s extglob

for title in ${titles[@]}; do
  mkdir -p ./$title

  cp -r ../../materials/homework/$title/!(*.override.json) ./$title
  cp ../../materials/homework/archives/$title.zip ./archives
done
