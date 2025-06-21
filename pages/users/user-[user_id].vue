<script setup>
definePageMeta({
  layout: 'users'
})

const { user_id } = useRoute().params

const { data } = await useFetch(`https://dummyjson.com/users/${user_id}`)
</script>
<template>
    <div>
        <Head>
    <Title>User ID: {{ user_id }}</Title>
<Meta name="description" content="All users" />
</Head>
   <h1 class="text-danger mb-4">User ID: {{ user_id }}</h1>
   <div class="card shadow-lg">
    <div class="row g-0">
      <!-- profile image -->
      <div class="col-mb-4">
        <img :src="data.image" alt="User Image" class="img-fluid rounded-start"> 
      </div>
<!-- user info -->
 <div class="col-mb-8">
<div class="card-body">
  <h2 class="card-title">{{ data.firstName }} {{ data.lastName }}</h2>
  <p class="card-text text-muted">ID: {{ user_id }} | Age: {{ data.age }} </p>
  <ul class="list-group list-group-flush">
    <li class="list-group-item"><strong>Email: </strong>{{ data.email }}</li>
    <li class="list-group-item"><strong>Phone: </strong>{{ data.phone }}</li>
    <li class="list-group-item"><strong>Address: </strong>{{ data.address.address }}, {{ data.address.state }}, {{ data.address.postalCode }}</li>
    <li class="list-group-item"><strong>Company: </strong>{{ data.company.name }}
    <p class="mb-0">Department: {{ data.company.department }} </p>
  </li>
  </ul>
</div>
 </div>
    </div>
   </div>
  </div>
</template>
<style>

</style>