const fs = require('fs');
const path = require('path');

// 2023年双色球开奖数据（根据搜索结果整理的准确数据）- JSON格式
const correctSsq2023Data = [
  {
    "期号": "2023149",
    "开奖日期": "2023-12-26",
    "红球": [2, 10, 19, 24, 26, 33],
    "蓝球": 15,
    "一等奖": 4,
    "一等奖奖金": "10,000,000"
  },
  {
    "期号": "2023148",
    "开奖日期": "2023-12-24",
    "红球": [3, 5, 7, 9, 19, 20],
    "蓝球": 8,
    "一等奖": 39,
    "一等奖奖金": "5,410,000"
  },
  {
    "期号": "2023147",
    "开奖日期": "2023-12-21",
    "红球": [5, 6, 14, 16, 19, 32],
    "蓝球": 12,
    "一等奖": 8,
    "一等奖奖金": "7,560,000"
  },
  {
    "期号": "2023146",
    "开奖日期": "2023-12-19",
    "红球": [2, 3, 6, 11, 20, 32],
    "蓝球": 9,
    "一等奖": 15,
    "一等奖奖金": "5,100,000"
  },
  {
    "期号": "2023132",
    "开奖日期": "2023-11-08",
    "红球": [3, 9, 11, 15, 25, 27],
    "蓝球": 1,
    "一等奖": 15,
    "一等奖奖金": "5,200,000"
  },
  {
    "期号": "2023079",
    "开奖日期": "2023-07-06",
    "红球": [5, 6, 9, 12, 21, 22],
    "蓝球": 7,
    "一等奖": 44,
    "一等奖奖金": "2,040,000"
  },
  {
    "期号": "2023001",
    "开奖日期": "2023-01-05",
    "红球": [9, 16, 18, 22, 28, 32],
    "蓝球": 2,
    "一等奖": 8,
    "一等奖奖金": "7,900,000"
  }
];

// 读取HTML文件
function readHTMLFile() {
    const filePath = path.join(__dirname, 'index.html');
    return fs.readFileSync(filePath, 'utf8');
}

// 更新2023年数据
function update2023Data(htmlContent) {
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
    
    // 更新或添加2023年数据
    correctSsq2023Data.forEach(correctItem => {
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
        console.log('开始更新2023年双色球开奖数据...');
        
        // 读取文件
        const htmlContent = readHTMLFile();
        
        // 更新2023年数据
        const modifiedContent = update2023Data(htmlContent);
        
        // 保存文件
        saveHTMLFile(modifiedContent);
        
        console.log('2023年双色球开奖数据已成功更新！');
        
    } catch (error) {
        console.error('处理失败:', error.message);
    }
}

// 运行脚本
main();