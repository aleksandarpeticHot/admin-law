import api from "./http-common";

const getClients = (filterValues?: FilterValues) =>
  api.post('/clients/list', filterValues)

type FilterValues = {
  rows: number,
  page: number
}

export const ClientService = {
  getClients,
}