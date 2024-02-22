homework=(00 01 02 03)

for hw in "${homework[@]}"
do
  cp ../homework/archives/$hw* ./homework
done
