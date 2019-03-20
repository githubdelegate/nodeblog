const mutations = {
  saveAdminInfo: (state, data) => {
    state.adminInfo.admin_id = data.admin_id
  }
}

export default mutations
