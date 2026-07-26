<template>
  <div class="space-y-16 pb-16">
    <!-- Hero Section -->
    <section class="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      <!-- Background Decorative Lights -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#00DC82]/20 to-[#C9A84C]/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">

        <h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white max-w-4xl mx-auto leading-[1.1]">
          Buat Foto Kreatif & Twibbon Bergaya <span class="text-gradient-primary">Mewah</span> & <span class="text-gradient-primary">Elegan</span>
        </h1>

        <p class="text-base sm:text-xl text-gray-600 dark:text-zinc-300 max-w-2xl mx-auto font-medium leading-relaxed">
          Satu aplikasi serba bisa untuk mengabadikan momen berharga dengan bingkai photo booth eksklusif dan twibbon HD tanpa ribet.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-wrap items-center justify-center gap-4 pt-4">
          <NuxtLink
            to="/photo-booth"
            class="px-8 py-4 rounded-2xl bg-[#00DC82] hover:bg-[#00C573] text-zinc-950 font-extrabold text-base shadow-xl glow-primary transition-all hover:scale-105 flex items-center gap-2"
          >
            <AppIcon icon="lucide:camera" class="w-5 h-5" /> Buka Photo Booth
          </NuxtLink>

          <NuxtLink
            to="/generate-twibbon"
            class="px-8 py-4 rounded-2xl bg-white dark:bg-zinc-900 hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-900 dark:text-white font-extrabold text-base border border-gray-200 dark:border-zinc-800 shadow-xl transition-all hover:scale-105 flex items-center gap-2"
          >
            <AppIcon icon="lucide:image" class="w-5 h-5" /> Generate Twibbon
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Features Showcase Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div class="text-center space-y-2">
        <h2 class="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-white flex items-center justify-center gap-2">
          <AppIcon icon="lucide:sparkles" class="w-6 h-6 text-[#00DC82]" /> Fitur Unggulan SuperApp <AppIcon icon="lucide:sparkles" class="w-6 h-6 text-[#C9A84C]" />
        </h2>
        <p class="text-sm sm:text-base text-gray-500 dark:text-zinc-400 max-w-lg mx-auto">
          Dirancang dengan estetika visual tinggi, tanpa template murahan atau efek generik.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Feature 1: Photo Booth -->
        <div class="glass-card p-8 rounded-3xl space-y-4 relative overflow-hidden group">
          <div class="w-14 h-14 rounded-2xl bg-[#00DC82]/10 border border-[#00DC82]/30 flex items-center justify-center text-[#00DC82] group-hover:scale-110 transition-transform">
            <AppIcon icon="lucide:camera" class="w-7 h-7" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#00DC82] transition-colors">
            Photo Booth Modern
          </h3>
          <p class="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">
            Dukung upload gambar & langsung tangkap kamera webcam. 6 bingkai arsitektural presisi dan 8 filter warna berkualitas studio.
          </p>
          <NuxtLink to="/photo-booth" class="inline-flex items-center gap-1.5 text-xs font-bold text-[#00DC82] hover:underline pt-2">
            Mulai Photo Booth <AppIcon icon="lucide:arrow-right" class="w-3.5 h-3.5" />
          </NuxtLink>
        </div>

        <!-- Feature 2: Twibbon Generator -->
        <div class="glass-card p-8 rounded-3xl space-y-4 relative overflow-hidden group">
          <div class="w-14 h-14 rounded-2xl bg-[#C9A84C]/10 border border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C] group-hover:scale-110 transition-transform">
            <AppIcon icon="lucide:image" class="w-7 h-7" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#C9A84C] transition-colors">
            Twibbon Generator HD
          </h3>
          <p class="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">
            8 tema koleksi Twibbon lengkap (Merdeka, Gold, Minimalist, Cyber, Floral). Kontrol geser drag, zoom, rotasi & transparansi presisi.
          </p>
          <NuxtLink to="/generate-twibbon" class="inline-flex items-center gap-1.5 text-xs font-bold text-[#C9A84C] hover:underline pt-2">
            Buat Twibbon <AppIcon icon="lucide:arrow-right" class="w-3.5 h-3.5" />
          </NuxtLink>
        </div>

        <!-- Feature 3: Fast & High Quality -->
        <div class="glass-card p-8 rounded-3xl space-y-4 relative overflow-hidden group">
          <div class="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
            <AppIcon icon="lucide:zap" class="w-7 h-7" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-cyan-400 transition-colors">
            Cepat & Bebas Watermark
          </h3>
          <p class="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">
            Pengolahan langsung di peramban (Client Canvas Processing). Unduh hasil gambar PNG (transparan) atau JPG resolusi tinggi 1080p.
          </p>
          <span class="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 pt-2">
            <AppIcon icon="lucide:check-circle-2" class="w-4 h-4" /> Instant Export Ready
          </span>
        </div>
      </div>
    </section>

    <!-- Testimonial Section -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="glass-card p-8 sm:p-12 rounded-3xl text-center space-y-6 bg-gradient-to-b from-gray-50/50 to-emerald-500/5 dark:from-zinc-900/50 dark:to-emerald-500/5 border border-emerald-500/20">
        <div class="flex items-center justify-center gap-1 text-[#C9A84C]">
          <AppIcon v-for="i in 5" :key="i" icon="lucide:star" class="w-5 h-5 fill-[#C9A84C]" />
        </div>
        <blockquote class="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white italic leading-relaxed">
          "SuperApp benar-benar mengubah standar aplikasi photo booth dan twibbon online. Tampilannya sangat elegan, cepat, dan hasilnya jernih tanpa ada iklan mengganggu!"
        </blockquote>
        <div class="flex flex-col items-center">
          <span class="font-bold text-sm text-gray-900 dark:text-white">Mariska Putri</span>
          <span class="text-xs text-[#00DC82] font-medium">Content Creator & Event Specialist</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import AppIcon from '~/components/common/AppIcon.vue'
</script>
