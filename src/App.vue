<template lang="pug">

#app
  .container
    form.form-inline
      .form-group.mx-sm-3.mb-2
        label.col-sm-2.col-form-label(for='inputRows') Rows
        input#inputRows.form-control(type='number' v-model="numberOfRows" placeholder='Number of rows')
      button.btn.btn-primary.mb-2(type='button' @click="generateTable") Generate the table!

  Nav
  Table(v-if="table" :rows="table")
  h4(v-else) Please generate or pick the table!

</template>

<script>

import { mapState, mapActions } from 'vuex'

import 'bootstrap/dist/css/bootstrap.css'

import Table from './components/Table'
import Nav from './components/Nav'

export default {
  name: 'App',
  components: {
    Table,
    Nav
  },
  data () {
    return {
      numberOfRows: 50
    }
  },
  computed: {
    ...mapState('main', {
      tables: state => state.tables,
      table: state => state.pickedTable
    })
  },
  methods: {
    generateTable () {
      this.getTable(parseInt(this.numberOfRows))
    },
    ...mapActions('main', {
      getTable: 'getTable'
    })
  },
  mounted () {
    // let smallData = 32
    // let bigData = 1000
    if (this.tables.length === 0) {
      this.getTable(1000)
      this.getTable(32)
    }
  }
}
</script>

<style lang="stylus">

#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50

form
  margin 20px

</style>
