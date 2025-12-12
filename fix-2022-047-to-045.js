const fs = require('fs');
const path = require('path');

// 2022年双色球047期至045期正确开奖数据（根据搜索结果整理）
const correctSsq2022Data = [
  // 047期数据 - 从多个权威来源确认
  {
    "期号": "2022047",
    "开奖日期": "2022-04-28",
    "红球": [3, 7, 8, 14, 27, 30],
    "蓝球": 9,
    "一等奖": 21,
    "一等奖奖金": "5,620,000"
  },
  // 046期数据 - 从多个权威来源确认
  {
    "期号": "2022046",
    "开奖日期": "2022-04-26",
    "红球": [2, 11, 24, 25, 27, 30],
    "蓝球": 14,
    "一等奖": 9,
    "一等奖奖金": "7,480,000"
  },
  // 045期数据 - 从多个权威来源确认
  {
    "期号": "2022045",
    "开奖日期": "2022-04-24",
    "红球": [3, 12, 17, 18, 19, 28],
    "蓝球": 4,
    "一等奖": 7,
    "一等奖奖金": "7,470,000"
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
        console.log('开始修复2022年047期至045期双色球开奖数据...');
        
        // 读取文件
        const htmlContent = readHTMLFile();
        
        // 修复数据
        const modifiedContent = fix2022Data(htmlContent);
        
        // 保存文件
        saveHTMLFile(modifiedContent);
        
        console.log('2022年047期至045期双色球开奖数据已成功修复！');
        
    } catch (error) {
        console.error('处理失败:', error.message);
    }
}

// 运行脚本
main();