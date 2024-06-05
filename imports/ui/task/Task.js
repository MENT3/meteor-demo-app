import { Template } from 'meteor/templating'

const { TasksCollection } = require("/imports/api/TasksCollection")

import './Task.html'

Template.task.events({
  'click .toggle-checked'() {
    TasksCollection.update(this._id, {
      $set: { isChecked: !this.isChecked }
    })
  },

  'click .delete'() {
    TasksCollection.remove(this._id)
  }
})
