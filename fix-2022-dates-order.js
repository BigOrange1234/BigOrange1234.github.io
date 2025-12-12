const fs = require('fs');
const path = require('path');

// 2022年双色球正确开奖数据（按照正确的日期顺序排列）
const correctSsq2022Data = [
  // 066期 - 6月12日
  {
    "期号": "2022066",
    "开奖日期": "2022-06-12",
    "红球": [6, 11, 14, 20, 27, 30],
    "蓝球": 9,
    "一等奖": 33,
    "一等奖奖金": "5,150,000"
  },
  // 067期 - 6月14日
  {
    "期号": "2022067",
    "开奖日期": "2022-06-14",
    "红球": [1, 5, 13, 21, 26, 29],
    "蓝球": 15,
    "一等奖": 10,
    "一等奖奖金": "6,780,000"
  },
  // 068期 - 6月16日
  {
    "期号": "2022068",
    "开奖日期": "2022-06-16",
    "红球": [7, 12, 15, 24, 26, 29],
    "蓝球": 6,
    "一等奖": 7,
    "一等奖奖金": "7,410,000"
  },
  // 069期 - 6月19日
  {
    "期号": "2022069",
    "开奖日期": "2022-06-19",
    "红球": [6, 7, 13, 19, 26, 29],
    "蓝球": 8,
    "一等奖": 20,
    "一等奖奖金": "5,520,000"
  },
  // 070期 - 6月21日
  {
    "期号": "2022070",
    "开奖日期": "2022-06-21",
    "红球": [4, 6, 9, 27, 28, 33],
    "蓝球": 2,
    "一等奖": 9,
    "一等奖奖金": "7,130,000"
  },
  // 071期 - 6月23日
  {
    "期号": "2022071",
    "开奖日期": "2022-06-23",
    "红球": [4, 7, 15, 18, 29, 33],
    "蓝球": 1,
    "一等奖": 8,
    "一等奖奖金": "7,650,000"
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
        console.log('开始修复2022年双色球开奖数据的日期顺序...');
        
        // 读取文件
        const htmlContent = readHTMLFile();
        
        // 修复数据
        const modifiedContent = fix2022Data(htmlContent);
        
        // 保存文件
        saveHTMLFile(modifiedContent);
        
        console.log('2022年双色球开奖数据的日期顺序已成功修复！');
        
    } catch (error) {
        console.error('处理失败:', error.message);
    }
}

// 运行脚本
main();