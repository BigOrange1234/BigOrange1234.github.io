<template>
  <div class="max-w-6xl mx-auto">
    <!-- 欢迎横幅 -->
    <div class="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 mb-8 text-white shadow-lg">
      <div class="flex flex-col md:flex-row items-center justify-between">
        <div class="mb-6 md:mb-0">
          <h2 class="text-3xl font-bold mb-2">欢迎使用双色球AI智能选号助手</h2>
          <p class="text-blue-100 text-lg">基于人工智能和大数据分析的彩票选号工具</p>
        </div>
        <div class="flex space-x-4">
          <router-link to="/prediction" class="bg-white text-blue-700 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors">
            <i class="fa fa-magic mr-2"></i>开始预测
          </router-link>
          <router-link to="/analysis" class="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-700 transition-colors">
            <i class="fa fa-bar-chart mr-2"></i>查看分析
          </router-link>
        </div>
      </div>
    </div>

    <!-- 功能特性 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
          <i class="fa fa-brain text-blue-600 text-2xl"></i>
        </div>
        <h3 class="text-xl font-bold text-gray-800 mb-2">AI智能预测</h3>
        <p class="text-gray-600">支持多种神经网络和机器学习模型，提供精准的号码预测</p>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
          <i class="fa fa-bar-chart text-green-600 text-2xl"></i>
        </div>
        <h3 class="text-xl font-bold text-gray-800 mb-2">数据分析</h3>
        <p class="text-gray-600">基于历史开奖数据进行深度分析，发现潜在规律</p>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
        <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
          <i class="fa fa-star text-purple-600 text-2xl"></i>
        </div>
        <h3 class="text-xl font-bold text-gray-800 mb-2">玄学元素</h3>
        <p class="text-gray-600">集成中国传统玄学分析，提供多维度选号参考</p>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
        <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
          <i class="fa fa-mobile text-orange-600 text-2xl"></i>
        </div>
        <h3 class="text-xl font-bold text-gray-800 mb-2">响应式设计</h3>
        <p class="text-gray-600">完美适配移动端和桌面端，随时随地使用</p>
      </div>
    </div>

    <!-- 最新开奖信息 -->
    <div class="bg-white rounded-xl p-6 shadow-md mb-12">
      <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <i class="fa fa-trophy text-yellow-500 mr-3"></i>
        最新开奖信息
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-gray-50 p-4 rounded-lg">
          <div class="flex justify-between items-center mb-4">
            <span class="text-sm text-gray-500">第2025144期</span>
            <span class="text-sm text-gray-500">2025-06-14</span>
          </div>
          <div class="flex flex-wrap gap-2 mb-4">
            <div class="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">01</div>
            <div class="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">08</div>
            <div class="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">15</div>
            <div class="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">20</div>
            <div class="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">26</div>
            <div class="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">33</div>
          </div>
          <div class="flex items-center">
            <span class="text-sm font-medium text-gray-700 mr-2">蓝球：</span>
            <div class="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">13</div>
          </div>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg">
          <h4 class="font-bold text-gray-800 mb-3">开奖统计</h4>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600">一等奖：</span>
              <span class="font-medium">1注</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">二等奖：</span>
              <span class="font-medium">12注</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">一等奖奖金：</span>
              <span class="font-medium text-red-600">10,000,000元</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">二等奖奖金：</span>
              <span class="font-medium text-red-600">682,543元</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 快速开始 -->
    <div class="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-8 text-white shadow-lg">
      <div class="text-center mb-6">
        <h3 class="text-2xl font-bold mb-2">立即体验AI智能选号</h3>
        <p class="text-green-100">选择您喜欢的预测模型，获取专业的号码推荐</p>
      </div>
      <div class="flex justify-center">
        <router-link to="/prediction" class="bg-white text-green-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition-colors">
          <i class="fa fa-rocket mr-2"></i>立即开始
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      // 这里可以添加组件需要的数据
    }
  },
  mounted() {
    // 页面挂载后的初始化逻辑
    console.log('Home page mounted')
  }
}
</script>