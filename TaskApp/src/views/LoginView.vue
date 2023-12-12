<script setup lang="ts">
import axios from 'axios'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

const router = useRouter()

const userStore = useUserStore()

const errorMes = ref('')

const submitForm = async (url: any) => {
  const formData = getFormData()

  try {
    const response = await axios.post(`https://taskserver-2052e-8888.app.zerops.io/${url}`, formData)
    if (response.data != "err") {
      userStore.setUserId(response.data.id)
      userStore.setUserManager(response.data.manager)
      userStore.setTeamId(response.data.team)
      userStore.setTeamName(response.data.teamName)
      userStore.setUserName(response.data.name)
      router.push('/tasks')
    } else {
      errorMes.value = "Login failed. Please try again."
    }
  } catch (error) {
    errorMes.value = 'An error occurred while submitting the form.'
    console.error('Error submitting form:', error)
  }
}

const getFormData = () => {
  const formSelector = '#login-form input'
  const formElements = document.querySelectorAll(formSelector)

  const formData = {}

  formElements.forEach((input) => {
    const inputElement = input as HTMLInputElement
    ;(formData as any)[inputElement.name] = inputElement.value
  })

  return formData
}
</script>

<template>
  <main class="wrapper">
    <span class="error">{{ errorMes }}</span>
    <div class="form">
      <div class="tab-content">
        <div id="login">
          <div class="jc">
            <h1 class="text-lg">Login to your account</h1>
            <a href="#" @click="() => {router.push('/signup')}">Dont have an account?</a>
          </div>
          <form
            action="/"
            id="login-form"
            required
            method="post"
            @submit.prevent="() => submitForm('login')"
          >
            <div class="field-wrap ps">
              <input
                type="email"
                placeholder="Email Address"
                required
                autocomplete="off"
                name="Email"
              />
            </div>

            <div class="field-wrap">
              <input type="password" placeholder="Password" autocomplete="off" name="Password" />
              <a>Forgot password?</a>
            </div>

            <button type="submit" class="button button-block">Login</button>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  width: 100vw;
  font-family: 'Afacad', sans-serif;
}
body {
  background: linear-gradient(to bottom right, #1a120b, #181818);
}

* {
  color: #1a120b;
}

.wrapper {
  justify-content: center;
  display: flex;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom right, #1a120b, #000);
  flex-direction: column;
}

.error {
  display: flex;
  justify-content: center;
  color: #fff;
  width: 100vw;
}
.jc {
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
}

a {
  color: #1a120b;
  text-decoration: underline;
}

a:hover {
  cursor: pointer;
  background-color: transparent;
}

.form {
  background: #e5e5cb;
  padding: 40px;
  max-width: 600px;
  margin: 40px auto;
  border-radius: 4px;
  box-shadow: 0 4px 10px 4px rgba(19, 35, 47, 0.3);
}

input,
textarea {
  font-size: 22px;
  display: block;
  width: 100%;
  height: 100%;
  padding: 5px 10px;
  background: none;
  background-image: none;
  border: 1px solid #a0b3b0;
  color: #1a120b;
  border-radius: 0;
  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

input:focus,
textarea:focus {
  outline: 0;
  border-color: #1a120b;
}

textarea {
  border: 2px solid #a0b3b0;
  resize: vertical;
}

.field-wrap {
  position: relative;
  margin-bottom: 40px;
  width: 520px;
}

.ps {
  margin-bottom: 25px;
}

.button {
  border: 0;
  outline: none;
  border-radius: 0;
  padding: 15px 0;
  font-size: 2rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background: #1a120b;
  color: #fff;
  transition: all 0.5s ease;
}

.button:hover,
.button:focus {
  background: #1a120b;
}

.button-block {
  display: block;
  width: 100%;
  font-family: 'Afacad', sans-serif;
}

@media only screen and (max-width: 600px) {
  .field-wrap {
    width: 100%;
  }

  .form {
    margin: 0;
  }
}
</style>
