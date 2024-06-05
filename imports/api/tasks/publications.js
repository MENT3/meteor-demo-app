import { TasksCollection } from '/imports/api/collections'

Meteor.publish('tasks', function () {
  return TasksCollection.find({ userId: this.userId })
})
