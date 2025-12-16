<template>
  <div class="max-w-6xl mx-auto">
    <h2 class="text-3xl font-bold text-gray-800 mb-6">玄学元素分析</h2>
    
    <!-- 玄学分析设置 -->
    <div class="bg-white rounded-xl p-6 shadow-md mb-8">
      <h3 class="text-xl font-bold text-gray-800 mb-4">玄学设置</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- 五行属性 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">五行属性偏好</label>
          <select v-model="elementPreference" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="balance">⚖️ 五行平衡</option>
            <option value="wood">🌱 木属性</option>
            <option value="fire">🔥 火属性</option>
            <option value="earth">🗿 土属性</option>
            <option value="metal">⚔️ 金属性</option>
            <option value="water">💧 水属性</option>
          </select>
        </div>
        
        <!-- 易经卦象 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">易经卦象</label>
          <select v-model="hexagram" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="random">🎲 随机卦象</option>
            <option value="qian">☰ 乾卦 - 天</option>
            <option value="kun">☷ 坤卦 - 地</option>
            <option value="zhen">☳ 震卦 - 雷</option>
            <option value="xun">☴ 巽卦 - 风</option>
            <option value="kan">☵ 坎卦 - 水</option>
            <option value="li">☲ 离卦 - 火</option>
            <option value="gen">☶ 艮卦 - 山</option>
            <option value="dui">☱ 兑卦 - 泽</option>
          </select>
        </div>
        
        <!-- 幸运数字 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">幸运数字来源</label>
          <select v-model="luckyNumberSource" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="birthdate">🎂 生日数字</option>
            <option value="constellation">⭐ 星座幸运数字</option>
            <option value="traditional">🏮 传统幸运数字</option>
            <option value="random">🎲 随机幸运数</option>
          </select>
        </div>
        
        <!-- 风水方位 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">风水方位</label>
          <select v-model="fengshuiDirection" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="north">⬆️ 北方</option>
            <option value="south">⬇️ 南方</option>
            <option value="east">⬅️ 东方</option>
            <option value="west">➡️ 西方</option>
            <option value="center">🀄 中央</option>
          </select>
        </div>
      </div>
      
      <!-- 分析按钮 -->
      <div class="mt-6 flex space-x-4">
        <button 
          @click="analyzeMetaphysics" 
          :disabled="isAnalyzing"
          class="bg-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700 transition-colors flex items-center"
        >
          <i v-if="!isAnalyzing" class="fa fa-star mr-2"></i>
          <i v-else class="fa fa-spinner fa-spin mr-2"></i>
          {{ isAnalyzing ? '分析中...' : '开始玄学分析' }}
        </button>
        
        <button 
          @click="resetMetaphysics" 
          class="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors"
        >
          <i class="fa fa-refresh mr-2"></i>重置
        </button>
      </div>
    </div>
    
    <!-- 分析结果 -->
    <div v-if="analysisResult" class="mb-8">
      <h3 class="text-2xl font-bold text-gray-800 mb-4">玄学分析结果</h3>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 五行分析 -->
        <div class="bg-white rounded-xl p-6 shadow-md">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <i class="fa fa-leaf text-green-600"></i>
            </div>
            <h4 class="text-lg font-bold text-gray-800">五行分析</h4>
          </div>
          
          <div class="space-y-3">
            <div class="flex items-center">
              <span class="w-20 text-sm text-gray-600">木属性:</span>
              <div class="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                <div class="bg-green-500 h-full" :style="{ width: analysisResult.elements.wood + '%' }"></div>
              </div>
              <span class="w-8 text-right text-sm font-medium ml-2">{{ analysisResult.elements.wood }}%</span>
            </div>
            
            <div class="flex items-center">
              <span class="w-20 text-sm text-gray-600">火属性:</span>
              <div class="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                <div class="bg-red-500 h-full" :style="{ width: analysisResult.elements.fire + '%' }"></div>
              </div>
              <span class="w-8 text-right text-sm font-medium ml-2">{{ analysisResult.elements.fire }}%</span>
            </div>
            
            <div class="flex items-center">
              <span class="w-20 text-sm text-gray-600">土属性:</span>
              <div class="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                <div class="bg-yellow-500 h-full" :style="{ width: analysisResult.elements.earth + '%' }"></div>
              </div>
              <span class="w-8 text-right text-sm font-medium ml-2">{{ analysisResult.elements.earth }}%</span>
            </div>
            
            <div class="flex items-center">
              <span class="w-20 text-sm text-gray-600">金属性:</span>
              <div class="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                <div class="bg-gray-500 h-full" :style="{ width: analysisResult.elements.metal + '%' }"></div>
              </div>
              <span class="w-8 text-right text-sm font-medium ml-2">{{ analysisResult.elements.metal }}%</span>
            </div>
            
            <div class="flex items-center">
              <span class="w-20 text-sm text-gray-600">水属性:</span>
              <div class="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                <div class="bg-blue-500 h-full" :style="{ width: analysisResult.elements.water + '%' }"></div>
              </div>
              <span class="w-8 text-right text-sm font-medium ml-2">{{ analysisResult.elements.water }}%</span>
            </div>
          </div>
          
          <div class="mt-4 text-sm text-gray-600">
            <p>{{ analysisResult.elementAdvice }}</p>
          </div>
        </div>
        
        <!-- 易经分析 -->
        <div class="bg-white rounded-xl p-6 shadow-md">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
              <i class="fa fa-book text-orange-600"></i>
            </div>
            <h4 class="text-lg font-bold text-gray-800">易经分析</h4>
          </div>
          
          <div class="text-center mb-4">
            <div class="text-4xl font-bold text-orange-600 mb-2">{{ analysisResult.hexagramSymbol }}</div>
            <p class="text-lg font-bold text-gray-800">{{ analysisResult.hexagramName }}</p>
            <p class="text-sm text-gray-600">{{ analysisResult.hexagramNature }}</p>
          </div>
          
          <div class="mt-4 text-sm text-gray-600">
            <p class="mb-2"><strong>卦辞:</strong></p>
            <p class="italic">{{ analysisResult.hexagramText }}</p>
          </div>
          
          <div class="mt-4 text-sm text-gray-600">
            <p><strong>彩票启示:</strong></p>
            <p>{{ analysisResult.hexagramAdvice }}</p>
          </div>
        </div>
        
        <!-- 幸运数字 -->
        <div class="bg-white rounded-xl p-6 shadow-md">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <i class="fa fa-star text-blue-600"></i>
            </div>
            <h4 class="text-lg font-bold text-gray-800">幸运数字</h4>
          </div>
          
          <div class="mb-4">
            <h5 class="font-medium text-gray-700 mb-2">推荐红球</h5>
            <div class="flex flex-wrap gap-2">
              <div 
                v-for="num in analysisResult.luckyRedNumbers" 
                :key="num"
                class="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm"
              >
                {{ num.toString().padStart(2, '0') }}
              </div>
            </div>
          </div>
          
          <div class="mb-4">
            <h5 class="font-medium text-gray-700 mb-2">推荐蓝球</h5>
            <div class="flex flex-wrap gap-2">
              <div 
                v-for="num in analysisResult.luckyBlueNumbers" 
                :key="num"
                class="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm"
              >
                {{ num.toString().padStart(2, '0') }}
              </div>
            </div>
          </div>
          
          <div class="mt-4 text-sm text-gray-600">
            <p><strong>来源:</strong> {{ analysisResult.luckyNumberSource }}</p>
            <p class="mt-2">{{ analysisResult.luckyNumberAdvice }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 玄学知识 -->
    <div class="bg-white rounded-xl p-6 shadow-md">
      <h3 class="text-xl font-bold text-gray-800 mb-4">玄学知识</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 class="font-bold text-gray-700 mb-2">五行相生相克</h4>
          <div class="text-sm text-gray-600 space-y-2">
            <p><strong>相生:</strong> 金生水 → 水生木 → 木生火 → 火生土 → 土生金</p>
            <p><strong>相克:</strong> 金克木 → 木克土 → 土克水 → 水克火 → 火克金</p>
            <p>选择号码时，可考虑五行平衡或根据当前运势选择相生的属性。</p>
          </div>
        </div>
        
        <div>
          <h4 class="font-bold text-gray-700 mb-2">易经卦象与数字</h4>
          <div class="text-sm text-gray-600 space-y-2">
            <p>乾卦(☰): 1, 4, 9</p>
            <p>坤卦(☷): 2, 5, 8</p>
            <p>震卦(☳): 3, 4, 8</p>
            <p>巽卦(☴): 3, 5, 8</p>
            <p>坎卦(☵): 1, 6</p>
            <p>离卦(☲): 2, 7</p>
            <p>艮卦(☶): 5, 7, 8</p>
            <p>兑卦(☱): 4, 6, 9</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Metaphysics',
  data() {
    return {
      elementPreference: 'balance',
      hexagram: 'random',
      luckyNumberSource: 'traditional',
      fengshuiDirection: 'center',
      isAnalyzing: false,
      analysisResult: null,
      
      // 易经卦象数据
      hexagramData: {
        qian: { symbol: '☰', name: '乾卦', nature: '天', text: '元亨利贞', advice: '大吉大利，适合选择大号数字，如25-33区间' },
        kun: { symbol: '☷', name: '坤卦', nature: '地', text: '元亨，利牝马之贞', advice: '稳重吉祥，适合选择中间区间数字，如12-24区间' },
        zhen: { symbol: '☳', name: '震卦', nature: '雷', text: '亨。震来虩虩，笑言哑哑', advice: '动静结合，适合选择大小搭配的数字组合' },
        xun: { symbol: '☴', name: '巽卦', nature: '风', text: '小亨，利有攸往', advice: '灵活多变，适合选择相邻数字组合' },
        kan: { symbol: '☵', name: '坎卦', nature: '水', text: '习坎，有孚维心', advice: '险中求胜，适合选择冷号和热号搭配' },
        li: { symbol: '☲', name: '离卦', nature: '火', text: '利贞，亨', advice: '光明正大，适合选择近期热门数字' },
        gen: { symbol: '☶', name: '艮卦', nature: '山', text: '艮其背，不获其身', advice: '稳如泰山，适合选择遗漏期数适中的数字' },
        dui: { symbol: '☱', name: '兑卦', nature: '泽', text: '亨，利贞', advice: '和和美美，适合选择形态优美的数字组合' }
      }
    }
  },
  methods: {
    async analyzeMetaphysics() {
      this.isAnalyzing = true
      
      try {
        // 模拟分析过程
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        this.analysisResult = this.generateAnalysisResult()
        
        // 显示成功消息
        this.showNotification('玄学分析完成！', 'success')
        
      } catch (error) {
        console.error('分析时出错:', error)
        this.showNotification('分析失败，请重试', 'error')
      } finally {
        this.isAnalyzing = false
      }
    },
    
    generateAnalysisResult() {
      // 生成五行分析
      const elements = this.generateFiveElements()
      
      // 生成易经分析
      const hexResult = this.generateHexagramAnalysis()
      
      // 生成幸运数字
      const luckyNumbers = this.generateLuckyNumbers()
      
      return {
        elements,
        elementAdvice: this.getElementAdvice(elements),
        ...hexResult,
        ...luckyNumbers,
        timestamp: new Date().toISOString()
      }
    },
    
    generateFiveElements() {
      const baseElements = { wood: 20, fire: 20, earth: 20, metal: 20, water: 20 }
      
      // 根据偏好调整五行比例
      switch (this.elementPreference) {
        case 'wood':
          baseElements.wood += 15
          baseElements.metal -= 15
          break
        case 'fire':
          baseElements.fire += 15
          baseElements.water -= 15
          break
        case 'earth':
          baseElements.earth += 15
          baseElements.wood -= 15
          break
        case 'metal':
          baseElements.metal += 15
          baseElements.fire -= 15
          break
        case 'water':
          baseElements.water += 15
          baseElements.earth -= 15
          break
      }
      
      // 添加随机波动
      Object.keys(baseElements).forEach(key => {
        baseElements[key] += Math.floor(Math.random() * 10) - 5
        baseElements[key] = Math.max(5, Math.min(40, baseElements[key]))
      })
      
      return baseElements
    },
    
    generateHexagramAnalysis() {
      const selectedHex = this.hexagram === 'random' 
        ? Object.keys(this.hexagramData)[Math.floor(Math.random() * 8)]
        : this.hexagram
      
      return {
        hexagramSymbol: this.hexagramData[selectedHex].symbol,
        hexagramName: this.hexagramData[selectedHex].name,
        hexagramNature: this.hexagramData[selectedHex].nature,
        hexagramText: this.hexagramData[selectedHex].text,
        hexagramAdvice: this.hexagramData[selectedHex].advice
      }
    },
    
    generateLuckyNumbers() {
      // 生成6个不重复的红球号码
      const redNumbers = []
      while (redNumbers.length < 6) {
        const num = Math.floor(Math.random() * 33) + 1
        if (!redNumbers.includes(num)) {
          redNumbers.push(num)
        }
      }
      redNumbers.sort((a, b) => a - b)
      
      // 生成2个不重复的蓝球号码
      const blueNumbers = []
      while (blueNumbers.length < 2) {
        const num = Math.floor(Math.random() * 16) + 1
        if (!blueNumbers.includes(num)) {
          blueNumbers.push(num)
        }
      }
      blueNumbers.sort((a, b) => a - b)
      
      const sourceNames = {
        birthdate: '生日数字',
        constellation: '星座幸运数字',
        traditional: '传统幸运数字',
        random: '随机幸运数'
      }
      
      return {
        luckyRedNumbers: redNumbers,
        luckyBlueNumbers: blueNumbers,
        luckyNumberSource: sourceNames[this.luckyNumberSource],
        luckyNumberAdvice: '这些数字在玄学角度具有特殊的能量场，建议重点关注。'
      }
    },
    
    getElementAdvice(elements) {
      const maxElement = Object.keys(elements).reduce((a, b) => elements[a] > elements[b] ? a : b)
      
      const adviceMap = {
        wood: '木属性较强，建议选择1-9区间的数字，绿色系号码有好运。',
        fire: '火属性较强，建议选择10-18区间的数字，红色系号码有好运。',
        earth: '土属性较强，建议选择19-27区间的数字，黄色系号码有好运。',
        metal: '金属性较强，建议选择28-33区间的数字，白色系号码有好运。',
        water: '水属性较强，建议选择全区间均衡分布，蓝色系号码有好运。'
      }
      
      return adviceMap[maxElement]
    },
    
    resetMetaphysics() {
      this.elementPreference = 'balance'
      this.hexagram = 'random'
      this.luckyNumberSource = 'traditional'
      this.fengshuiDirection = 'center'
      this.analysisResult = null
    },
    
    showNotification(message, type = 'info') {
      console.log(`${type.toUpperCase()}: ${message}`)
    }
  }
}
</script>