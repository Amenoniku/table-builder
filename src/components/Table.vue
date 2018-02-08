<template lang="pug">

.container
  table.table.table-striped
    thead
      tr
        th(scope='col') #
        th(scope='col' @click="sortTable('id')") id
          span(v-if="sort.id !== undefined")
            span(v-if="sort.id") ▲
            span(v-else) ▼
        th(scope='col' @click="sortTable('firstName')") First name
          span(v-if="sort.firstName !== undefined")
            span(v-if="sort.firstName") ▲
            span(v-else) ▼
        th(scope='col' @click="sortTable('lastName')") Last name
          span(v-if="sort.lastName !== undefined")
            span(v-if="sort.lastName") ▲
            span(v-else) ▼
        th(scope='col' @click="sortTable('phone')") Phone
          span(v-if="sort.phone !== undefined")
            span(v-if="sort.phone") ▲
            span(v-else) ▼
        th(scope='col' @click="sortTable('email')") Email
          span(v-if="sort.email !== undefined")
            span(v-if="sort.email") ▲
            span(v-else) ▼
        th(scope='col') Action
    tbody(v-if="table.length > 0")
      tr(v-for="(row, index) in table" v-if="getRange(index)")
        th(scope='row') {{ index }}
        td {{ row.id }}
        td(@keyup.enter="saveEditRow" @dblclick="editField(index, 'firstName', row.firstName)")
          input.form-control(
            v-if="editableRow.field === 'firstName' && editableRow.index === index"
            type='text'
            v-model="editForms.firstName"
            placeholder='First name'
          )
          span(v-else) {{ row.firstName }}
        td(@keyup.enter="saveEditRow" @dblclick="editField(index, 'lastName', row.lastName)")
          input.form-control(
            v-if="editableRow.field === 'lastName' && editableRow.index === index"
            type='text'
            v-model="editForms.lastName"
            placeholder='Last name'
          )
          span(v-else) {{ row.lastName }}
        td(@keyup.enter="saveEditRow" @dblclick="editField(index, 'phone', row.phone)")
          input.form-control(
            v-if="editableRow.field === 'phone' && editableRow.index === index"
            type='text'
            v-model="editForms.phone"
            placeholder='Phone'
          )
          span(v-else) {{ row.phone }}
        td(@keyup.enter="saveEditRow" @dblclick="editField(index, 'email', row.email)")
          input.form-control(
            v-if="editableRow.field === 'email' && editableRow.index === index"
            type='text'
            v-model="editForms.email"
            placeholder='Email'
          )
          span(v-else) {{ row.email }}
        td
          button.btn.btn-primary(type='button' @click="addRows({row: row, index})")
            i.fas.fa-plus-square
          button.btn.btn-danger(type='button' @click="deleteRows(index)")
            i.fas.fa-trash-alt
    tbody(v-else)
      tr
        th(scope='row') 0
        td 000
        td
          input#inputRows.form-control(type='text' v-model="editForms.firstName" placeholder='First name')
        td
          input#inputRows.form-control(type='text' v-model="editForms.lastName" placeholder='Last name')
        td
          input#inputRows.form-control(type='text' v-model="editForms.phone" placeholder='Phone')
        td
          input#inputRows.form-control(type='text' v-model="editForms.email" placeholder='Email')
        td
          button.btn.btn-primary(type='button' @click="addRows({row: editForms})")
            i.fas.fa-plus-square
          button.btn.btn-danger(type='button' @click="deleteRows($index)")
            i.fas.fa-trash-alt
  Pagination(
    v-if="numberOfPages > 0"
    :number-of-pages="numberOfPages"
    :current-page="currentPage"
    @go-to="goToPage"
  )

</template>

<script>
import { mapState, mapActions } from 'vuex'

import Pagination from './Pagination'

export default {
  name: 'Table',
  components: {
    Pagination
  },
  data () {
    return {
      showedRows: 10,
      currentPage: 1,

      sort: {
        id: undefined,
        firstName: undefined,
        lastName: undefined,
        phone: undefined,
        email: undefined
      },

      editableRow: {
        index: undefined,
        field: undefined,
        value: undefined
      },

      editForms: {
        firstName: '',
        lastName: '',
        phone: '',
        email: ''
      }
    }
  },
  computed: {
    numberOfPages () {
      return Math.floor(this.table.length / this.showedRows)
    },
    ...mapState('main', {
      table: state => state.pickedTable,
      tableId: state => state.tableId
    })
  },
  methods: {
    sortTable (field) {
      let stringCompare = (a, b) => {
        if (this.sort[field]) return a[field].localeCompare(b[field])
        else return b[field].localeCompare(a[field])
      }

      switch (field) {
        case 'id':
          this.table.sort((a, b) => {
            if (this.sort[field]) return a[field] - b[field]
            else return b[field] - a[field]
          })
          break
        case 'firstName':
          this.table.sort(stringCompare)
          break
        case 'lastName':
          this.table.sort(stringCompare)
          break
        case 'phone':
          this.table.sort((a, b) => {
            if (this.sort[field]) return +a[field].replace(/\D/g, '') - +b[field].replace(/\D/g, '')
            else return +b[field].replace(/\D/g, '') - +a[field].replace(/\D/g, '')
          })
          break
        case 'email':
          this.table.sort(stringCompare)
          break
      }
      let state = this.sort[field]
      for (let k in this.sort) {
        this.sort[k] = undefined
      }
      this.sort[field] = !state
    },
    editField (index, field, value) {
      this.editableRow = {index, field, value}
      this.editForms[field] = value
    },
    saveEditRow () {
      this.editRows({
        row: this.editableRow,
        value: this.editForms[this.editableRow.field]
      })
      this.editableRow = {}
    },
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
    },
    ...mapActions('main', {
      addRows: 'addRows',
      editRows: 'editRows',
      deleteRows: 'deleteRows'
    })
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
