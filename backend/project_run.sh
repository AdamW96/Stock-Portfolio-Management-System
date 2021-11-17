
if [ "$1" = "raw" ];then
echo "run in raw mode"

mkdir share_data

echo "=== recreate db ==="
if [ -f "./9900-test-db.sqlite" ];then
  echo "use shared_data db"
  else
  echo "use initialized db"
  python3 merge.py || { echo "recreate db failed"; exit 1; }
fi

cp ./py_history/py_stock.py ./share_data/
cp ./py_history/requirements.txt ./share_data/
cp ./9900-test-db.sqlite ./share_data

mvn package || { echo "java build failed"; exit 1; }
cp ./target/9900-project-test.jar ./share_data/

cd ./share_data/
python3 py_stock.py || { echo "!!! py stock sync data failed"; exit 1; }

echo "=== start java project ==="
java -jar 9900-project-test.jar

exit 0
fi

if [ "$1" = "local" ];then
echo "run in local mode"
else
echo "\$docker pull registry.cn-qingdao.aliyuncs.com/unsw/9900-py-stock:latest"
docker pull registry.cn-qingdao.aliyuncs.com/unsw/9900-py-stock:latest
echo "\$docker pull registry.cn-qingdao.aliyuncs.com/unsw/9090-project:latest"
docker pull registry.cn-qingdao.aliyuncs.com/unsw/9090-project:latest
fi

echo "\$docker run -v "$(pwd)/share_data":/usr/src/app registry.cn-qingdao.aliyuncs.com/unsw/9900-py-stock"
docker run -v "$(pwd)/share_data":/usr/src/app registry.cn-qingdao.aliyuncs.com/unsw/9900-py-stock:latest || { echo "error when run py stock"; exit 1; }

echo "\$docker run -p 8081:8080 -v \"\$(pwd)/share_data\":/usr/src/app --name 9900-project registry.cn-qingdao.aliyuncs.com/unsw/9090-project:latest"
docker run -d -p 8080:8080 -v "$(pwd)/share_data":/usr/src/app --name 9900-project registry.cn-qingdao.aliyuncs.com/unsw/9090-project:latest
