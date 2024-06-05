import { ReactiveDict } from 'meteor/reactive-dict'
import { Template } from 'meteor/templating'

import './app.html'
import './app.css'
import '../login/login.js'
import '../task/task.js'
import '../task/taskForm.js'
import { TasksCollection } from '../../api/tasks/collections'
import { stateStatus } from '../../constants/state'

Template.mainContainer.onCreated(function() {
  this.state = new ReactiveDict()
})

Template.mainContainer.helpers({
  isUserLogged() { return !!Meteor.user() },

  isLoading() {
    const instance = Template.instance()
    return instance.state.get(stateStatus.IS_LOADING_STATE)
   },

  incompleteCount() {
    if (!Meteor.user()) return '0'

    const incompleteTasksCount = TasksCollection.find({ isChecked: { $ne: true } }).count()
    return incompleteTasksCount ? `${incompleteTasksCount}` : '0'
  }
})

Template.mainContainer.events({
  'click #hide-complete-button'(_, instance) {
    const currentHideCompleted = instance.state.get(stateStatus.HIDE_COMPLETED_STRING)
    instance.state.set(stateStatus.HIDE_COMPLETED_STRING, !currentHideCompleted)
  },
})
