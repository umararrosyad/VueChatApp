import { createRouter, createWebHistory } from 'vue-router'

// Import halaman
import ChatEmpty from '@/pages/ChatEmpty.vue'
import ChatRoom from '@/pages/ChatRoom.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: ChatEmpty,
  },
  {
    path: '/room/:id',
    name: 'chat',
    component: ChatRoom,
    props: true,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// ✅ Cek apakah selectedUser ada sebelum masuk ke room
router.beforeEach((to, from, next) => {
  const selectedUser = localStorage.getItem('selectedUser');

  if (to.name === 'chat' && !selectedUser) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router;
