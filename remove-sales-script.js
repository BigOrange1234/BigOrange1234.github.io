const fs = require('fs');
const path = require('path');

// 读取HTML文件
function readHTMLFile() {
    const filePath = path.join(__dirname, 'index.html');
    return fs.readFileSync(filePath, 'utf8');
}

// 移除所有销售额字段
function removeSalesFields(htmlContent) {
    // 使用正则表达式匹配并移除所有的销售额字段
    // 匹配模式: "销售额": "任意数字和逗号", (可能有换行)
    const salesPattern = /\s*"销售额":\s*"[\d,]+"\s*,?\s*\n?/g;
    
    return htmlContent.replace(salesPattern, '');
}

// 保存修改后的文件
function saveHTMLFile(content) {
    const filePath = path.join(__dirname, 'index.html');
    fs.writeFileSync(filePath, content, 'utf8');
}

// 主函数
function main() {
    try {
        console.log('开始移除历史数据中的销售额字段...');
        
        // 读取文件
        const htmlContent = readHTMLFile();
        
        // 移除销售额字段
        const modifiedContent = removeSalesFields(htmlContent);
        
        // 保存文件
        saveHTMLFile(modifiedContent);
        
        console.log('销售额字段已成功移除！');
        
    } catch (error) {
        console.error('处理失败:', error.message);
    }
}

// 运行脚本
main();