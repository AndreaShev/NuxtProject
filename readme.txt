https://www.youtube.com/watch?v=O0W3cbgrFfg&list=PL0lO_mIqDDFVGFegHelUnstua62WcR47g
1. Чтобы создать стандартный проект на Nuxt.js, выполните следующие шаги:

### 1. **Предварительные требования**
- Установите [Node.js](https://nodejs.org/) (версия 18+)
- Поддерживаемые пакетные менеджеры: `npm`, `yarn` или `pnpm`

---

### 2. **Создание проекта**
```bash
# Самый простой способ (с интерактивным выбором настроек):
npx nuxi@latest init <project-name>
```
Замените `<project-name>` на название вашей папки проекта (например, `my-app`).

---

### 3. **Интерактивная настройка**
После запуска команды вам предложат выбрать:
- **Имя проекта** (по умолчанию: `nuxt-app`)
- **Пакетный менеджер** (npm, yarn, pnpm)
- **UI-фреймворк** (Tailwind CSS, UnoCSS и др. или "None")
- **Модули** (TypeScript, ESLint, Prettier и т.д.)
- **Функции** (SSR, PWA, Image Optimization)
- **Тестовый фреймворк** (Vitest, Cypress)

> 💡 Совет: Для стандартного проекта выберите `Tailwind CSS`, `TypeScript`, `ESLint`.

---

### 4. **Запуск проекта**
```bash
cd <project-name>  # Переход в папку проекта
npm install         # Установка зависимостей
npm run dev         # Запуск dev-сервера

```
После этого откройте в браузере: `http://localhost:3000`
npm run dev -- -o    # Открытие сервера
---

### 5. **Структура папок**
Основные директории после создания:
```
├── app.vue         # Главный компонент приложения
├── nuxt.config.ts  # Конфигурация Nuxt
├── public/         # Статические файлы (иконки, изображения)
├── server/         # API-роуты и серверные обработчики
└── components/     # Глобальные компоненты (автоимпорт)
```

---

### 6. **Пример страницы**
1. Создайте файл `pages/index.vue`:
```vue
<template>
  <div class="bg-gray-100 min-h-screen">
    <h1 class="text-4xl font-bold text-center py-20">
      Привет, Nuxt 3!
    </h1>
    <Counter />
  </div>
</template>
```

2. Добавьте компонент `components/Counter.vue`:
```vue
<script setup>
const count = ref(0)
</script>

<template>
  <div class="text-center">
    <button 
      @click="count++"
      class="px-4 py-2 bg-blue-500 text-white rounded"
    >
      Кликов: {{ count }}
    </button>
  </div>
</template>
```

---

### 7. **Деплой**
Соберите проект для продакшена:
```bash
npm run build
```

Для статического хостинга (Netlify/Vercel):
```bash
npx nuxi generate  # Генерация статического сайта
```

---

### 8. **Полезные команды**
| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск dev-сервера |
| `npm run build` | Сборка для продакшена |
| `npm run start` | Запуск собранного проекта |
| `npm run generate` | Генерация статического сайта |

---

### ⚙️ **Настройки в `nuxt.config.ts`**
Пример конфигурации:
```ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    public: {
      apiKey: process.env.NUXT_API_KEY
    }
  }
})
```

---

### Советы для новичков:
1. Используйте **автоимпорт компонентов** – просто кладите `.vue`-файлы в `components/`.
2. Для API-роутов создавайте файлы в `server/api/` (например, `server/api/hello.ts`).
3. Для глобального CSS добавьте файл в `assets/css/main.css` и импортируйте его в `nuxt.config.ts`.

Проект готов! Документация: [Nuxt 3 Docs](https://nuxt.com/docs)










2. ### 🗺️ Маршрутизация в Nuxt.js (на основе файловой системы)

В Nuxt используется **автоматическая генерация маршрутов** на основе структуры папки `pages/`. Это ключевая особенность фреймворка!
Если делаем одностраничный сайт то все можно писать в app.vue. Если нет, то лучше его удалить.
---

#### 📂 Базовые правила:
1. **Файл `index.vue`** → Корень маршрута  
   `pages/index.vue` → `/`

2. **Обычные файлы** → Прямые маршруты  
   `pages/about.vue` → `/about`

3. **Динамические параметры**  
   `pages/user/[id].vue` → `/user/123`  
   (Доступ через `const { id } = useRoute().params`)

4. **Вложенные папки** → Вложенные маршруты  
   ```
   pages/
   └── products/
       ├── index.vue    → /products
       └── [slug].vue  → /products/chair-2023
   ```

---

#### 🌟 Особые случаи:

### 1. Динамические маршруты
```bash
pages/
├── blog/
│   ├── [category]/
│   │   └── [id].vue  → /blog/tech/42
│   └── [...slug].vue → /blog/2023/news (slug = ['2023','news'])
```

**Доступ к параметрам:**
```vue
<script setup>
const route = useRoute()
console.log(route.params.category) // 'tech'
console.log(route.params.id)       // '42'
</script>
```

### 2. Группировка маршрутов (Nuxt 3)
Используйте папки в `()`, чтобы избежать вложенности URL:
```bash
pages/
└── (admin)/
    ├── dashboard.vue → /dashboard (не /admin/dashboard!)
    └── settings.vue
```

### 3. Страница 404
```bash
pages/
└── [...notFound].vue → Перехват всех несуществующих путей
```
```vue
<template>
  <div>Страница не найдена!</div>
</template>
```

---

#### 🧭 Навигация между страницами

**Компонент `<NuxtLink>`:**
```vue
<NuxtLink to="/about">О нас</NuxtLink>
<NuxtLink :to="{ path: '/user', query: { tab: 'profile' }}">Профиль</NuxtLink>
```

**Программная навигация:**
```js
const router = useRouter()
router.push('/login') 
// Или с параметрами:
router.push({ 
  path: '/product/chair',
  query: { color: 'black' }
})
```

---

#### ⚙️ Дополнительные возможности

### 1. Middleware
Создайте файл в `middleware/` для обработки перед загрузкой страницы:
```ts
// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useAuthStore()
  if (!user.isLoggedIn) return navigateTo('/login')
})
```
Использование в странице:
```vue
<script setup>
definePageMeta({
  middleware: ['auth']
})
</script>
```

### 2. Валидация параметров
```vue
<script setup>
definePageMeta({
  validate: async (route) => {
    // Проверяем, что id - число
    return /^\d+$/.test(route.params.id)
  }
})
</script>
```

### 3. Специальные страницы
- `app.vue` → Главный компонент приложения
- `error.vue` → Глобальная страница ошибок

---

#### 🏗️ Пример структуры:
```
pages/
├── index.vue
├── about.vue
├── user/
│   ├── [id].vue
│   └── settings.vue
├── blog/
│   ├── index.vue
│   └── [...slug].vue
└── (admin)/
    ├── dashboard.vue
    └── analytics.vue
```

---

#### 💡 Ключевые преимущества:
1. **Автоматическая генерация** – не нужно прописывать маршруты вручную
2. **Динамические параметры** – гибкая работа с URL
3. **Zero-config** – работает из коробки
4. **Код-сплиттинг** – автоматическая оптимизация загрузки
5. **SSR-совместимость** – корректная работа на сервере и клиенте

Документация: [Nuxt Routing](https://nuxt.com/docs/guide/directory-structure/pages)










3. ### 🎨 Шаблоны (Layouts) и Стили в Nuxt.js

#### 📐 **Шаблоны (Layouts)**
Шаблоны — это компоненты, которые определяют **общую структуру страниц** (например, хедер, футер, сайдбар). Они позволяют избежать дублирования кода.

---

### **1. Создание шаблона**
1. Создайте папку `layouts/` в корне проекта  
2. Добавьте файл шаблона (например, `default.vue`):
```vue
<template>
  <div class="layout">
    <header>
      <NavBar />
    </header>
    
    <!-- Сюда подставляется содержимое страницы -->
    <slot /> 
    
    <footer>
      <FooterComponent />
    </footer>
  </div>
</template>

<script setup>
// Компоненты автоматически импортируются из папки components/
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
```

---

### **2. Использование шаблонов**
**Способ 1:** Все страницы по умолчанию используют `layouts/default.vue`  
**Способ 2:** Кастомный шаблон для страницы:
```vue
<!-- pages/about.vue -->
<script setup>
definePageMeta({
  layout: 'custom'
})
</script>
```
Создайте файл `layouts/custom.vue` для этого шаблона.

---

### **3. Специальные шаблоны**
- **`layouts/error.vue`**  
  Автоматически используется для страниц ошибок:
```vue
<template>
  <div class="error-page">
    <h1>{{ error.statusCode }}</h1>
    <p>{{ error.message }}</p>
    <button @click="handleError">На главную</button>
  </div>
</template>

<script setup>
const props = defineProps(['error'])
const handleError = () => clearError({ redirect: '/' })
</script>
```

---

## 💅 **Добавление стилей**
Nuxt поддерживает все современные методы работы со стилями.

---

### **1. Глобальные стили**
**Шаг 1:** Создайте файл стилей в `assets/css/` (например, `global.css`):
```css
/* assets/css/global.css */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

:root {
  --primary: #42b983;
}

body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
}
```

**Шаг 2:** Подключите в `nuxt.config.ts`:
```ts
export default defineNuxtConfig({
  css: ['@/assets/css/global.css']
})
```

---

### **2. Локальные стили в компонентах**
Используйте тег `<style>` в SFC-компонентах:
```vue
<style scoped> /* scoped = стили только для этого компонента */
.header {
  background: var(--primary);
  padding: 1rem;
}

/* Глобальные стили внутри компонента */
<style global>
body {
  background: #f0f0f0;
}
</style>
```

---

### **3. CSS-препроцессоры**
**Шаг 1:** Установите нужный пакет:
```bash
npm install sass less stylus --save-dev
```

**Шаг 2:** Используйте в компонентах:
```vue
<style lang="scss" scoped>
$primary-color: #42b983;

.header {
  background: lighten($primary-color, 10%);
  
  &__title {
    font-size: 2rem;
  }
}
</style>
```

---

### **4. CSS-модули**
Добавьте суффикс `.module` к файлу стилей:
```vue
<script setup>
import styles from './styles.module.css'
</script>

<template>
  <div :class="styles.container">
    <p :class="styles.text">Привет!</p>
  </div>
</template>
```

---

### **5. Интеграция с Tailwind CSS**
**Шаг 1:** Установите модуль:
```bash
npx nuxi module add tailwindcss
```

**Шаг 2:** Создайте `tailwind.config.js`:
```js
module.exports = {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**Шаг 3:** Добавьте базовые стили в `assets/css/tailwind.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### **6. Динамические стили**
Используйте реактивные стили:
```vue
<script setup>
const isActive = ref(true)
const color = ref('#42b983')
</script>

<template>
  <div 
    :class="{ active: isActive }" 
    :style="{ backgroundColor: color }"
  >
    Элемент
  </div>
</template>

<style>
.active {
  border: 2px solid currentColor;
}
</style>
```

---

### **7. Полезные модули для стилей**
- **🔹 UnoCSS** - атомарный CSS-движок  
  `npx nuxi module add @unocss/nuxt`
- **🎨 Color Mode** - тёмная/светлая тема  
  `npx nuxi module add @nuxtjs/color-mode`
- **🖼️ Image Optimization**  
  `npx nuxi module add @nuxt/image`

---
8. Подключение Бутстрапа
npx nuxi@latest module add usebootstrap
в nuxt.config.ts 
export default defineNuxtConfig({
  modules: [
    'usebootstrap'
  ],
})


### **Итоговая структура проекта**
```
nuxt-project/
├── layouts/
│   ├── default.vue
│   └── custom.vue
├── assets/
│   └── css/
│       ├── global.css
│       └── tailwind.css
├── components/
│   └── AppHeader.vue
├── pages/
│   └── index.vue
└── nuxt.config.ts
```

### Ключевые принципы:
1. **Шаблоны** - для повторного использования структуры страниц  
2. **Стили** - глобальные через `nuxt.config`, локальные через `<style>`  
3. **Автоимпорт** - компоненты из `layouts/` и `components/` доступны везде  
4. **Модули** - для быстрой интеграции CSS-фреймворков  

[Документация по стилям](https://nuxt.com/docs/getting-started/styling) | [Шаблоны](https://nuxt.com/docs/guide/directory-structure/layouts)










4. ### 🧩 Обработка данных из URL в Nuxt.js

Nuxt предоставляет мощные инструменты для работы с данными из URL. Рассмотрим ключевые аспекты:

---

### 🔍 1. **Доступ к параметрам URL**
#### Динамические сегменты (`/user/:id`)
```vue
<!-- pages/user/[id].vue -->
<script setup>
const route = useRoute()

// Получение параметра
const userId = route.params.id // /user/123 → id = '123'

// Типизация (преобразование в число)
const numericId = Number(userId)
</script>
```

#### Вложенные параметры (`/blog/:category/:post`)
```js
// /blog/tech/nuxt-guide
const category = route.params.category // 'tech'
const postSlug = route.params.post    // 'nuxt-guide'
```

---

### 🔎 2. **Работа с Query-параметрами**
#### Получение параметров (`?search=vue&page=2`)
```vue
<script setup>
const route = useRoute()

const searchQuery = route.query.search // 'vue'
const currentPage = route.query.page   // '2'

// Значения по умолчанию
const page = computed(() => 
  Number(route.query.page) || 1
)
</script>
```

#### Особенности:
- Все значения - строки
- Множественные параметры: `?tag=vue&tag=nuxt` → `route.query.tag = ['vue', 'nuxt']`
- Отсутствующие параметры: `undefined`

---

### 🛠️ 3. **Изменение URL**
#### Программная навигация
```js
const router = useRouter()

// Добавление query-параметра
router.push({
  path: '/search',
  query: {
    ...route.query, // сохраняем текущие
    sort: 'price'
  }
})

// Удаление параметра
const cleanQuery = { ...route.query }
delete cleanQuery.sort
router.replace({ query: cleanQuery })
```

#### Компонентная навигация
```vue
<NuxtLink 
  :to="{
    path: '/products',
    query: { category: 'electronics' }
  }"
>
  Электроника
</NuxtLink>
```

---

### 🔐 4. **Валидация параметров**
Валидация в `definePageMeta`:
```vue
<script setup>
definePageMeta({
  validate: ({ params }) => {
    // Проверяем что ID - число
    return /^\d+$/.test(params.id)
  }
})
</script>
```
При ошибке валидации - автоматический переход на 404 страницу.

---

### ⚙️ 5. **Работа с хэшем (#section)**
```js
const route = useRoute()

// Получение хэша
const currentHash = route.hash // '#section-2'

// Прокрутка к элементу
onMounted(() => {
  if (route.hash) {
    document.querySelector(route.hash)?.scrollIntoView()
  }
})
```

---

### 🚀 6. **Извлечение данных на сервере**
#### В асинхронных функциях
```vue
<script setup>
const route = useRoute()

// Загрузка данных на основе URL
const { data: product } = await useAsyncData(
  'product-detail',
  () => $fetch(`/api/products/${route.params.id}`)
)
</script>
```

#### В серверных обработчиках
```ts
// server/api/product/[id].ts
export default defineEventHandler(event => {
  const id = event.context.params?.id
  return getProductById(Number(id))
})
```

---

### 🛡️ 7. **Безопасность и санитизация**
Всегда проверяйте входные данные:
```js
// Преобразование в нужные типы
const id = Number(route.params.id) || 0

// Защита от XSS
const safeSearch = escapeHtml(route.query.search)
```

---

### 🔄 8. **Реактивность URL**
Для отслеживания изменений параметров:
```vue
<script setup>
const route = useRoute()

// Реактивное отслеживание query-параметров
watch(
  () => route.query.page,
  (newPage) => {
    fetchData(Number(newPage))
  }
)

// Отслеживание изменений параметров пути
watchEffect(() => {
  if (route.params.category) {
    loadCategory(route.params.category)
  }
})
</script>
```

---

### 🧪 Пример: Фильтрация товаров
```vue
<script setup>
const route = useRoute()

// Реактивные параметры фильтра
const filters = reactive({
  category: computed(() => route.query.category || 'all'),
  minPrice: computed(() => Number(route.query.min) || 0),
  maxPrice: computed(() => Number(route.query.max) || 1000)
})

// Обновление URL при изменении фильтров
function updateFilters() {
  router.push({
    query: {
      category: filters.category,
      min: filters.minPrice,
      max: filters.maxPrice
    }
  })
}
</script>
```

---

### 💡 Основные практики:
1. Всегда используйте `useRoute()` вместо прямого доступа к `window.location`
2. Преобразовывайте типы параметров (особенно числа)
3. Используйте `watch` для отслеживания изменений
4. Валидируйте входные параметры
5. Для сложных состояний используйте query-параметры
6. Очищайте параметры при необходимости с помощью `router.replace`

[Документация по роутингу](https://nuxt.com/docs/guide/directory-structure/pages#dynamic-routes) | [useRoute API](https://nuxt.com/docs/api/composables/use-route)










5. ### 🧩 Работа с компонентами в Nuxt.js

Nuxt предоставляет мощную систему компонентов с уникальными возможностями. Вот ключевые аспекты:

---

#### 🚀 **Автоматический импорт компонентов**
Главная особенность Nuxt - **автоимпорт** компонентов из папки `components/`:
```bash
components/
├── AppHeader.vue
├── AppFooter.vue
└── ui/
    ├── Button.vue
    └── Card.vue
```

**Использование без импорта:**
```vue
<template>
  <div>
    <AppHeader />  <!-- Автоматически импортирован -->
    <ui-button>Кликни</ui-button>
  </div>
</template>
```

---

#### ⚙️ **Настройка компонентов**
В `nuxt.config.ts`:
```ts
export default defineNuxtConfig({
  components: [
    // Автоимпорт всех компонентов
    '~/components',
    
    // С префиксом и только из конкретной папки
    { path: '~/components/ui', prefix: 'Ui' }
  ]
})
```

---

#### 🧩 **Типы компонентов**

### 1. **Клиентские компоненты (по умолчанию)**
```vue
<!-- components/InteractiveComponent.vue -->
<template>
  <button @click="count++">{{ count }}</button>
</template>

<script setup>
const count = ref(0) // Клиентский код
</script>
```

### 2. **Серверные компоненты (Nuxt 3.10+)**
```vue
<!-- components/ServerComponent.server.vue -->
<template>
  <div>Серверное время: {{ new Date() }}</div>
</template>
```

### 3. **Асинхронные компоненты**
```vue
<template>
  <LazyModal v-if="showModal" /> <!-- Загружается только при необходимости -->
</template>

<script setup>
const showModal = ref(false)
</script>
```

---

#### 🔧 **Работа с пропсами и событиями**

**Пропсы:**
```vue
<!-- components/ui/Button.vue -->
<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary'
  },
  disabled: Boolean
})
</script>

<template>
  <button :class="`btn-${variant}`" :disabled="disabled">
    <slot />
  </button>
</template>
```

**События:**
```vue
<script setup>
const emit = defineEmits(['click'])

function handleClick() {
  emit('click', 'payload')
}
</script>
```

---

#### 🧩 **Слоты**
```vue
<!-- components/ui/Card.vue -->
<template>
  <div class="card">
    <header v-if="$slots.header">
      <slot name="header" />
    </header>
    <slot /> <!-- Контент по умолчанию -->
  </div>
</template>

<!-- Использование -->
<ui-card>
  <template #header>
    <h2>Заголовок</h2>
  </template>
  Основной контент
</ui-card>
```

---

#### 🔄 **Provide/Inject**
Для передачи данных через уровни:
```vue
<!-- Родительский компонент -->
<script setup>
import { provide } from 'vue'

provide('theme', 'dark')
</script>

<!-- Дочерний компонент -->
<script setup>
import { inject } from 'vue'

const theme = inject('theme', 'light') // 'light' - значение по умолчанию
</script>
```

---

#### 🏗️ **Динамические компоненты**
```vue
<script setup>
const componentMap = {
  info: resolveComponent('UiAlert'),
  warning: resolveComponent('UiWarning')
}
const currentType = ref('info')
</script>

<template>
  <component :is="componentMap[currentType]" />
</template>
```

---

#### 📂 **Организация компонентов**

Рекомендуемая структура:
```
components/
├── layout/           # Компоненты макета
│   ├── Header.vue
│   └── Footer.vue
├── ui/              # UI-кит
│   ├── Button.vue
│   ├── Input.vue
│   └── Card.vue
├── features/        # Функциональные компоненты
│   ├── ProductCard.vue
│   └── UserProfile.vue
└── shared/          # Общие компоненты
    ├── Icon.vue
    └── Loader.vue
```

---

#### ⚠️ **Особенности и лучшие практики**

1. **Именование:**
   - Используйте `PascalCase` для файлов: `MyComponent.vue`
   - Для сложных имен: `user/UserProfileCard.vue`

2. **Автоимпорт работает:**
   - Во всех компонентах
   - В страницах (`pages/`)
   - В шаблонах (`layouts/`)

3. **Отключение автоимпорта:**
   ```ts
   // nuxt.config.ts
   export default { components: false }
   ```

4. **Ручной импорт:**
   ```vue
   <script setup>
   import { MyComponent } from '#components'
   </script>
   ```

---

#### 🚫 **Ограничения**

1. **Имена конфликтуют** - уникальные имена обязательны
2. **Динамические пути** - требуют ручного импорта
3. **TypeScript** - для типизации используйте:
   ```vue
   <script setup lang="ts">
   defineProps<{ title: string }>()
   </script>
   ```

---

#### 🔧 **Расширенные сценарии**

### 1. Глобальные компоненты
```ts
// plugins/global-components.ts
import MyGlobalComponent from '~/components/MyGlobalComponent.vue'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component('MyGlobalComponent', MyGlobalComponent)
})
```

### 2. HOC-компоненты
```vue
<!-- components/withLogger.js -->
<script setup>
const props = defineProps(['comp', 'name'])

onMounted(() => console.log(`Компонент ${name} загружен`))
</script>

<template>
  <component :is="comp" v-bind="$attrs" />
</template>
```

---

### 💡 Итог:
1. **Автоимпорт** - основное преимущество Nuxt
2. **Структура** - организуйте компоненты по назначению
3. **Серверные компоненты** - для неинтерактивных элементов
4. **Lazy-компоненты** - для оптимизации производительности
5. **TypeScript** - для безопасности типов

[Официальная документация](https://nuxt.com/docs/guide/directory-structure/components)










6. ### 🚀 Работа с сервером в Nuxt.js

Nuxt 3 представляет революционный подход к серверной части с помощью **Nitro Engine** - высокопроизводительного серверного фреймворка. Вот ключевые аспекты работы с сервером:

---

#### 🌐 Основные возможности сервера в Nuxt
1. **API Routes** - создание эндпоинтов
2. **Server Middleware** - обработка запросов
3. **Server Utilities** - работа с БД, файлами
4. **SSR & SSG** - рендеринг на стороне сервера
5. **HMR для сервера** - горячая перезагрузка

---

### 🛠️ 1. Создание API-эндпоинтов
Расположение: `server/api/`

**Пример: Простой GET-запрос**
```ts
// server/api/hello.ts
export default defineEventHandler((event) => {
  return {
    message: 'Привет от сервера!',
    timestamp: new Date()
  }
})
```
Доступно по адресу: `/api/hello`

---

### 📡 2. Обработка HTTP-методов
```ts
// server/api/user.ts
export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    return { users: await fetchUsers() }
  }
  
  if (event.method === 'POST') {
    const body = await readBody(event)
    const newUser = await createUser(body)
    return newUser
  }
})
```

---

### 🔒 3. Работа с параметрами запроса
#### Параметры пути:
```ts
// server/api/user/[id].ts
export default defineEventHandler(event => {
  const id = event.context.params?.id
  return getUserById(Number(id))
})
```

#### Query-параметры:
```ts
export default defineEventHandler(event => {
  const query = getQuery(event)
  return searchUsers(query.name)
})
```

---

### 📦 4. Middleware
Серверные middleware выполняются перед каждым запросом:

```ts
// server/middleware/auth.ts
export default defineEventHandler((event) => {
  // Проверка авторизации
  if (!event.context.auth?.isAuthenticated) {
    throw createError({
      statusCode: 401,
      message: 'Не авторизован'
    })
  }
})
```

---

### 🔧 5. Работа с базой данных
Пример с Prisma ORM:

```ts
// server/utils/db.ts
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()
```

```ts
// server/api/products.ts
import { prisma } from '../utils/db'

export default defineEventHandler(async () => {
  return await prisma.product.findMany()
})
```

---

### ⚙️ 6. Конфигурация сервера в `nuxt.config.ts`
```ts
export default defineNuxtConfig({
  nitro: {
    // Настройки сервера
    compressPublicAssets: true,
    prerender: {
      routes: ['/sitemap.xml']
    },
    
    // Переменные среды
    runtimeConfig: {
      dbUrl: process.env.DATABASE_URL,
      public: {
        apiBase: '/api'
      }
    }
  }
})
```

---

### 🔄 7. Использование на клиенте
Через `useFetch` или `$fetch`:

```vue
<script setup>
const { data: products } = await useFetch('/api/products')

async function addToCart(productId) {
  await $fetch('/api/cart', {
    method: 'POST',
    body: { productId }
  })
}
</script>
```

---

### 🛡️ 8. Аутентификация
Пример с JWT:

```ts
// server/middleware/auth.ts
export default defineEventHandler(async (event) => {
  const token = getHeader(event, 'Authorization')?.split(' ')[1]
  
  if (!token) {
    throw createError({ statusCode: 401 })
  }
  
  try {
    const payload = verifyToken(token)
    event.context.user = payload
  } catch (e) {
    throw createError({ statusCode: 403 })
  }
})
```

---

### 📂 9. Структура серверной части
Рекомендуемая организация:
```
server/
├── api/              # API эндпоинты
│   ├── users.get.ts
│   ├── products/
│   │   └── [id].get.ts
│   └── cart.post.ts
├── middleware/       # Глобальные middleware
│   └── auth.ts
├── routes/           # Специальные роуты
│   └── sitemap.xml.ts
├── plugins/          # Серверные плагины
│   └── db.ts
└── utils/            # Вспомогательные функции
    └── email.ts
```

---

### ⚡ 10. Оптимизации и прод продакшн
1. **Кеширование**:
```ts
export default defineCachedEventHandler(async (event) => {
  return getProducts() // Кешируется на 1 час
}, {
  maxAge: 60 * 60
})
```

2. **Статическая генерация**:
```bash
npx nuxi generate
```

3. **Деплой**:
- Node.js сервер
- Serverless-функции (Vercel, Netlify, Cloudflare)
- Docker-контейнеры

---

### 💡 Лучшие практики:
1. **Разделение логики** - выносите бизнес-логику в отдельные утилиты
2. **Валидация данных** - всегда проверяйте входные параметры
3. **Обработка ошибок** - используйте `createError`
```ts
throw createError({
  statusCode: 404,
  statusMessage: 'Продукт не найден'
})
```
4. **Логирование** - интегрируйте Winston или Pino
5. **Безопасность** - защищайте от SQL-инъекций, XSS атак

---

### 🌐 Пример: Полноценный API
```ts
// server/api/users/[id].ts
export default defineEventHandler(async (event) => {
  // Проверка метода
  if (event.method !== 'GET') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Метод не разрешен'
    })
  }
  
  // Извлечение параметра
  const id = Number(event.context.params?.id)
  if (isNaN(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Неверный ID'
    })
  }
  
  // Запрос к БД
  try {
    const user = await prisma.user.findUnique({ where: { id } })
    if (!user) throw createError({ statusCode: 404 })
    
    // Фильтрация чувствительных данных
    const { password, ...safeUser } = user
    return safeUser
    
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Ошибка сервера'
    })
  }
})
```

[Официальная документация](https://nuxt.com/docs/guide/directory-structure/server) | [Nitro Engine](https://nitro.unjs.io/)










7. ### 🚀 Настройка и оптимизация SEO в Nuxt.js

Nuxt предоставляет мощные инструменты для SEO-оптимизации. Вот ключевые аспекты:

---

#### 🎯 1. **Глобальная SEO-конфигурация (nuxt.config.ts)**
```ts
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Мой сайт - Лучший выбор',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Описание сайта для поисковых систем' },
        { name: 'keywords', content: 'ключевые, слова, через, запятую' },
        { property: 'og:title', content: 'Заголовок для соцсетей' },
        { property: 'og:description', content: 'Описание для соцсетей' },
        { property: 'og:image', content: 'https://site.com/og-image.jpg' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://site.com/current-page' }
      ],
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Мой сайт',
            url: 'https://site.com'
          })
        }
      ]
    }
  },
  robots: {
    UserAgent: '*',
    Disallow: '/admin'
  }
})
```

---

#### 📝 2. **Динамическое SEO для страниц**
Используйте `useHead` в компонентах:
```vue
<script setup>
const route = useRoute()

useHead({
  title: `Продукт ${route.params.id} - Мой магазин`,
  meta: [
    { 
      name: 'description', 
      content: `Описание продукта ${route.params.id}`
    },
    {
      property: 'og:image',
      content: computed(() => `https://cdn.com/products/${route.params.id}.jpg`)
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: computed(() => `https://site.com/products/${route.params.id}`)
    }
  ]
})
</script>
```

---

#### 📊 3. **JSON-LD структурированные данные**
Для улучшения сниппетов в поисковой выдаче:
```vue
<script setup>
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Название продукта',
      image: 'url-изображения',
      description: 'Описание продукта',
      offers: {
        '@type': 'Offer',
        price: '1000',
        priceCurrency: 'RUB'
      }
    }
  }]
})
</script>
```

---

#### 🔍 4. **Автоматический sitemap.xml**
Используйте модуль `nuxt-simple-sitemap`:
```bash
npm install -D nuxt-simple-sitemap
```

```ts
// nuxt.config.ts
export default {
  modules: ['nuxt-simple-sitemap'],
  site: {
    url: 'https://site.com',
  },
  sitemap: {
    sources: ['/api/sitemap']
  }
}
```

Создайте API-роут:
```ts
// server/api/sitemap.ts
export default defineEventHandler(() => {
  return [
    { loc: '/about', lastmod: new Date() },
    { loc: '/products', changefreq: 'daily' }
  ]
})
```

---

#### 🖼️ 5. **Оптимизация изображений**
Используйте модуль `@nuxt/image`:
```bash
npx nuxi module add @nuxt/image
```

```vue
<template>
  <NuxtImg 
    src="/hero.jpg" 
    alt="Описание изображения" 
    width="1200" 
    height="630"
    loading="lazy"
    format="webp"
    sizes="sm:100vw md:50vw lg:1200px"
  />
