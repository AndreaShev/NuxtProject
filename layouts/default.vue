
<template>
    <div>
    <header class="bg-dark p-3">
        <ul class="nav container">
            <li class="nav-item"><NuxtLink to="/" class="nav-link text-white">Главная</NuxtLink></li>
            <li class="nav-item"><NuxtLink to="/contact" class="nav-link text-white">Контакты</NuxtLink></li>
            <li class="nav-item"><NuxtLink to="/users/" class="nav-link text-white">Пользователи</NuxtLink></li>
        </ul>
    </header>
<div class="container py-5">
    <slot />
</div>
   
  </div>
</template>
<style>
header a:not(.router-link-exact-active):hover {
  text-decoration: underline;
}
header a.router-link-exact-active {
  color: #ffb636!important;
  font-weight: 500;
}
h1 {color: red}
</style>