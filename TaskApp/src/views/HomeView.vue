<script setup lang="ts">
import MainButton from '../components/MainButton.vue'
import { useRouter } from 'vue-router';
const router = useRouter();

const handleButtonClick = (type:string) => {
  if (type == "Login"){
    router.push('/login');
  }
  else{
    router.push('/signup');
  }
}
</script>

<template>
  <div class="wrapper">
  <main class="main-text">Welcome to TaskApp</main>
  <div class="jc">
    <div class="buttons">
      <MainButton button-text="Login" @button-click='handleButtonClick("Login")'/>
      <MainButton button-text="Register" @button-click='handleButtonClick("Register")'/>
    </div>
  </div>
</div>
</template>

<style scoped>
main {
  color: #e5e5cb;
  font-size: 64px;
  display: flex;
  justify-content: center;
  width: 100vw;
  margin-bottom: 20px;
  animation: wiggle 2.5s infinite alternate;
}

body{
  background: linear-gradient(to bottom right, #1A120B, #181818);
}


@keyframes wiggle {
  to {
    transform: translateY(-5px);
  }
}

.buttons {
  display: flex;
  justify-content: space-between;
  width: 350px;
}

.jc {
  justify-content: center;
  display: flex;
}
.wrapper{
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(to bottom right, #1A120B, #000) ;

}
@media only screen and (max-width: 768px) {
  main {
  font-size: 38px;
  }
  .buttons {
  width: 300px;
}
}
</style>
