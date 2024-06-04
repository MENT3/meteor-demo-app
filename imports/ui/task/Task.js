const { TasksCollection } = require("/imports/api/TasksCollection")

import './Task.html'

Template.task.events({
  'click .toggle-checked'() {
    console.log(this)
    TasksCollection.update(this._id, {
      $set: { isChecked: !this.isCheked }
    })
  },

  'click .delete'() {
    TasksCollection.remove(this._id)
  }
})