</template>
```

---

#### ⚡ 6. **Оптимизация производительности**
Ключевые метрики (Core Web Vitals):
1. **Lazy-загрузка компонентов**:
```vue
<template>
  <LazyProductModal v-if="showModal" />
</template>
```

2. **Оптимизация шрифтов**:
```ts
// nuxt.config.ts
export default {
  app: {
    head: {
      link: [
        { 
          rel: 'preload', 
          href: '/fonts/roboto.woff2', 
          as: 'font',
          crossorigin: 'anonymous'
        }
      ]
    }
  }
}
```

3. **Асинхронные данные**:
```vue
<script setup>
const { data } = await useAsyncData('products', () => fetchProducts())
</script>
```

---

#### 📱 7. **Open Graph и Twitter Cards**
```vue
<script setup>
useHead({
  meta: [
    // Open Graph
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://site.com/page' },
    
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@username' }
  ]
})
</script>
```

---

#### 🤖 8. **robots.txt и humans.txt**
Создайте в папке `public/`:
- `public/robots.txt`:
  ```
  User-agent: *
  Allow: /
  Disallow: /private
  
  Sitemap: https://site.com/sitemap.xml
  ```
- `public/humans.txt` (опционально)

---

#### 📈 9. **Аналитика**
Подключение Google Analytics:
```ts
// nuxt.config.ts
export default {
  app: {
    head: {
      script: [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID',
          async: true
        },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `
        }
      ]
    }
  }
}
```

---

#### 🔧 10. **SSR/SSG для SEO**
Настройка в `nuxt.config.ts`:
```ts
export default {
  // SSR (рекомендуется для динамического контента)
  ssr: true,
  
  // Или SSG для статических сайтов
  // $ npx nuxi generate
}
```

---

#### 🛠️ 11. **Полезные модули**
- `nuxt-simple-robots`: Управление robots.txt
- `nuxt-jsonld`: Упрощение работы со структурированными данными
- `nuxt-purgecss`: Удаление неиспользуемого CSS
- `nuxt-security`: Улучшение безопасности

---

#### 🔍 12. **Проверка и валидация**
Инструменты для проверки:
1. [Google Rich Results Test](https://search.google.com/test/rich-results)
2. [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/)
3. [SEO Site Checkup](https://seositecheckup.com/)
4. [Ahrefs](https://ahrefs.com/seo-tools)

---

### 💡 Итоговая стратегия SEO в Nuxt:
1. **Мета-теги**: Динамические для каждой страницы
2. **Производительность**: Оптимизация загрузки (lazy, async)
3. **Структурированные данные**: JSON-LD для улучшения сниппетов
4. **XML Sitemap**: Автоматическая генерация
5. **Адаптивность**: Mobile-first дизайн
6. **Социальные сети**: Open Graph разметка
7. **Аналитика**: Отслеживание поведения пользователей
8. **Безопасность**: HTTPS, защита от уязвимостей

Пример комплексного решения:
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxt/image',
    'nuxt-simple-sitemap',
    'nuxt-security'
  ],
  
  app: {
    head: {
      titleTemplate: '%s - Мой сайт',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]
    }
  },
  
  image: {
    domains: ['https://my-cdn.com'],
    format: ['webp']
  },
  
  site: {
    url: 'https://site.com'
  },
  
  security: {
    headers: {
      contentSecurityPolicy: {
        'default-src': ["'self'"],
        'script-src': ["'self'", "'unsafe-inline'", 'https://www.google-analytics.com']
      }
    }
  },
  
  nitro: {
    compressPublicAssets: true,
    prerender: {
      routes: ['/sitemap.xml', '/404.html']
    }
  }
})
```










8. Экспорт проекта

сборка: npm run build (собирает в папку output)

предпросмотр: npm run preview

### 🚀 Экспорт проекта в Nuxt.js: Static Site Generation (SSG)

Nuxt позволяет экспортировать проект в виде **статического сайта** (HTML, CSS, JS файлы), что идеально для хостинга на CDN. Вот полное руководство:

---

#### 🔧 1. **Базовый экспорт**
```bash
# Сборка проекта
npm run generate

# Или
npx nuxi generate
```
**Результат:**
- Создается папка `dist/` с готовым сайтом
- Все страницы предварительно рендерятся в HTML

---

#### ⚙️ 2. **Настройка экспорта в `nuxt.config.ts`**
```ts
export default defineNuxtConfig({
  // Опции генерации
  nitro: {
    prerender: {
      crawlLinks: true,         // Автоматический обход ссылок
      routes: ['/sitemap.xml'], // Ручное указание путей
      ignore: ['/admin']        // Игнорируемые пути
    }
  },
  
  // Пользовательские настройки
  generate: {
    cache: false,              // Отключить кеширование
    fallback: '404.html',      // Файл для 404 ошибки
  }
})
```

---

#### 🔄 3. **Динамические маршруты**
Для страниц вида `/users/[id].vue`:
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    prerender: {
      routes: async () => {
        const users = await fetch('https://api.example.com/users')
          .then(res => res.json())
        
        return users.map(user => `/users/${user.id}`)
      }
    }
  }
})
```

---

#### 🌐 4. **Инкрементальная статическая регенерация (ISR)**
Nuxt 3+ поддерживает ISR через `routeRules`:
```ts
export default defineNuxtConfig({
  routeRules: {
    '/products/**': { 
      swr: 3600, // Обновлять каждые 60 минут
      prerender: true
    },
    '/blog/**': {
      prerender: true // Статическая генерация при сборке
    }
  }
})
```

---

#### 📂 5. **Кастомизация выходной директории**
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    output: {
      dir: '../custom-dist', // Пользовательская папка
      serverDir: '../server', // Серверные файлы
      publicDir: '../public' // Статические ресурсы
    }
  }
})
```

---

#### 🧩 6. **Использование адаптеров**
Для специфичных платформ:
```bash
# Установите нужный адаптер
npx nuxi add netlify
npx nuxi add vercel
npx nuxi add cloudflare
```

**Пример для Netlify:**
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    preset: 'netlify'
  }
})
```

