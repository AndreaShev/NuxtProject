
<script setup>
const { data } = await useFetch('/api/example', {
  method: 'post',
  body: { name: 'Alex', id: 1 }
})
</script>
<template>
  <div>
    
   <h1>Home page</h1>
   <Alert color="primary">
  {{ data.message }}
    </Alert>
  </div>
</template>
<style>

h1 {color: red}
</style>