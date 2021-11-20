<template>
  <router-link
    :to="{ name: 'EventDetails', params: { id: event.id } }"
    class="event-link"
  >
    <span>@{{ event.time }} on {{ event.date }}</span>
    <h4>{{ event.title }}</h4>
  </router-link>
</template>

<script>
export default {
  name: 'EventCard',
  props: {
    event: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  data() {
    return {}
  },
}
</script>

<style scoped>
.event-card:hover {
  transform: scale(1, 1);
  box-shadow: 0px 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.event-link {
  text-decoration: none;
  color: #000000;
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}
</style>
