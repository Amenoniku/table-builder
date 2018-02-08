<template lang="pug">

ul.nav.nav-pills.nav-fill
  li.nav-item(v-for="(table, $index) in tables")
    a.nav-link(:class="{'active': getActiveTable($index)}" @click="$emit('pick', $index)") Table №{{ $index + 1 }}
    .icons
      .delete-icon(@click="deleteTable($index)" title="Delete table")
        i.fas.fa-trash-alt
      .get-json-icon(@click="getJson($index)" title="Get Json")
        i.fab.fa-js
      .get-clear-table(@click="clearTable($index)" title="Wipe the table")
        i.fas.fa-eraser

</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Nav',
  data () {
    return {}
  },
  computed: {
    ...mapState('main', {
      tables: state => state.tables,
      table: state => state.pickedTable
    })
  },
  methods: {
    getJson (i) {
      alert('See console. There is json obj')
      let JSONObj = JSON.stringify(this.tables[i])
      // Если чесно то бесмыслица такаято, но таков пункт в задании...
      console.log(JSON.parse(JSONObj))
    },
    getActiveTable (index) {
      if (this.table) return this.table.index === index
    },
    ...mapActions('main', {
      pickTable: 'pickTable',
      deleteTable: 'deleteTable',
      clearTable: 'clearTable'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>

ul
  margin 5px 0
  cursor pointer

li
  position relative
  margin 0 5px

.icons
  position absolute
  right 10px
  top .5em
  color inherit
  div
    display inline-block
    margin 0 2px
  &:hover
    color inherit

</style>
