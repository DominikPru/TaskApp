<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  buttonText: String
});

const emit = defineEmits();

const submitForm = () => {
  emit('button-click');
};
</script>

<template>
  <div class="wrap">
    <button class="button" @click="submitForm">{{ buttonText }}</button>
  </div>
</template>

<style scoped>
.wrap {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button {
  width: 140px;
  height: 45px;
  font-size: 14px;
  font-family: 'Afacad', sans-serif;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #e5e5cb;
  background-color: #3c2a21;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
}

.button:hover {
  background-color: #e5e5cb;
  box-shadow: 0px 15px 20px rgba(229, 229, 203, 0.4);
  color: #1a120b;
  transform: translateY(-7px);
}
</style>
