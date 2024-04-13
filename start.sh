# run all 3 docker compose with build and no cache also add .env for each project


# run docker compose for project 1
cd akshat1-6
docker-compose up --build 

# run docker compose for project 2
cd ../finwiser
docker-compose up --build

# run docker compose for project 3
cd ../piyush1-6
docker-compose up --build

# add .env code here for p1
cd ../akshat1-6
# multiple secrets echo
