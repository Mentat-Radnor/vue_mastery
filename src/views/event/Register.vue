<template>
  <p>Register</p>
  <button @click="register">Register me</button>
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
  inject: ['GStore'],
  methods: {
    register() {
      this.GStore.flashMessage = 'Success Registration' + this.event.title

      setTimeout(() => {
        this.GStore.flashMessage = ''
      }, 3000)

      this.$router.push({
        name: 'EventDetails',
      })
    },
  },
}
</script>
