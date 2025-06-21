
<script setup>
useHead({
  title: 'Contacts',
  meta: [
    { name: 'description', content: 'Contact page' }
  ]
})
const name = ref('')
const email = ref('')
const message = ref('')
const isSub = ref(false)
const resultMessage = ref('')

const submitForm = async () => {
  isSub.value = true
  resultMessage.value = ''

  const { error } = await useFetch('/api/contacts', {
    method: 'post',
    body: {
      name: name.value,
      email: email.value,
      message: message.value,
    }
  })

  if(error.value)
  resultMessage.value = 'Error:' + error.value
else {
  resultMessage.value = 'All is success'
  name.value = ''
  email.value = ''
  message.value = ''
  isSub.value = false
}
}
</script>
<template>
  <div>
   <h1>Contacts</h1>
   <form @submit.prevent="submitForm">
    <input type="text" id="name" v-model="name" class="form-control" placeholder="Enter name"><br>
    <input type="email" id="email" v-model="email" class="form-control" placeholder="Enter email"><br>
    <textarea name="message" id="message" v-model="message"  class="form-control" placeholder="Enter message"></textarea><br>
    <button type="submit" class="btn btn-primary" :disabled="isSub">
      {{ isSub ? 'Отправляем...' : 'Отправить'}}
    </button>
   </form>
   <p v-if="resultMessage" class="mt-3 alert alert-success">
    {{ resultMessage }}
   </p>
  </div>
</template>
<style>
h1 {color: red}
</style>


