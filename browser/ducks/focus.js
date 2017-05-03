// Actions
export const FOCUS_SIDE_NAV = 'boostnote/focus/FOCUS_SIDE_NAV'
export const UNFOCUS_SIDE_NAV = 'boostnote/focus/UNFOCUS_SIDE_NAV'

// Action Creators
export function focusSideNav () {
  return { type: FOCUS_SIDE_NAV }
}
export function unfocusSideNav () {
  return { type: UNFOCUS_SIDE_NAV }
}

const initState = {
  sideNav: false
}

// Reducer
export default function reducer (state = initState, action) {
  switch (action.type) {
    case FOCUS_SIDE_NAV:
      return Object.assign({}, state, { sideNav: true })
    case UNFOCUS_SIDE_NAV:
      return Object.assign({}, state, { sideNav: false })
  }
  return state
}
