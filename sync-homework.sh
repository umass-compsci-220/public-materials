homework=(ec 01 02 03 04 05)

for hw in "${homework[@]}"
do
  cp ../homework/archives/$hw* ./homework
done
