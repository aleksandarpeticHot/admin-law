import { ClientFilterValuesType, ClientOptionsType, ClientService } from '@/lib/api/clients'
import useSWR, { SWRResponse } from 'swr'

export const useClientsSWR = (filterValues?: ClientFilterValuesType) => {
  return useSWR(
    filterValues ? ['/api/clients', filterValues] : null,
    async ([, filters]) => {
      const response = await ClientService.getClients(filters);
      return response.data;
    }
  );
};

export const useClientsOptionsSWR = (): SWRResponse<ClientOptionsType> => {
  return useSWR('/api/clients/options', async () => {
    const response = await ClientService.getClientOptions();
    return response.data;
  });
};