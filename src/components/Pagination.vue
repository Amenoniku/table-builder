<template lang="pug">

nav(aria-label='Page navigation example')
  ul.pagination.justify-content-center
    li.page-item(@click="$emit('go-to', 'prev')")
      a.page-link Previous
    li.page-item(v-if="currentPage > 4" @click="$emit('go-to', 1)")
      a.page-link 1...
    li.page-item(
      v-for="i in numberOfPages"
      :class="{'active': currentPage === i}"
      v-if="getRange(i)"
      @click="$emit('go-to', i)"
    )
      a.page-link {{ i }}
    li.page-item(v-if="currentPage < numberOfPages - 3" @click="$emit('go-to', numberOfPages)")
      a.page-link ...{{ numberOfPages }}
    li.page-item(@click="$emit('go-to', 'next')")
      a.page-link Next

</template>

<script>
export default {
  name: 'Pagination',
  props: ['numberOfPages', 'currentPage'],
  data () {
    return {
      showedPage: 5
    }
  },
  methods: {
    getRange (index) {
      return (
        index > this.currentPage - 4 &&
        index < this.currentPage + 4
      )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>

nav
  color #0056b3

</style>
