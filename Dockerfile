FROM node:12-alpine

# 设置工作目录
WORKDIR /app

# 复制依赖包清单
COPY package*.json ./

# 安装依赖
RUN npm install --production

# 复制应用程序
COPY . .

# 暴露3000端口
EXPOSE 3000

# 启动应用程序
CMD ["npm", "start"]