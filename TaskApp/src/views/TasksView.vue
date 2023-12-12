
<script setup lang="ts">
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from '@headlessui/vue';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';
import { useUserStore } from '../stores/user';
import TaskContainer from '../components/TaskContainer.vue';
import { onMounted, ref } from 'vue'
import axios from 'axios';
import { useRouter } from 'vue-router'
const router = useRouter()

const userStore = useUserStore()

const taskData = ref<any>([])

onMounted(fetchTasks)

const user = {
  imageUrl: 'https://i.pinimg.com/originals/c0/c2/16/c0c216b3743c6cb9fd67ab7df6b2c330.jpg'
}
const navigation = [{ name: 'Tasks', href: '#', current: true, onClick: () => {router.push('/tasks')}}]
if (userStore.isManager === true) {
  navigation.push(
    { name: 'New Task', href: '#', current: false, onClick: () => {router.push('/new-task')}},
    { name: 'Assigned Tasks', href: '#', current: false, onClick: () => {router.push('/assigned-tasks')}}
  )
}
const userNavigation = [
  { name: 'Your Profile (todo)', href: '#' },
  { name: 'Settings (todo)', href: '#' },
  { name: 'Sign out', href: '#', onClick: () => {userStore.logout(); router.push('/')}}
]

async function fetchTasks() {
  try {
    const response = await axios.get(`https://taskserver-2052e-8888.app.zerops.io/get_tasks`, {
      params: {
        id: userStore.userId
      }
    })
    taskData.value = response.data.filter(task => task.status !== 'completed' && task.status !== 'cancelled')
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}

function updateTaskStatus(status, taskId) {
  axios.post(`https://taskserver-2052e-8888.app.zerops.io/set_status`, {
    id: taskId,
    status: status
  })
  .then(response => {
    console.log("Id: " + taskid);
    fetchTasks()
  })
  .catch(error => {
    console.error(error);
  });
}

</script>


<template>
  <div v-if="userStore.userId != null">
    <div class="min-h-full">
      <Disclosure as="nav" class="bg-dark-brown" v-slot="{ open }">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex h-16 items-center justify-between">
            <div class="flex items-center">
              <div class="hidden md:block">
                <div class="flex items-baseline space-x-4">
                  <span class="pr-8 b border-r border-gray-500">{{ userStore.teamName }}</span>
                  <a
                    v-for="item in navigation"
                    :key="item.name"
                    :href="item.href"
                    :class="[
                      item.current
                        ? 'bg-darker-brown text-white'
                        : 'text-ligher-brown hover:bg-lighter-brown hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium'
                    ]"
                    @click="item.onClick"
                    :aria-current="item.current ? 'page' : undefined"
                    >{{ item.name }}</a
                  >
                </div>
              </div>
            </div>
            <div class="hidden md:block">
              <div class="ml-4 flex items-center md:ml-6">
                <!-- Profile dropdown -->
                <Menu as="div" class="relative ml-3">
                  <div>
                    <MenuButton
                      class="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span class="absolute -inset-1.5" />
                      <span class="sr-only">Open user menu</span>
                      <img class="h-8 w-8 rounded-full" :src="user.imageUrl" alt="" />
                    </MenuButton>
                  </div>
                  <transition
                    enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                  >
                    <MenuItems
                      class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                        <a
                          :href="item.href"
                          :class="[
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700'
                          ]"
                          @click="item.onClick"
                          >{{ item.name }}</a
                        >
                      </MenuItem>
                    </MenuItems>
                  </transition>
                </Menu>
              </div>
            </div>
            <div class="-mr-2 flex md:hidden">
              <!-- Mobile menu button -->
              <DisclosureButton
                class="relative inline-flex items-center justify-center rounded-md bg-darker-brown p-2 text-gray-400 hover:bg-lighter-brown hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-lighter-brown"
              >
                <span class="absolute -inset-0.5" />
                <span class="sr-only">Open main menu</span>
                <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
              </DisclosureButton>
            </div>
          </div>
        </div>

        <DisclosurePanel class="md:hidden">
          <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <DisclosureButton
              v-for="item in navigation"
              :key="item.name"
              as="a"
              :href="item.href"
              :class="[
                item.current
                  ? 'bg-darker-brown text-white hover:bg-lighter-brown hover:text-white'
                  : 'text-gray-400 hover:bg-lighter-brown hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium'
              ]"
              @click="item.onClick"
              :aria-current="item.current ? 'page' : undefined"
              >{{ item.name }}</DisclosureButton
            >
          </div>
          <div class="border-t border-gray-700 pb-3 pt-4">
            <div class="flex items-center px-5">
              <div class="flex-shrink-0">
                <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt="" />
              </div>
            </div>
            <div class="mt-3 space-y-1 px-2">
              <DisclosureButton
                v-for="item in userNavigation"
                :key="item.name"
                as="a"
                :href="item.href"
                class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-lighter-brown hover:text-white"
                >{{ item.name }}</DisclosureButton
              >
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>

      <header class="bg-cream-white shadow">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold tracking-tight text-gray-800">Your Tasks</h1>
        </div>
      </header>
      <main>
        <div
          class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 text-gray-800 p-5 justify-center flex flex-wrap"
        >
        <TaskContainer
      v-for="(task, index) in taskData"
      :key="index"
      :taskName="task.name"
      :taskDesc="task.desc"
      :taskAsignee="task.asignee"
      :taskId="task._id"
      @update-task-status="updateTaskStatus"
    />
        </div>
      </main>
    </div>
  </div>
  <div v-if="userStore.userId == null" class="text-gray-800">Login to access this page</div>
</template>

<style scoped>
main {
  background: #e5e5cb;
}
</style>

<style>
body{
  background: #e5e5cb;
  }
</style>
