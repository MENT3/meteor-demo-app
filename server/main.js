import { Meteor } from 'meteor/meteor'

// users
import { usersSeed } from '/imports/api/users/seeds';
// tasks
import '/imports/api/tasks/methods'
import '/imports/api/tasks/publications'
import { tasksSeeds } from '/imports/api/tasks/seeds';

Meteor.startup(() => {
  const userId = usersSeed()
  tasksSeeds(userId)
})
