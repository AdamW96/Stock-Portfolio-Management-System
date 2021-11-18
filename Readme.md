# 9900-w16a-nobugs

upload your zid diary to the `work-dirary` floder

## Deploy project

### Backend

You can choose to run the project in **Vlab** or **Docker**.

#### Vlab deploy

##### 0. git clone

If you don't have the source code, please download it or use git to clone it.

```
git clone git@github.com:unsw-cse-comp3900-9900-21T3/capstone-project-9900-w16a-nobugs.git
```

##### 1. environment

please install the following packets for python3：

```
pip3 install cython
pip3 install argparse
pip3 install tushare
```

##### 2. run

you should in `capstone-project-9900-w16a-nobugs/backend` directory to run ：

```
./project_run.sh raw
```

This operation will do：

1. new `share_data` folder as the work directory
2. use split_db folder's partitions to recover sqlite database
3. build java project
4. copy related files to share_data
5. run `python3 py_stock.py` to sync history data
6. run java project

**note**:

- `pip3 install` will take minutes to install required packages, it also need large disk space. if you meet `Disk quota exceeded` error, you need to enlarge your disk or delete some files and retry.
- `python_stock.py` will take some time to sync history data.

##### 3. stop

use `ctr + c` to stop the project.

#### Docker deploy

We have some shell scripts (in ./backed folder) to use docker to run our project.

##### 1. run

```
# use this command to start project
./project_run.sh
```

This command will:

- Pull latest docker images from ali cloud.
- New `share_data` folder as the work directory, it will be mounted to docker images.
- The database inside the docker will save it's data to `share_data`, which means restart docker will not affect the database.
- Run `py_stock` docker image to sync history data.
- Run `9090-project` docker image to start project. Mapping host machine's 8080 port to docker image's 8080 port.

##### 2. stop

To stop the backend project, you should:

```
./project_stop.sh
```

## Others

### Build backend

Environment requirement：

- openjdk 11
- maven 3
- docker

```
# only build java project
./project_build.sh 

# build py_stock and java project
# py_stock is the image for data collection
./project_build.sh all
```

### Sqlite related

Because Vlab don't support `git lfs`, we choose to split the Sqlite db file to `splite_db` folder. Use the following command can recreate the database and save it to `./backend/9900-test-db.sqlite`

```
# in the backend folder
python3 merge.py
```

### Frontend

To start frontend on the vlab, you can follow the instructions below:
##### Enter the directory
```
$cd capstone-project-9900-w16a-nobugs/frontend
```

##### install dependencies
```
$yarn
```

##### Start the development server
```
$yarn start
```

After run the `yarn start`,  open [http://localhost:3000] to view it in the browser.

