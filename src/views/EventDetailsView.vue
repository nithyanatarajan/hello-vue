<script setup>
import EventService from '@/services/EventService';
import { onMounted, ref } from 'vue';

const props = defineProps({ id: { required: true } });
const event = ref({});

onMounted(() => {
  EventService.getEventById(props.id)
    .then((response) => {
      event.value = response.data;
    })
    .catch((error) => {
      console.error('Error fetching events:', error);
    });
});
</script>

<template>
  <div v-if="event">
    <h2>{{ event.title }}</h2>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
