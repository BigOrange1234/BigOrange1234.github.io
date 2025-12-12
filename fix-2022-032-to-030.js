const fs = require('fs');
const path = require('path');

// 2022年双色球032期至030期正确开奖数据（根据搜索结果整理）
const correctSsq2022Data = [
  // 032期数据 - 从多个权威来源确认
  {
    "期号": "2022032",
    "开奖日期": "2022-03-24",
    "红球": [4, 10, 11, 14, 23, 32],
    "蓝球": 7,
    "一等奖": 7,
    "一等奖奖金": "8,220,000"
  },
  // 031期数据 - 从多个权威来源确认
  {
    "期号": "2022031",
    "开奖日期": "2022-03-22",
    "红球": [1, 10, 11, 22, 26, 32],
    "蓝球": 7,
    "一等奖": 28,
    "一等奖奖金": "5,500,000"
  },
  // 030期数据 - 从多个权威来源确认
  {
    "期号": "2022030",
    "开奖日期": "2022-03-20",
    "红球": [12, 23, 24, 26, 27, 30],
    "蓝球": 5,
    "一等奖": 18,
    "一等奖奖金": "5,940,000"
  }
];

// 读取HTML文件
function readHTMLFile() {
    const filePath = path.join(__dirname, 'index.html');
    return fs.readFileSync(filePath, 'utf8');
}

// 修复2022年数据
function fix2022Data(htmlContent) {
    // 找到历史数据数组的位置
    const dataStartPattern = /const historicalData = \[/;
    const dataEndPattern = /\];\s*\n\s*\/\/ 应用状态/;
    
    const startMatch = htmlContent.match(dataStartPattern);
    const endMatch = htmlContent.match(dataEndPattern);
    
    if (!startMatch || !endMatch) {
        throw new Error('无法找到历史数据数组的位置');
    }
    
    const startPos = startMatch.index + startMatch[0].length;
    const endPos = endMatch.index;
    
    // 解析现有的历史数据
    const existingDataStr = htmlContent.substring(startPos, endPos).trim();
    let existingData = [];
    
    if (existingDataStr) {
        existingData = JSON.parse(`[${existingDataStr}]`);
    }
    
    // 创建期号到数据的映射，用于快速查找和替换
    const periodMap = new Map();
    existingData.forEach(item => {
        periodMap.set(item.期号, item);
    });
    
    // 更新正确的数据
    correctSsq2022Data.forEach(correctItem => {
        periodMap.set(correctItem.期号, correctItem);
    });
    
    // 将Map转换回数组并按期号排序（降序）
    const allData = Array.from(periodMap.values());
    allData.sort((a, b) => b.期号.localeCompare(a.期号));
    
    // 生成新的数据字符串
    const dataStr = allData.map(item => 
        `  ${JSON.stringify(item, null, 2).replace(/\n/g, '\n  ')}`
    ).join(',\n');
    
    // 替换原有的数据
    const newHtmlContent = htmlContent.substring(0, startPos) + '\n' + dataStr + '\n' + htmlContent.substring(endPos);
    
    return newHtmlContent;
}

// 保存修改后的文件
function saveHTMLFile(content) {
    const filePath = path.join(__dirname, 'index.html');
    fs.writeFileSync(filePath, content, 'utf8');
}

// 主函数
function main() {
    try {
        console.log('开始修复2022年032期至030期双色球开奖数据...');
        
        // 读取文件
        const htmlContent = readHTMLFile();
        
        // 修复数据
        const modifiedContent = fix2022Data(htmlContent);
        
        // 保存文件
        saveHTMLFile(modifiedContent);
        
        console.log('2022年032期至030期双色球开奖数据已成功修复！');
        
    } catch (error) {
        console.error('处理失败:', error.message);
    }
}

// 运行脚本
main();