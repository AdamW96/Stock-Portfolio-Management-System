FROM python:3

WORKDIR /usr/src/project

COPY requirements.txt ./
RUN pip config set global.index-url https://mirrors.aliyun.com/pypi/simple/
RUN pip install --no-cache-dir -r requirements.txt

COPY py_stock.py ./
COPY 9900-test-db.sqlite ./
COPY start_py.sh ./

RUN chmod 777 start_py.sh
CMD ./start_py.sh
