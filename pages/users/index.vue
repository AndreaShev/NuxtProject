
<script setup>
definePageMeta({
  layout: 'users'
})
// const users = ref([
//   { id: 1, name: 'Alex'},
//   { id: 2, name: 'Bob'},
//   { id: 3, name: 'John'},
// ])
const { data } = await useFetch('https://dummyjson.com/users')
const users = ref(data.value.users)
</script>
<template>
  <div>
  <Head>
    <Title>All users from website</Title>
<Meta name="description" content="All users" />
</Head>
   <h1>All users</h1>
<ul class="d-flex justify-content-between flex-wrap list-unstyled gap-3">
  <li v-for="user in users" :key="user.id">
      <UserLink :user="user" />
  </li>

</ul>
  </div>
</template>
<style>
h1 {color: red}
</style>
<!-- ref показывает что это ссылка -->