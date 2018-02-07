<template lang="pug">

.container
  table.table.table-striped
    thead
      tr
        th(scope='col') #
        th(scope='col') id
        th(scope='col') First name
        th(scope='col') Last name
        th(scope='col') Phone
        th(scope='col') Email
        th(scope='col') Action
    tbody
      tr(v-for="(row, $index) in rows" v-if="getRange($index)")
        th(scope='row') {{ $index }}
        td {{ row.id }}
        td {{ row.firstName }}
        td {{ row.lastName }}
        td {{ row.phone }}
        td {{ row.email }}
        td
          button.btn.btn-primary(type='button' @click="$emit('addRows')")
            i.fas.fa-plus-square
          button.btn.btn-success(type='button' @click="$emit('editRows')")
            i.fas.fa-pen-square
          button.btn.btn-danger(type='button' @click="$emit('DeleteRows')")
            i.fas.fa-trash-alt
  Pagination(
    v-if="numberOfPages > 0"
    :number-of-pages="numberOfPages"
    :current-page="currentPage"
    @go-to="goToPage"
  )

</template>

<script>
import Pagination from './Pagination'

export default {
  name: 'Table',
  components: {
    Pagination
  },
  props: ['rows'],
  data () {
    return {
      showedRows: 10,
      currentPage: 1
    }
  },
  computed: {
    numberOfPages () {
      return Math.floor(this.rows.length / this.showedRows)
    }
  },
  methods: {
    goToPage (page) {
      if (typeof page === 'string') {
        if (page === 'prev') {
          let prevPage = this.currentPage - 1
          if (prevPage > 0) this.currentPage = prevPage
        }
        if (page === 'next') {
          let nextPage = this.currentPage + 1
          if (nextPage <= this.numberOfPages) this.currentPage = nextPage
        }
      } else {
        this.currentPage = page
      }
    },
    getRange (index) {
      return (
        index > ((this.showedRows * this.currentPage) - this.showedRows) - 1 &&
        index < (this.showedRows * this.currentPage)
      )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>

.container
  max-width 100%
  margin 0
  padding 0

table
  margin-bottom 0.2rem

button
  margin 0 5px

</style>
