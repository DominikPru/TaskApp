<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'
import { Bars3Icon, XMarkIcon, CheckIcon} from '@heroicons/vue/24/outline'

const props = defineProps({
  taskName: String,
  taskDesc: String,
  taskAsignee: String,
  taskId: String,
  taskStatus: String,
  taskFor: String
})

const emit = defineEmits(['update-task-status', 'remove-task'])

const isVisible = ref(true)

const updateTaskStatus = (status, taskId) => {
  isVisible.value = false
  emit('update-task-status', status, taskId)
}

const removeTask = (taskId) => {
  isVisible.value = false
  emit('remove-task', taskId)
}


defineExpose({
  isVisible,
  updateTaskStatus
})
</script>

<template>
  <div v-if="isVisible"
    class="w-full lg:w-1/3 h-36 bg-cream-white lg:m-10 m-5 rounded flex justify-center items-center flex-col p-5 drop-shadow"
  >
    <div 
      :class="props.taskStatus ? 'cursor-pointer w-full': 'w-full'" 
      @click="props.taskStatus ? removeTask(props.taskId) : null"
    >
      <div class="flex flex-col items-center">
        <span class="text-2xl text-center">{{ props.taskName }}</span>
        <span class="text-center mb-1">{{ props.taskDesc }}</span>
        <span class="text-center mb-2 text-xs" v-if="props.taskStatus">Assigned for: {{ props.taskFor }}</span>
        <span class="text-center mb-3 text-xs" v-else>Assigned by: {{ props.taskAsignee }}</span>
   

      <div class="flex justify-center flex-row border-gray-600 border-t w-1/2">
        <div v-if="props.taskStatus" class="p-1">
          Status: {{ props.taskStatus }}
        </div>
        <div v-else class="flex pt-2">
          <CheckIcon class="w-7 mr-6 cursor-pointer" @click="updateTaskStatus('completed', props.taskId)" />
          <XMarkIcon class="w-7 cursor-pointer" @click="updateTaskStatus('cancelled', props.taskId)" />
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<style scoped>

</style>