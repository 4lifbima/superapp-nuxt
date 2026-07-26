<template>
  <footer class="border-t border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-[#08080C] py-12 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <!-- Brand Info -->
        <div class="md:col-span-2 space-y-4">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00DC82] to-[#C9A84C] p-0.5">
              <div class="w-full h-full bg-[#0A0A0F] rounded-[6px] flex items-center justify-center">
                <span class="text-[#00DC82] font-black text-sm">S</span>
              </div>
            </div>
            <span class="font-bold text-xl text-gray-900 dark:text-white flex items-center gap-1">
              SuperApp <AppIcon icon="lucide:sparkles" class="w-4 h-4 text-[#00DC82]" />
            </span>
          </div>
          <p class="text-sm text-gray-600 dark:text-zinc-400 max-w-sm leading-relaxed">
            Platform web kreatif modern untuk membuat Photo Booth berkelas dan Twibbon elegan dalam sekejap tanpa batas.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-semibold text-sm uppercase tracking-wider text-gray-900 dark:text-white mb-3">Fitur Utama</h4>
          <ul class="space-y-2 text-sm text-gray-600 dark:text-zinc-400">
            <li>
              <NuxtLink to="/photo-booth" class="hover:text-[#00DC82] transition-colors flex items-center gap-1.5">
                <AppIcon icon="lucide:camera" class="w-4 h-4" /> Photo Booth Online
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/generate-twibbon" class="hover:text-[#00DC82] transition-colors flex items-center gap-1.5">
                <AppIcon icon="lucide:image" class="w-4 h-4" /> Twibbon Generator
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/" class="hover:text-[#00DC82] transition-colors flex items-center gap-1.5">
                <AppIcon icon="lucide:sparkles" class="w-4 h-4" /> Template Terbaru
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Design Principles -->
        <div>
          <h4 class="font-semibold text-sm uppercase tracking-wider text-gray-900 dark:text-white mb-3">Filosofi Desain</h4>
          <ul class="space-y-2 text-sm text-gray-600 dark:text-zinc-400">
            <li class="flex items-center gap-1.5"><AppIcon icon="lucide:check-circle-2" class="w-4 h-4 text-[#00DC82]" /> Clean & Minimalist</li>
            <li class="flex items-center gap-1.5"><AppIcon icon="lucide:check-circle-2" class="w-4 h-4 text-[#C9A84C]" /> Elegant & Modern</li>
            <li class="flex items-center gap-1.5"><AppIcon icon="lucide:check-circle-2" class="w-4 h-4 text-[#00DC82]" /> Mobile First Responsive</li>
            <li class="flex items-center gap-1.5"><AppIcon icon="lucide:check-circle-2" class="w-4 h-4 text-[#C9A84C]" /> High-Resolution Export</li>
          </ul>
        </div>
      </div>

      <div class="pt-8 border-t border-gray-200 dark:border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-zinc-500">
        <p>© 2026 SuperApp Inc. Hak Cipta Dilindungi Undang-Undang.</p>
        <p class="flex items-center gap-1">
          Dibuat dengan <AppIcon icon="lucide:heart" class="w-3.5 h-3.5 text-red-500 fill-red-500" /> Created by <a href="https://alifbima.my.id" target="_blank" class="text-[#00DC82] hover:text-[#00DC82] transition-colors flex items-center gap-1.5">Alif Bima Pradana</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import AppIcon from '~/components/common/AppIcon.vue'
</script>
