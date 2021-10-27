
# /usr/src/app is share_data dir
cp py_stock.py /usr/src/app/py_stock.py

if [ -f "/usr/src/app/9900-test-db.sqlite" ];then
  echo "use shared_data db"
  else
  echo "use initialized db"
  cp 9900-test-db.sqlite /usr/src/app/9900-test-db.sqlite
fi

cd /usr/src/app

echo "\$pwd"
pwd

echo "\$python py_stock.py"
python py_stock.py
