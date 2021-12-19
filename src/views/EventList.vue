<template>
  <div class="events">
    <event-card
      v-for="(event, index) in events"
      :key="'event' + index"
      :event="event"
    ></event-card>
    <div class="pagination">
      <router-link
        id="prev"
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        >Prev Page</router-link
      >

      <router-link
        id="next"
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        >Next Page</router-link
      >
    </div>
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
  props: {
    page: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      events: null,
      totalEvents: 0,
    }
  },
  async beforeRouteEnter(routeTo, roteFrom, next) {
    try {
      const { data, headers } = await EventService.getEvents(
        2,
        parseInt(routeTo.query.page) || 1
      )
      next((comp) => {
        comp.events = data
        comp.totalEvents = headers['x-total-count']
      })
    } catch (error) {
      next({ name: 'NetworkError' })
    }
  },
  async beforeRouteUpdate(routeTo) {
    try {
      const { data, headers } = await EventService.getEvents(
        2,
        parseInt(routeTo.query.page) || 1
      )

      this.events = data
      this.totalEvents = headers['x-total-count']
    } catch (error) {
      return { name: 'NetworkError' }
    }
  },
  computed: {
    hasNextPage() {
      let totalPages = Math.ceil(this.totalEvents / 2)
      return this.page < totalPages
    },
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
