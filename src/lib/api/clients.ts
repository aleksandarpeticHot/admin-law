import { ApiClientReturnType } from './auth';
import api from './http-common';

const getClients = (filterValues?: ClientFilterValuesType) =>
  api.post('/clients/list', filterValues)

const getClientOptions = (): ApiClientReturnType<ClientOptionsType> =>
  api.get('/clients/options')

export type ClientFilterValuesType = {
  rows: number,
  page: number,
  cityId: string,
  clientTypeId: string
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

