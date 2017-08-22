import { tail, split } from 'ramda'

const formatUserId = inStr => tail(split('|', inStr))[0]

export default formatUserId
