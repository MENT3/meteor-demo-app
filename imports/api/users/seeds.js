import { Accounts } from 'meteor/accounts-base'

const SEED_USER = {
  email: 'user@exemple.com',
  password: 'P@ssword1234',
}

export const usersSeed = () => {
  const user = Accounts.findUserByEmail(SEED_USER.email)

  if (!user) {
    return Accounts.createUser({
      email: SEED_USER.email,
      password: SEED_USER.password,
    })
  } else {
    return user._id
  }
}
