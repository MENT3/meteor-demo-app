import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import './login.html'
import './login.css'

Template.login.events({
  'submit .login-form'(e) {
    e.preventDefault()

    const target = e.target

    const email = target.email.value
    const password = target.password.value

    Meteor.loginWithPassword(email, password)
  },
})
