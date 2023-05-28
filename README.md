# frontend-grupo1

comandos para Docker[TUTORIAL: https://jsramblings.com/dockerizing-a-react-app/]:

- levantar imagen: docker build . -t my-app
- Ver si imagen se creó: docker images | grep my-app

- run docker run \
    -it \
    --rm \
    -v ${PWD}:/app \
    -v /app/node_modules \
    -p 3001:3000 \
    -e CHOKIDAR_USEPOLLING=true \
    sample:dev