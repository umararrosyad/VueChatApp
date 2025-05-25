import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://rubychatappbe-production.up.railway.app/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default instance
