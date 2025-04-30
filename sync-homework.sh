homework=(01 02 03 04 05 06 07 09 ec)

for hw in "${homework[@]}"
do
  cp ../homework/archives/$hw* ./homework
done
