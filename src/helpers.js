import { sessionService } from 'redux-react-session';

export const loadSession = (cb) => {
  return sessionService.loadSession()
    .then(data => {
      cb(data)
    })
    .catch(err => {
      cb({ token: null })
    })
}


export const loadUser = (cb) => {
  return sessionService.loadUser()
    .then(data => {
      cb(data)
    })
    .catch(err => {
      cb({user: null})
    })
}