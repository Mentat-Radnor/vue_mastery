<template>
  <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
  <p>{{ event.description }}</p>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
}
</script>
