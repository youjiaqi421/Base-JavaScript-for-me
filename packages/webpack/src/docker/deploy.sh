#!/bin/bash

# 检查是否有必要的环境变量
if [ -z "$PRODUCT_NAME" ]; then
    echo "错误: 请设置 PRODUCT_NAME 环境变量"
    echo "使用方法: PRODUCT_NAME=your_product_name ./deploy.sh"
    exit 1
fi

# 日志文件配置
LOG_DIR="/var/log/docker-deploy"
LOG_FILE="$LOG_DIR/$PRODUCT_NAME-deploy.log"

# 创建日志目录
mkdir -p "$LOG_DIR"

# 日志函数
log() {
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] $1" | tee -a "$LOG_FILE"
}

# 检查Docker是否运行
if ! docker info > /dev/null 2>&1; then
    log "错误: Docker 服务未运行"
    exit 1
fi

# 记录部署开始
log "开始部署 $PRODUCT_NAME"

# 拉取最新镜像
log "拉取最新镜像..."
if ! docker pull "$PRODUCT_NAME:latest"; then
    log "错误: 拉取镜像失败"
    exit 1
fi

# 停止并删除旧容器（如果存在）
if docker ps -a | grep -q "$PRODUCT_NAME"; then
    log "停止并删除旧容器..."
    docker stop "$PRODUCT_NAME" || log "警告: 停止旧容器失败"
    docker rm "$PRODUCT_NAME" || log "警告: 删除旧容器失败"
fi

# 启动新容器
log "启动新容器..."
if ! docker run -d \
    --name "$PRODUCT_NAME" \
    --restart unless-stopped \
    -e "PRODUCT_NAME=$PRODUCT_NAME" \
    "$PRODUCT_NAME:latest"; then
    log "错误: 启动新容器失败"
    exit 1
fi

# 检查容器是否成功运行
sleep 5
if ! docker ps | grep -q "$PRODUCT_NAME"; then
    log "错误: 容器未能成功运行"
    exit 1
fi

# 清理未使用的镜像
log "清理未使用的镜像..."
docker image prune -f > /dev/null 2>&1

log "部署完成: $PRODUCT_NAME 已成功更新"

# 显示容器状态
docker ps --filter "name=$PRODUCT_NAME"