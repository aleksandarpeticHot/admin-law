import { ApiClientReturnType } from "./auth";
import api from "./http-common";

const getClients = (filterValues?: FilterValues) =>
  api.post('/clients/list', filterValues)

const getClientOptions = (): ApiClientReturnType<ClientOptionsType> =>
  api.get('/clients/options')

type FilterValues = {
  rows: number,
  page: number
}

export const ClientService = {
  getClients,
  getClientOptions
}

export type OptionType = {
  id: string,
  text: string
}

export type ClientOptionsType = {
  cities: OptionType[],
  clientTypes: OptionType[]
}

