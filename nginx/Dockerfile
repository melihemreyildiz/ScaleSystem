FROM nginx:latest

RUN mkdir /nginx
RUN mkdir /certs
RUN mkdir /nginx/conf
COPY ./nginx.conf /nginx/conf/nginx.conf
COPY ./mime.types /nginx/conf/mime.types

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-c", "/nginx/conf/nginx.conf", "-g", "daemon off;"]