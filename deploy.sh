#!/bin/bash

# 双色球AI智能选号助手 - 部署脚本
# 用于快速部署到腾讯云EdgeOne Pages

echo "========================================="
echo "双色球AI智能选号助手 - 部署工具"
echo "========================================="

# 检查git是否安装
if ! command -v git &> /dev/null; then
    echo "错误: git 未安装，请先安装git"
    exit 1
fi

# 检查是否在git仓库中
if [ ! -d .git ]; then
    echo "错误: 当前目录不是git仓库"
    echo "请先初始化git仓库:"
    echo "  git init"
    echo "  git add ."
    echo "  git commit -m \"初始化项目\""
    exit 1
fi

# 检查是否有远程仓库
if [ -z "$(git remote -v)" ]; then
    echo "警告: 未配置远程仓库"
    echo "请添加远程仓库:"
    echo "  git remote add origin https://your-repo-url.git"
fi

# 显示当前状态
echo ""
echo "当前状态:"
echo "-----------------------------------------"
git status

# 询问是否要部署
read -p "是否要部署到腾讯云EdgeOne Pages? (y/n): " deploy_confirm

if [ "$deploy_confirm" != "y" ]; then
    echo "部署已取消"
    exit 0
fi

# 检查是否有未提交的更改
if [ -n "$(git status --porcelain)" ]; then
    echo ""
    echo "警告: 有未提交的更改"
    read -p "是否先提交更改? (y/n): " commit_confirm
    
    if [ "$commit_confirm" == "y" ]; then
        echo "请输入提交信息:"
        read commit_message
        
        if [ -z "$commit_message" ]; then
            commit_message="更新内容"
        fi
        
        git add .
        git commit -m "$commit_message"
        
        if [ $? -ne 0 ]; then
            echo "提交失败，请检查错误信息"
            exit 1
        fi
        
        echo "更改已提交"
    else
        echo "跳过提交，继续部署"
    fi
fi

# 推送代码
echo ""
echo "正在推送代码到远程仓库..."
git push origin main

if [ $? -ne 0 ]; then
    echo "推送失败，请检查错误信息"
    echo "可能的原因:"
    echo "1. 远程仓库地址不正确"
    echo "2. 没有推送权限"
    echo "3. 网络问题"
    exit 1
fi

echo ""
echo "✅ 代码推送成功！"
echo ""
echo "请在腾讯云EdgeOne Pages控制台查看部署状态:"
echo "https://console.cloud.tencent.com/edgeone/pages"
echo ""
echo "部署完成！"
echo "========================================="