
if [ "$1" = "all" ];then
    echo "=== build py stock ==="

    cp ./9900-test-db.sqlite ./py_history/9900-test-db.sqlite
    cd ./py_history
    docker build -t registry.cn-qingdao.aliyuncs.com/unsw/9900-py-stock .
    cd ..
    rm ./py_history/9900-test-db.sqlite

    echo "=== build py stock finish ==="
    echo "============================="
fi

echo "=== build java project ==="

echo "\$mvn package"
mvn package || { echo "error when build jar"; exit 1; }

echo "\$docker build -t registry.cn-qingdao.aliyuncs.com/unsw/9090-project ."
docker build -t registry.cn-qingdao.aliyuncs.com/unsw/9090-project .

echo "=== build java project finish ==="
