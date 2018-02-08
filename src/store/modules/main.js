const ADD_TABLE = 'table-builder_ADD_TABLE'
const EDIT_TABLE = 'table-builder_EDIT_TABLE'
const DELETE_TABLE = 'table-builder_DELETE_TABLE'
const PICK_TABLE = 'table-builder_PICK_TABLE'
const CLEAR_TABLE = 'table-builder_CLEAR_TABLE'

const ADD_ROWS = 'table-builder_ADD_ROWS'
const EDIT_ROWS = 'table-builder_EDIT_ROWS'
const DELETE_ROWS = 'table-builder_DELETE_ROWS'

export default {
  namespaced: true,
  state: {
    tables: [],
    pickedTable: undefined
  },
  mutations: {
    [ADD_TABLE] (state, table) {
      state.tables.push(table)
    },
    [EDIT_TABLE] (state, table) {
      // state.tables.push(table)
    },
    [DELETE_TABLE] (state, index) {
      state.tables.splice(index, 1)
    },
    [PICK_TABLE] (state, index) {
      state.pickedTable = state.tables[index]
      state.pickedTable.index = index
    },
    [CLEAR_TABLE] (state, index) {
      state.tables[index] = {}
      state.pickedTable = {}
      state.pickedTable.index = index
    },
    [ADD_ROWS] (state, {row, index}) {
      if (index === undefined) index = 0
      let min = 1
      let max = 999
      if (row.id === undefined) row.id = Math.round(min + Math.random() * (max - min))
      state.tables[state.pickedTable.index].splice(index, 0, row)
    },
    [EDIT_ROWS] (state, {row, value}) {
      state.tables[state.pickedTable.index][row.index][row.field] = value
    },
    [DELETE_ROWS] (state, index) {
      state.tables[state.pickedTable.index].splice(index, 1)
    }
  },
  actions: {
    getTable ({commit}, rows) {
      let url = `http://www.filltext.com/?rows=${rows}&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32};`
      fetch(url).then((res) => {
        return res.json()
      }).then((data) => {
        commit(ADD_TABLE, data)
        // FOR TEST
        commit(PICK_TABLE, 0)
      }).catch((err) => {
        throw err
      })
    },
    pickTable ({commit, state}, index) {
      commit(PICK_TABLE, index)
    },
    deleteTable ({commit}, index) {
      commit(DELETE_TABLE, index)
    },
    clearTable ({commit}, index) {
      commit(CLEAR_TABLE, index)
    },
    // Rows
    addRows ({commit}, {row, index}) {
      commit(ADD_ROWS, {row, index})
    },
    editRows ({commit}, {row, value}) {
      commit(EDIT_ROWS, {row, value})
    },
    deleteRows ({commit}, index) {
      commit(DELETE_ROWS, index)
    }
  }
}
