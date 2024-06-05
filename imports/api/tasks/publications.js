import { TasksCollection } from '/imports/api/tasks/collections'

Meteor.publish('tasks', function () {
  return TasksCollection.find({ userId: this.userId })
})
