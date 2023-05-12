# FROM node:16.17.0-alpine

# # 设置工作目录
# WORKDIR /app

# # Copy the application
# COPY . .

# Run npm ci

# Run npm run build

# # 暴露3000端口
# EXPOSE 3000

# # 启动应用程序
# CMD ["npm", "start"]

# The first FROM is now a stage called build-stage
FROM node:16 AS build-stage
WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

# This is a new stage, everything before this is gone, except the files we want to COPY
FROM nginx:1.20-alpine
# COPY the directory build from build-stage to /usr/share/nginx/html
# The target location here was found from the Docker hub page
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html