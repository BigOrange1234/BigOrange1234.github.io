<template>
  <div class="max-w-6xl mx-auto">
    <h2 class="text-3xl font-bold text-gray-800 mb-6">数据分析</h2>
    
    <!-- 数据概览 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-xl p-6 shadow-md">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-gray-800">历史期数</h3>
          <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <i class="fa fa-calendar text-blue-600"></i>
          </div>
        </div>
        <p class="text-3xl font-bold text-gray-900">1,458</p>
        <p class="text-sm text-gray-500 mt-1">期数据</p>
      </div>
      
      <div class="bg-white rounded-xl p-6 shadow-md">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-gray-800">平均遗漏</h3>
          <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <i class="fa fa-line-chart text-green-600"></i>
          </div>
        </div>
        <p class="text-3xl font-bold text-gray-900">12.4</p>
        <p class="text-sm text-gray-500 mt-1">期</p>
      </div>
      
      <div class="bg-white rounded-xl p-6 shadow-md">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-gray-800">最大遗漏</h3>
          <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <i class="fa fa-exclamation-triangle text-red-600"></i>
          </div>
        </div>
        <p class="text-3xl font-bold text-gray-900">67</p>
        <p class="text-sm text-gray-500 mt-1">期</p>
      </div>
      
      <div class="bg-white rounded-xl p-6 shadow-md">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-gray-800">平均AC值</h3>
          <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <i class="fa fa-calculator text-purple-600"></i>
          </div>
        </div>
        <p class="text-3xl font-bold text-gray-900">19.8</p>
        <p class="text-sm text-gray-500 mt-1">标准差</p>
      </div>
    </div>
    
    <!-- 图表区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- 红球频率分布 -->
      <div class="bg-white rounded-xl p-6 shadow-md">
        <h3 class="text-xl font-bold text-gray-800 mb-4">红球频率分布</h3>
        <div class="h-80">
          <canvas ref="redFrequencyChart"></canvas>
        </div>
      </div>
      
      <!-- 蓝球频率分布 -->
      <div class="bg-white rounded-xl p-6 shadow-md">
        <h3 class="text-xl font-bold text-gray-800 mb-4">蓝球频率分布</h3>
        <div class="h-80">
          <canvas ref="blueFrequencyChart"></canvas>
        </div>
      </div>
      
      <!-- 红球遗漏追踪 -->
      <div class="bg-white rounded-xl p-6 shadow-md">
        <h3 class="text-xl font-bold text-gray-800 mb-4">红球遗漏追踪</h3>
        <div class="h-80">
          <canvas ref="redOmissionChart"></canvas>
        </div>
      </div>
      
      <!-- 奇偶比例分析 -->
      <div class="bg-white rounded-xl p-6 shadow-md">
        <h3 class="text-xl font-bold text-gray-800 mb-4">奇偶比例分析</h3>
        <div class="h-80">
          <canvas ref="oddEvenChart"></canvas>
        </div>
      </div>
    </div>
    
    <!-- 详细数据分析 -->
    <div class="bg-white rounded-xl p-6 shadow-md mb-8">
      <h3 class="text-xl font-bold text-gray-800 mb-4">详细数据分析</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- 红球统计 -->
        <div>
          <h4 class="font-bold text-gray-700 mb-3">红球统计</h4>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600">出现次数最多：</span>
              <span class="font-medium">06 (124次)</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">出现次数最少：</span>
              <span class="font-medium">27 (89次)</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">当前最热：</span>
              <span class="font-medium text-red-600">08, 15, 20</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">当前最冷：</span>
              <span class="font-medium text-blue-600">03, 14, 28</span>
            </div>
          </div>
        </div>
        
        <!-- 蓝球统计 -->
        <div>
          <h4 class="font-bold text-gray-700 mb-3">蓝球统计</h4>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600">出现次数最多：</span>
              <span class="font-medium">06 (89次)</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">出现次数最少：</span>
              <span class="font-medium">15 (67次)</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">当前最热：</span>
              <span class="font-medium text-red-600">09, 13</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">当前最冷：</span>
              <span class="font-medium text-blue-600">02, 11</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 数据导出 -->
    <div class="bg-white rounded-xl p-6 shadow-md">
      <h3 class="text-xl font-bold text-gray-800 mb-4">数据导出</h3>
      
      <div class="flex flex-wrap gap-4">
        <button 
          @click="exportData('csv')" 
          class="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center"
        >
          <i class="fa fa-download mr-2"></i>导出CSV
        </button>
        
        <button 
          @click="exportData('json')" 
          class="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center"
        >
          <i class="fa fa-code mr-2"></i>导出JSON
        </button>
        
        <button 
          @click="exportData('excel')" 
          class="bg-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-700 transition-colors flex items-center"
        >
          <i class="fa fa-file-excel-o mr-2"></i>导出Excel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
  name: 'Analysis',
  data() {
    return {
      charts: {},
      // 模拟数据
      redBallData: {
        labels: Array.from({ length: 33 }, (_, i) => i + 1),
        datasets: [{
          label: '出现次数',
          data: [
            98, 105, 87, 112, 95, 124, 101, 118, 93, 109,
            115, 99, 107, 89, 111, 103, 97, 114, 108, 116,
            96, 102, 110, 94, 106, 113, 89, 104, 92, 100,
            117, 91, 105
          ],
          backgroundColor: 'rgba(239, 68, 68, 0.8)',
          borderColor: 'rgba(239, 68, 68, 1)',
          borderWidth: 1
        }]
      },
      blueBallData: {
        labels: Array.from({ length: 16 }, (_, i) => i + 1),
        datasets: [{
          label: '出现次数',
          data: [78, 67, 82, 75, 84, 89, 72, 79, 86, 74, 67, 81, 85, 77, 67, 83],
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1
        }]
      }
    }
  },
  mounted() {
    this.initCharts()
  },
  beforeUnmount() {
    this.destroyCharts()
  },
  methods: {
    initCharts() {
      this.initRedFrequencyChart()
      this.initBlueFrequencyChart()
      this.initRedOmissionChart()
      this.initOddEvenChart()
    },
    
    initRedFrequencyChart() {
      const ctx = this.$refs.redFrequencyChart.getContext('2d')
      this.charts.redFrequency = new Chart(ctx, {
        type: 'bar',
        data: this.redBallData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: '出现次数'
              }
            },
            x: {
              title: {
                display: true,
                text: '号码'
              }
            }
          }
        }
      })
    },
    
    initBlueFrequencyChart() {
      const ctx = this.$refs.blueFrequencyChart.getContext('2d')
      this.charts.blueFrequency = new Chart(ctx, {
        type: 'bar',
        data: this.blueBallData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: '出现次数'
              }
            },
            x: {
              title: {
                display: true,
                text: '号码'
              }
            }
          }
        }
      })
    },
    
    initRedOmissionChart() {
      const ctx = this.$refs.redOmissionChart.getContext('2d')
      this.charts.redOmission = new Chart(ctx, {
        type: 'line',
        data: {
          labels: Array.from({ length: 33 }, (_, i) => i + 1),
          datasets: [{
            label: '当前遗漏',
            data: [5, 12, 28, 3, 15, 7, 22, 1, 18, 4, 9, 14, 6, 31, 2, 17, 11, 8, 25, 1, 16, 10, 3, 21, 7, 13, 34, 19, 27, 4, 10, 23, 8],
            borderColor: 'rgba(16, 185, 129, 1)',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: '遗漏期数'
              }
            },
            x: {
              title: {
                display: true,
                text: '号码'
              }
            }
          }
        }
      })
    },
    
    initOddEvenChart() {
      const ctx = this.$refs.oddEvenChart.getContext('2d')
      this.charts.oddEven = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['奇数', '偶数'],
          datasets: [{
            data: [52, 48],
            backgroundColor: [
              'rgba(239, 68, 68, 0.8)',
              'rgba(59, 130, 246, 0.8)'
            ],
            borderColor: [
              'rgba(239, 68, 68, 1)',
              'rgba(59, 130, 246, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      })
    },
    
    destroyCharts() {
      Object.values(this.charts).forEach(chart => {
        chart.destroy()
      })
    },
    
    exportData(format) {
      // 模拟数据导出
      console.log(`导出${format}格式数据`)
      this.showNotification(`数据已导出为${format}格式`, 'success')
    },
    
    showNotification(message, type = 'info') {
      console.log(`${type.toUpperCase()}: ${message}`)
    }
  }
}
</script>