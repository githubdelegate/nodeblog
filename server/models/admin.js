const Admin = require('../db').Admin

module.exports = {
  find_by_admin_id (admin_id) {
    return Admin.find({admin_id}, (err, doc) => {
      return err ?  [] : doc
    })
  }
}