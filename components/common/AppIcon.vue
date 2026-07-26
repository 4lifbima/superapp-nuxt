<template>
  <component :is="iconComponent" v-if="iconComponent" class="inline-block" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import * as LucideIcons from '@lucide/vue'

const props = defineProps<{
  icon: string
}>()

// Map icon names (e.g. "lucide:camera" -> "Camera", "lucide:home" -> "Home")
const iconComponent = computed(() => {
  let name = props.icon
  if (name.startsWith('lucide:')) {
    name = name.replace('lucide:', '')
  } else if (name.startsWith('tabler:')) {
    name = name.replace('tabler:', '')
  }

  // Convert kebab-case to PascalCase (e.g. "rotate-ccw" -> "RotateCcw", "check-circle-2" -> "CheckCircle2")
  const pascalName = name
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')

  // Alias mappings
  if (pascalName === 'Image') return LucideIcons.Image
  if (pascalName === 'SearchZoomIn') return LucideIcons.ZoomIn
  if (pascalName === 'Wand2') return LucideIcons.Wand2
  if (pascalName === 'RotateCcw') return LucideIcons.RotateCcw
  if (pascalName === 'CheckCircle2') return LucideIcons.CheckCircle2

  return (LucideIcons as any)[pascalName] || LucideIcons.Sparkles
})
</script>
