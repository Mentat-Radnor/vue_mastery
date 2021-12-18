<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>

    <div id="nav">
      <router-link :to="{ name: 'EventDetails' }">Details</router-link>
      |
      <router-link :to="{ name: 'EventRegister' }">Register</router-link>
      |
      <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
    </div>
    <router-view :event="event"></router-view>
  </div>
</template>

<script>
import EventService from '@/service/EventService.js'
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      event: null,
      unsavedChanges: true,
    }
  },

  beforeRouteLeave() {
    if (this.unsavedChanges) {
      const answer = window.confirm('Do you really want to leave?')
      if (!answer) {
        return false
      }
    }
  },
  async created() {
    try {
      const { data } = await EventService.getEvent(this.id)
      this.event = data
    } catch (error) {
      if (error.response && error.response.status == 404) {
        this.$router.push({
          name: '404Resource',
          params: { resource: 'event' },
        })
      } else {
        this.$router.push({ name: 'NetworkError' })
      }
    }
  },
}
</script>
