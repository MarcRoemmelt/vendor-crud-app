FROM mongo:latest

COPY ./create-env-variables.sh /docker-entrypoint-initdb.d/0-create-env-variables.sh
COPY ./createUser.sh /docker-entrypoint-initdb.d/1-create-user.sh
