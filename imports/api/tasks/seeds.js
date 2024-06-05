import { TasksCollection } from "/imports/api/collections"

const insertTask = (taskText, userId) =>
  TasksCollection.insert({
    text: taskText,
    userId: userId,
    createdAt: new Date(),
  })

export const tasksSeeds = (userId) => {
  if (TasksCollection.find().count() === 0) {
    [
      "First Task",
      "Second Task",
      "Third Task",
      "Fourth Task",
      "Fifth Task",
      "Sixth Task",
      "Seventh Task",
    ].forEach(task => insertTask(task, userId))
  }
}
