const ADD_TABLE = 'table-builder_ADD_TABLE'
const EDIT_TABLE = 'table-builder_EDIT_TABLE'
const DELETE_TABLE = 'table-builder_DELETE_TABLE'
const PICK_TABLE = 'table-builder_PICK_TABLE'
const CLEAR_TABLE = 'table-builder_CLEAR_TABLE'

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
    }
  },
  actions: {
    getTable ({commit}, rows) {
      let url = `http://www.filltext.com/?rows=${rows}&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32};`

      fetch(url).then((res) => {
        return res.json()
      }).then((data) => {
        commit(ADD_TABLE, data)
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
    }
  }
}
