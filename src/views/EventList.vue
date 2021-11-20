<template>
  <div class="events">
    <event-card
      v-for="(event, index) in events"
      :key="'event' + index"
      :event="event"
    ></event-card>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/event-card.vue'
import EventService from '@/service/EventService.js'

export default {
  name: 'EventList',
  components: {
    EventCard,
  },
  data() {
    return {
      events: null,
    }
  },
  async created() {
    try {
      const { data } = await EventService.getEvents()
      this.events = data
    } catch (error) {
      console.log(error)
    }
  },
}
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
}
</style>
