import { Template } from 'meteor/templating'

import './task.html'
import './taskList.js'

Template.task.events({
  'click .toggle-checked'() {
    Meteor.call('tasks.setIsChecked', this._id, !this.isChecked)
  },

  'click .delete'() {
    Meteor.call('tasks.remove', this._id)
  }
})
