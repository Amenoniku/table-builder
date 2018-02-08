<template lang="pug">

#app
  .container
    form.form-inline
      .form-group.mx-sm-3.mb-2
        label.col-sm-2.col-form-label(for='inputRows') Rows
        input#inputRows.form-control(type='number' v-model="numberOfRows" placeholder='Number of rows')
      button.btn.btn-primary.mb-2(type='button' @click="generateTable") Generate the table!

  Nav(@pick="pick")
  Table(v-if="tableShow")
  h4(v-else) Please generate or pick the table!

</template>

<script>

import Vue from 'vue'
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
      tableShow: false,
      numberOfRows: 50
    }
  },
  computed: {
    ...mapState('main', {
      tables: state => state.tables,
      table: state => state.pickedTable
    })
  },
  watch: {
    table () {
      Vue.nextTick(() => {
        this.tableShow = true
      })
    }
  },
  methods: {
    pick (i) {
      this.tableShow = false
      this.pickTable(i)
    },
    generateTable () {
      this.getTable(parseInt(this.numberOfRows))
    },
    ...mapActions('main', {
      getTable: 'getTable',
      pickTable: 'pickTable'
    })
  },
  mounted () {
    // let smallData = 32
    // let bigData = 1000
    if (this.tables.length === 0) {
      this.getTable(0)
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
