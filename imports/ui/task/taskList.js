import './taskList.html'
import { TasksCollection } from '/imports/api/tasks/collections'
import { stateStatus } from '/imports/constants/state'

const getTaskFilter = () => {
  const user = Meteor.user()

  const hideCompletedFilter = { isChecked: { $ne: true } }

  const userFilter = user ? { userId: user._id } : {}
  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter }

  return { userFilter, pendingOnlyFilter }
}

// this is clean ??
const getMainContainerInstance = (currentView) => currentView.parentView.parentView.templateInstance()

Template.taskList.onCreated(function() {
  const mainContainerInstance = getMainContainerInstance(this.view)

  const handler = Meteor.subscribe('tasks')
  Tracker.autorun(() => {
    mainContainerInstance.state.set(stateStatus.IS_LOADING_STATE, !handler.ready())
  })
})

Template.taskList.helpers({
  hideCompleted() {
    const mainContainerInstance = getMainContainerInstance(Template.instance().view)
    return mainContainerInstance.state.get(stateStatus.HIDE_COMPLETED_STRING)
  },

  tasks() {
    if (!Meteor.user()) return []

    const mainContainerInstance = getMainContainerInstance(Template.instance().view)
    const hideCompleted = mainContainerInstance.state.get(stateStatus.HIDE_COMPLETED_STRING)

    const { userFilter, pendingOnlyFilter } = getTaskFilter()
    return TasksCollection.find(hideCompleted ? pendingOnlyFilter : userFilter, {
      sort: { createdAt: -1 },
    }).fetch()
  }
})
