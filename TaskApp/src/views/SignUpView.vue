<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()

const activeTab = ref('signup');
const errorMes = ref('');
const codeInputValue = ref('');

const switchTab = (tab:any) => {
  activeTab.value = tab;
  console.log(activeTab)
};

const submitForm = async (url:any) => {
  const formData = getFormData();

  try {
    const response = await axios.post(`https://taskserver-2052e-8888.app.zerops.io/${url}`, formData);

    if (url === 'new_team' && String(response.data).length === 4) {
      codeInputValue.value = String(response.data);
    } else {
      errorMes.value = response.data;
      console.log(response.data);
    }
  } catch (error) {
    errorMes.value = 'An error occurred while submitting the form.';
    console.error('Error submitting form:', error);
  }
};

const getFormData = () => {
  const formSelector = activeTab.value === 'signup' ? '#signup-form input' : '#new-team-form input';
  const formElements = document.querySelectorAll(formSelector);

  const formData = {};

  formElements.forEach((input) => {
    const inputElement = input as HTMLInputElement;
    (formData as any)[inputElement.name] = inputElement.value;
  });

  return formData;
};
</script>

<template>
  <main class="wrapper">
    <span class="error">{{ errorMes }}</span>
    <div class="form">
      <ul class="tab-group">
        <li class="tab" :class="{ active: activeTab === 'signup' }">
          <a href="#signup" @click="() => switchTab('signup')">New User</a>
        </li>
        <li class="tab" :class="{ active: activeTab === 'new-team' }">
          <a href="#new-team" @click="() => switchTab('new-team')">New Team</a>
        </li>
      </ul>
      <div class="tab-content">
        <div id="signup-content" v-show="activeTab === 'signup'">
          <div class="jc">
            <h1 class="text-lg">Register a new account</h1>
            <a href="#" @click="() => {router.push('/login')}">Already a user?</a>
          </div>

          <form id="signup-form" action="/" method="post" @submit.prevent="() => submitForm('register')">
            <div class="top-row">
              <div class="field-wrap">
                <input type="text" placeholder="First Name" required autocomplete="off" name="Name" />
              </div>

              <div class="field-wrap">
                <input type="text" placeholder="Last Name" required autocomplete="off" name="Surname" />
              </div>
            </div>

            <div class="field-wrap">
              <input type="email" placeholder="Email Address" required autocomplete="off" name="Email" />
            </div>

            <div class="field-wrap ps">
              <input type="password" placeholder="Password" required autocomplete="off" name="Password" />
            </div>

            <span class="no-team">Don't have a team code? Ask your manager or create a new team. <a>Forgot Team Code?</a></span>

            <div class="field-wrap">
              <input type="password" placeholder="Team Code" required autocomplete="off" name="Code" />
            </div>

            <button type="submit" class="button button-block">Register</button>
          </form>
        </div>

        <div id="new-team-content" v-show="activeTab === 'new-team'">
          <div class="jc">
            <h1>Create a new team</h1>
            <a href="/login">Already a user?</a>
          </div>

          <form id="new-team-form" action="/" method="post" @submit.prevent="() => submitForm('new_team')">
            <div class="field-wrap ps">
              <input type="text" placeholder="Team Name" required autocomplete="off" name="Name" />
            </div>

            <span class="no-team">Any account that registers to your team with this email will become a manager account.</span>

            <div class="field-wrap">
              <input type="email" placeholder="Manager Email" required autocomplete="off" name="Email" />
            </div>

            <div class="field-wrap ps">
              <input type="password" placeholder="Recovery Password" autocomplete="off" name="Password" />
            </div>

            <span class="no-team">Your team code will generate here, keep it somewhere safe!</span>

            <div class="field-wrap">
              <input v-model="codeInputValue" placeholder="0000" autocomplete="off" disabled />
            </div>

            <button type="submit" class="button button-block">Generate Code</button>
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

.wrapper{
  justify-content: center;
  display: flex;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom right, #1A120B, #000) ;
  flex-direction: column;
}

.error{
  display: flex;
  justify-content: center;
  color: #fff;
  width: 100vw;
}
*,
*:before,
*:after {
  box-sizing: border-box;
}
html {
  overflow-y: scroll;
}

.button-block:hover {
  cursor: pointer;
}

.form {
  background: #e5e5cb;
  padding: 40px;
  max-width: 600px;
  margin: 40px auto;
  border-radius: 4px;
  box-shadow: 0 4px 10px 4px rgba(19, 35, 47, 0.3);
}
.tab-group {
  list-style: none;
  padding: 0;
  margin: 0 0 40px 0;
}
.tab-group:after {
  content: '';
  display: table;
  clear: both;
}
.tab-group li a {
  display: block;
  text-decoration: none;
  padding: 15px;
  background: #d5cea3;
  color: #000;
  font-size: 20px;
  float: left;
  width: 50%;
  text-align: center;
  cursor: pointer;
  transition: 0.5s ease;
}
.tab-group li a:hover {
  background: #1a120b;
  color: #fff;
}
.tab-group .active a {
  background: #1a120b;
  color: #fff;
}
h1 {
  text-align: center;
  color: #1a120b;
  font-weight: 300;
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
.top-row:after {
  content: '';
  display: table;
  clear: both;
}
.top-row > div {
  float: left;
  width: 48%;
  margin-right: 4%;
}
.top-row > div:last-child {
  margin: 0;
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
.forgot {
  margin-top: -20px;
  text-align: right;
}
.no-team {
  color: #1a120b;
  font-size: 13px;
}
.no-team a {
  color: #1a120b;
  text-decoration: underline;
}
.no-team a:hover {
  color: #1a120b;
  text-decoration: underline;
  background-color: transparent;
  cursor: pointer;
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

@media only screen and (max-width: 600px) {
  .field-wrap {
    width: 100%; /* Adjust the width for better mobile responsiveness */
  }

  .form {
    margin: 0;
  }
}
</style>
