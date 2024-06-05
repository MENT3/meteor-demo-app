import './taskForm.html'

Template.form.events({
  'submit .task-form'(event) {
    event.preventDefault()

    const target = event.target
    const text = target.text.value

    Meteor.call('tasks.insert', text)

    target.text.value = ''
  },
})
