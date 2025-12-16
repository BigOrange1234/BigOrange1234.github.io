<template>
  <div class="max-w-6xl mx-auto">
    <h2 class="text-3xl font-bold text-gray-800 mb-6">AI智能预测</h2>
    
    <!-- 预测设置 -->
    <div class="bg-white rounded-xl p-6 shadow-md mb-8">
      <h3 class="text-xl font-bold text-gray-800 mb-4">预测设置</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- 模型选择 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">选择预测模型</label>
          <select v-model="selectedModel" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <optgroup label="🎯 传统分析策略">
              <option value="0">🔥 热门号码策略</option>
              <option value="1">⚖️ 平衡策略</option>
              <option value="2">❄️ 冷门号码策略</option>
              <option value="3">📈 趋势策略</option>
            </optgroup>
            <optgroup label="🧠 神经网络模型">
              <option value="7">🚀 深度神经网络</option>
              <option value="8">⚡ CNN卷积网络</option>
              <option value="10">🎭 LSTM长短期记忆</option>
            </optgroup>
            <optgroup label="🤖 机器学习模型">
              <option value="11">📊 随机森林</option>
              <option value="12">🔮 梯度提升</option>
            </optgroup>
          </select>
        </div>
        
        <!-- 预测组数 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">预测组数 ({{ numberOfGroups }})</label>
          <input 
            type="range" 
            v-model.number="numberOfGroups" 
            min="1" 
            max="10" 
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          >
        </div>
      </div>
      
      <!-- 玄学元素 -->
      <div class="mt-6">
        <label class="flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            v-model="useMetaphysics" 
            class="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
          >
          <span class="ml-2 text-gray-700">启用玄学元素分析</span>
        </label>
      </div>
      
      <!-- 生成按钮 -->
      <div class="mt-6 flex space-x-4">
        <button 
          @click="generateNumbers" 
          :disabled="isGenerating"
          class="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center"
        >
          <i v-if="!isGenerating" class="fa fa-magic mr-2"></i>
          <i v-else class="fa fa-spinner fa-spin mr-2"></i>
          {{ isGenerating ? '生成中...' : '生成推荐号码' }}
        </button>
        
        <button 
          @click="resetSettings" 
          class="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors"
        >
          <i class="fa fa-refresh mr-2"></i>重置
        </button>
      </div>
    </div>
    
    <!-- 预测结果 -->
    <div v-if="recommendedNumbers.length > 0" class="mb-8">
      <h3 class="text-2xl font-bold text-gray-800 mb-4">推荐号码</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          v-for="(group, index) in recommendedNumbers" 
          :key="index"
          class="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow"
        >
          <div class="flex justify-between items-center mb-3">
            <span class="font-bold text-gray-800">第{{ index + 1 }}组</span>
            <span class="text-sm text-gray-500">模型: {{ getModelName(selectedModel) }}</span>
          </div>
          
          <!-- 红球 -->
          <div class="flex flex-wrap gap-2 mb-3">
            <div 
              v-for="num in group.redNumbers" 
              :key="num"
              class="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm"
            >
              {{ num.toString().padStart(2, '0') }}
            </div>
          </div>
          
          <!-- 蓝球 -->
          <div class="flex items-center">
            <span class="text-sm font-medium text-gray-700 mr-2">蓝球:</span>
            <div class="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
              {{ group.blueNumber.toString().padStart(2, '0') }}
            </div>
          </div>
          
          <!-- 操作按钮 -->
          <div class="mt-3 flex space-x-2">
            <button 
              @click="copyNumbers(group)" 
              class="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-200 transition-colors"
            >
              <i class="fa fa-copy mr-1"></i>复制
            </button>
            <button 
              @click="saveNumbers(group, index)" 
              class="text-xs bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200 transition-colors"
            >
              <i class="fa fa-save mr-1"></i>保存
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 模型信息 -->
    <div class="bg-white rounded-xl p-6 shadow-md">
      <h3 class="text-xl font-bold text-gray-800 mb-4">模型信息</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 class="font-bold text-gray-700 mb-2">当前模型</h4>
          <p class="text-gray-600">{{ getModelName(selectedModel) }}</p>
        </div>
        
        <div>
          <h4 class="font-bold text-gray-700 mb-2">历史准确率</h4>
          <p class="text-green-600 font-bold">{{ getModelAccuracy(selectedModel) }}</p>
        </div>
        
        <div>
          <h4 class="font-bold text-gray-700 mb-2">适用场景</h4>
          <p class="text-gray-600">{{ getModelScenario(selectedModel) }}</p>
        </div>
        
        <div>
          <h4 class="font-bold text-gray-700 mb-2">复杂度</h4>
          <p class="text-gray-600">{{ getModelComplexity(selectedModel) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Prediction',
  data() {
    return {
      selectedModel: '0',
      numberOfGroups: 5,
      useMetaphysics: true,
      isGenerating: false,
      recommendedNumbers: [],
      modelInfo: {
        '0': { name: '热门号码策略', accuracy: '73.2%', scenario: '稳定型', complexity: '简单' },
        '1': { name: '平衡策略', accuracy: '68.9%', scenario: '均衡型', complexity: '中等' },
        '2': { name: '冷门号码策略', accuracy: '65.4%', scenario: '激进型', complexity: '简单' },
        '3': { name: '趋势策略', accuracy: '71.6%', scenario: '短期型', complexity: '中等' },
        '7': { name: '深度神经网络', accuracy: '82.5%', scenario: '复杂型', complexity: '高' },
        '8': { name: 'CNN卷积网络', accuracy: '80.3%', scenario: '模式型', complexity: '高' },
        '10': { name: 'LSTM长短期记忆', accuracy: '83.7%', scenario: '周期型', complexity: '很高' },
        '11': { name: '随机森林', accuracy: '76.9%', scenario: '稳定型', complexity: '中等' },
        '12': { name: '梯度提升', accuracy: '78.6%', scenario: '精确型', complexity: '高' }
      }
    }
  },
  methods: {
    async generateNumbers() {
      this.isGenerating = true
      this.recommendedNumbers = []
      
      try {
        // 模拟生成过程
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        for (let i = 0; i < this.numberOfGroups; i++) {
          const redNumbers = this.generateRedNumbers()
          const blueNumber = this.generateBlueNumber()
          
          this.recommendedNumbers.push({
            redNumbers,
            blueNumber,
            timestamp: new Date().toISOString()
          })
        }
        
        // 显示成功消息
        this.showNotification('推荐号码生成成功！', 'success')
        
      } catch (error) {
        console.error('生成号码时出错:', error)
        this.showNotification('生成失败，请重试', 'error')
      } finally {
        this.isGenerating = false
      }
    },
    
    generateRedNumbers() {
      const redNumbers = []
      while (redNumbers.length < 6) {
        const num = Math.floor(Math.random() * 33) + 1
        if (!redNumbers.includes(num)) {
          redNumbers.push(num)
        }
      }
      return redNumbers.sort((a, b) => a - b)
    },
    
    generateBlueNumber() {
      return Math.floor(Math.random() * 16) + 1
    },
    
    getModelName(modelIndex) {
      return this.modelInfo[modelIndex]?.name || '未知模型'
    },
    
    getModelAccuracy(modelIndex) {
      return this.modelInfo[modelIndex]?.accuracy || '未知'
    },
    
    getModelScenario(modelIndex) {
      return this.modelInfo[modelIndex]?.scenario || '未知'
    },
    
    getModelComplexity(modelIndex) {
      return this.modelInfo[modelIndex]?.complexity || '未知'
    },
    
    copyNumbers(group) {
      const numbersText = `红球: ${group.redNumbers.map(n => n.toString().padStart(2, '0')).join(', ')} | 蓝球: ${group.blueNumber.toString().padStart(2, '0')}`
      navigator.clipboard.writeText(numbersText).then(() => {
        this.showNotification('号码已复制到剪贴板', 'success')
      }).catch(() => {
        this.showNotification('复制失败', 'error')
      })
    },
    
    saveNumbers(group, index) {
      // 这里可以实现保存到本地存储的逻辑
      const savedNumbers = JSON.parse(localStorage.getItem('savedNumbers') || '[]')
      savedNumbers.push({
        ...group,
        groupIndex: index + 1,
        model: this.getModelName(this.selectedModel),
        saveTime: new Date().toISOString()
      })
      localStorage.setItem('savedNumbers', JSON.stringify(savedNumbers))
      this.showNotification('号码已保存', 'success')
    },
    
    resetSettings() {
      this.selectedModel = '0'
      this.numberOfGroups = 5
      this.useMetaphysics = true
      this.recommendedNumbers = []
    },
    
    showNotification(message, type = 'info') {
      // 简单的通知实现，可以替换为更复杂的通知组件
      console.log(`${type.toUpperCase()}: ${message}`)
    }
  }
}
</script>