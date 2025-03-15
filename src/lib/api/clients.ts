import { ApiClientReturnType } from './auth';
import api from './http-common';

const getClients = (filterValues?: ClientFilterValuesType) =>
  api.post('/clients/list', filterValues)

const getClientOptions = (): ApiClientReturnType<ClientOptionsType> =>
  api.get('/clients/options')

const createClient = (data: ClientStoreType) =>
  api.post('/clients/create', data)

export type ClientFilterValuesType = {
  rows: number,
  page: number,
  cityId: string,
  clientTypeId: string
}

export const ClientService = {
  getClients,
  getClientOptions,
  createClient
}

export type OptionType = {
  id: string,
  text: string
}

export type ClientOptionsType = {
  cities: OptionType[],
  clientTypes: OptionType[]
}

export type ClientStoreType = {
  name: string;
  state: string;
  cityId: number;
  street: string;
  uniqueId: string;
  phoneNumber: string;
  fax?: string | null;
  bankAccountNumber?: string | null;
  contact?: string | null;
  clientTypeId: number;
  description?: string | null;
};

