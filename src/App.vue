<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- 导航栏 -->
    <nav class="bg-white shadow-md">
      <div class="container mx-auto px-4 py-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <i class="fa fa-brain text-blue-600 text-2xl"></i>
            <h1 class="text-xl font-bold text-gray-800">双色球AI智能选号助手</h1>
          </div>
          <div class="hidden md:flex space-x-6">
            <router-link to="/" class="text-gray-700 hover:text-blue-600 transition-colors">
              首页
            </router-link>
            <router-link to="/analysis" class="text-gray-700 hover:text-blue-600 transition-colors">
              数据分析
            </router-link>
            <router-link to="/prediction" class="text-gray-700 hover:text-blue-600 transition-colors">
              智能预测
            </router-link>
            <router-link to="/metaphysics" class="text-gray-700 hover:text-blue-600 transition-colors">
              玄学分析
            </router-link>
          </div>
          <button class="md:hidden text-gray-700" @click="toggleMobileMenu">
            <i class="fa fa-bars text-xl"></i>
          </button>
        </div>
      </div>
    </nav>

    <!-- 移动端菜单 -->
    <div v-if="mobileMenuOpen" class="md:hidden bg-white shadow-lg absolute w-full z-50">
      <div class="container mx-auto px-4 py-2">
        <router-link to="/" class="block py-2 text-gray-700 hover:text-blue-600" @click="toggleMobileMenu">
          首页
        </router-link>
        <router-link to="/analysis" class="block py-2 text-gray-700 hover:text-blue-600" @click="toggleMobileMenu">
          数据分析
        </router-link>
        <router-link to="/prediction" class="block py-2 text-gray-700 hover:text-blue-600" @click="toggleMobileMenu">
          智能预测
        </router-link>
        <router-link to="/metaphysics" class="block py-2 text-gray-700 hover:text-blue-600" @click="toggleMobileMenu">
          玄学分析
        </router-link>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <main class="container mx-auto px-4 py-6">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- 页脚 -->
    <footer class="bg-gray-800 text-white py-6 mt-12">
      <div class="container mx-auto px-4">
        <div class="text-center">
          <p>&copy; 2025 双色球AI智能选号助手 - Vue版本</p>
          <p class="text-gray-400 text-sm mt-2">本工具仅供娱乐参考，不保证中奖</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      mobileMenuOpen: false
    }
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    }
  }
}
</script>

<style>
/* 全局过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  line-height: 1.6;
}
</style>