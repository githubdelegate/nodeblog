const Article = require('../db').Article

module.exports = {
  find_all(json) {
    let {query={},fields={},options={}} = json
    return Article.find(query, fields, options, (err, doc) => {
      return err? [] : doc
    }).populate({
      path: 'article_tags',
      select: '_id tags_name tags_desc'
    })
  },

  find_by_id(id) {
    Article.findById(id, (err,doc) => {
      return err?[]:doc
    })
  },
  update(id,json) {
    Article.findByIdAndUpdate(id,json,{new: true}, (err,doc) => {
      return err?[]:doc
    })
  },
  delete(id){
    Article.findByIdAndRemove(id,(err,doc) => {
      return err? []: doc
    })
  }


}