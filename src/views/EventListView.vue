<script setup>
import EventCard from '@/components/EventCard.vue';
import EventService from '@/services/EventService';
import { onMounted, ref } from 'vue';

const events = ref([]);

onMounted(() => {
  EventService.getEvents()
    .then((response) => {
      events.value = response.data;
    })
    .catch((error) => {
      console.error('Error fetching events:', error);
    });
});
</script>

<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
