<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<script>
import EventService from '@/service/EventService.js'
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      event: null,
    }
  },
  async created() {
    try {
      const { data } = await EventService.getEvent(this.id)
      this.event = data
    } catch (error) {
      console.log(error)
    }
  },
}
</script>
