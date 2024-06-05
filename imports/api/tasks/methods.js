import { check } from "meteor/check"
import { TasksCollection } from "../collections"

Meteor.methods({
  'tasks.insert'(text) {
    check(text, String)

    if (!this.userId) throw new Error("403 - Not autorized")

    TasksCollection.insert({
      text,
      userId: this.userId,
      createdAt: new Date(),
    })
  },

  'tasks.remove'(taskId) {
    check(taskId, String)

    if (!this.userId) throw new Error("403 - Not autorized")

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId })
    if (!task) throw new Meteor.Error('Access denied.')

    TasksCollection.remove(taskId)
  },

  'tasks.setIsChecked'(taskId, isChecked) {
    check(taskId, String)
    check(isChecked, Boolean)

    if (!this.userId) throw new Error("403 - Not autorized")

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId })
    if (!task) throw new Meteor.Error('Access denied.')

    TasksCollection.update(taskId, {
      $set: { isChecked }
    })
  },
})