---

#### 🚀 7. **Команды для деплоя**
После генерации:
```bash
# Для статического хостинга:
cd dist
npx serve # Локальная проверка

# Или залейте на хостинг:
netlify deploy --dir=dist
vercel deploy dist
```

---

#### 🛠️ 8. **Оптимизация экспорта**
1. **Сжатие ресурсов:**
```ts
export default defineNuxtConfig({
  nitro: {
    compressPublicAssets: {
      brotli: true,
      gzip: true
    }
  }
})
```

2. **Минификация HTML:**
```ts
export default defineNuxtConfig({
  experimental: {
    payloadExtraction: true // Выделение данных в JSON
  },
  vite: {
    build: {
      minify: 'terser'
    }
  }
})
```

---

#### 🧪 9. **Локальная проверка**
Перед деплоем проверьте статический сайт:
```bash
npm run generate
npx serve ./dist
```
Откройте http://localhost:3000

---

#### ⚠️ 10. **Частые проблемы и решения**
**Проблема:** Динамические пути не генерируются  
**Решение:** Явно укажите пути в `prerender.routes`

**Проблема:** API-запросы не работают после экспорта  
**Решение:** 
- Используйте относительные пути: `$fetch('/api/endpoint')`
- Для статики переместите логику в `client-only` компоненты

