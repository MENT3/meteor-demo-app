import { ReactiveDict } from "meteor/reactive-dict";
import { Template } from "meteor/templating";

import { TasksCollection } from "../../api/TasksCollection";
import "./App.html";
import "../task/Task.js";

const HIDE_COMPLETED_STRING = "hideCompleted";

Template.mainContainer.onCreated(function () {
  this.state = new ReactiveDict();
});

Template.mainContainer.helpers({
  tasks() {
    const instance = Template.instance();
    const hideCompleted = instance.state.get(HIDE_COMPLETED_STRING);

    const hideCompletedFilter = { isChecked: { $ne: true } };

    return TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, {
      sort: { createdAt: -1 },
    }).fetch();
  },

  hideCompleted() {
    return Template.instance().state.get(HIDE_COMPLETED_STRING);
  },
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
