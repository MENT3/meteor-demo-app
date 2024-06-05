import { ReactiveDict } from "meteor/reactive-dict";
import { Template } from "meteor/templating";

import { TasksCollection } from "../../api/TasksCollection";
import "./App.html";
import "../task/Task.js";
import "../login/Login.js";

const HIDE_COMPLETED_STRING = "hideCompleted";

const getTaskFilter = () => {
  const user = Meteor.user()

    const hideCompletedFilter = { isChecked: { $ne: true } };

    const userFilter = user ? { userId: user._id } : {}
    const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter }
    return { userFilter, pendingOnlyFilter }
}

Template.mainContainer.onCreated(function mainContainerOnCreated() {
  this.state = new ReactiveDict();
});

Template.mainContainer.helpers({
  isUserLogged() {
    return !!Meteor.user()
  },

  tasks() {
    if (!Meteor.user()) return []

    const instance = Template.instance();
    const hideCompleted = instance.state.get(HIDE_COMPLETED_STRING);

    const { userFilter, pendingOnlyFilter } = getTaskFilter()
    return TasksCollection.find(hideCompleted ? pendingOnlyFilter : userFilter, {
      sort: { createdAt: -1 },
    }).fetch()
  },

  hideCompleted() {
    return Template.instance().state.get(HIDE_COMPLETED_STRING);
  },

  incompleteCount() {
    if (!Meteor.user()) return ''

    const incompleteTasksCount = TasksCollection.find({ isChecked: { $ne: true } }).count()
    return incompleteTasksCount ? `${incompleteTasksCount}` : ''
  }
});

Template.mainContainer.events({
  "click #hide-complete-button"(_, instance) {
    const currentHideCompleted = instance.state.get(HIDE_COMPLETED_STRING);
    instance.state.set(HIDE_COMPLETED_STRING, !currentHideCompleted);
  },
});

Template.form.events({
  "submit .task-form"(event) {
    event.preventDefault();

    const target = event.target;
    const text = target.text.value;

    TasksCollection.insert({
      text,
      createdAt: new Date(),
    });

    target.text.value = "";
  },
});