**Проблема:** Нет редиректов  
**Решение:** Создайте `_redirects` в `public/`:
```
/* /index.html 200
```

---

### 🌟 Пример полной конфигурации
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  ssr: true, // Обязательно для SSG
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/about', '/contact'],
      ignore: ['/dashboard']
    },
    compressPublicAssets: true,
    preset: 'netlify-static'
  },
  routeRules: {
    '/products/**': { swr: 7200 },
    '/blog/**': { prerender: true }
  },
  experimental: {
    payloadExtraction: true
  },
  generate: {
    fallback: '404.html'
  }
})
```

---

### 💡 Лучшие практики:
1. **Тестируйте в production-режиме:**
   ```bash
   NODE_ENV=production npm run generate
   ```
   
2. **Используйте `nuxi preview`** для проверки SSR-версии:
   ```bash
   npm run build
   npx nuxi preview
   ```

3. **Оптимизируйте изображения** через `@nuxt/image`

4. **Включите анализ бандла:**
   ```ts
   export default defineNuxtConfig({
     vite: {
       plugins: [visualizer()]
     }
   })
   ```

5. **Настройте кеширование** для статических ресурсов через `headers` в `public/_headers`:
   ```
   /*
     Cache-Control: public, max-age=31536000, immutable
   ```

[Официальная документация по генерации](https://nuxt.com/docs/guide/concepts/static-site-generation) | [Nitro Presets](https://nitro.unjs.io/deploy/)