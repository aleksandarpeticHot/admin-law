import PageLayout from '@/components/PageLayout';
import TableComp from '@/components/TableComp'
import { Routes } from '@/constants';
import { useClientsOptionsSWR, useClientsSWR } from '@/swr/clientSwr';
import {
  Input,
  Button,
  Select,
  SelectItem,
  Autocomplete,
  AutocompleteItem
} from '@heroui/react';
import { Search } from 'lucide-react'
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

const tableColumnHeaders = [
  {
    name: 'Ime',
    key: 'name'
  },
  {
    name: 'Drzava',
    key: 'state'
  },
  {
    name: 'Grad',
    key: 'cityId'
  },
  {
    name: 'Ulica',
    key: 'street'
  },
  {
    name: 'Telefon',
    key: 'telefon'
  },
  {
    name: 'JMBG/JIB',
    key: 'uniqueId'
  },
  {
    name: 'Tip klijenta',
    key: 'clientTypeId'
  },
  {
    name: 'Akcije'
  }
]

const Clients: React.FC = () => {
  const router = useRouter()

  const [filterValues, setFilterValues] = useState({
    rows: 20,
    page: 1,
    clientTypeId: '',
    cityId: ''
  })
  const [search, setSearch] = useState('')

  const {
    data: clientOptions,
    isLoading: isLoadingOptions
  } = useClientsOptionsSWR()

  const {
    data: clientsData,
    isLoading: isLoadingClients
  } = useClientsSWR(filterValues)

  const options = useMemo(() => clientOptions ?? { cities: [], clientTypes: [] }, [clientOptions]);

  function renderFilters() {
    return <div className='flex flex-col gap-4 mb-[1.5em]'>
      <div className='flex justify-between gap-3 items-end'>
        <Input
          isClearable
          classNames={{
            base: 'w-full sm:max-w-[250px]',
            inputWrapper: 'border-1 min-h-[40px]'
          }}
          placeholder='Trazi klijenta...'
          size='sm'
          startContent={<Search className='text-default-300' />}
          value={search}
          variant='bordered'
          onClear={() => setSearch('')}
          onValueChange={(value: string) => setSearch(value)}
        />
        <div className='flex gap-3'>

          <Autocomplete
            className='w-[200px]'
            value={filterValues.cityId}
            aria-label=''
            placeholder='Odaberite grad'
            onSelectionChange={(selected) => setFilterValues({
              ...filterValues,
              cityId: selected?.toString() || ''
            })}
          >
            {options.cities.map((city) => (
              <AutocompleteItem
                key={city.id}>{city.text}</AutocompleteItem>
            ))}
          </Autocomplete>

          <Select
            className='w-[200px]'
            aria-label=''
            placeholder='Izaberi vrstu klijenta'
            value={filterValues.clientTypeId}
          >
            {options.clientTypes.map((clientType) => (
              <SelectItem
                key={clientType.id}
                onPress={() => setFilterValues({
                  ...filterValues,
                  clientTypeId: clientType.id
                })}
              >{clientType.text}</SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  }

  function renderActions() {
    return <Button onPress={() => router.push(Routes.CLIENTS_CREATE)} color='primary' size='md'>
      Dodaj Klijenta
    </Button>
  }

  const isLoading = isLoadingClients || isLoadingOptions

  return <PageLayout
    title={'Klijenti'}
    isLoading={isLoading}
    actions={() => renderActions()}
  >
    <div className='space-y-8 animate-fade-in w-full'>
      <div>
        {renderFilters()}
        {!isLoading && <TableComp
          tableColumnHeaders={tableColumnHeaders}
          rows={clientsData?.data || []}
          page={filterValues.page}
          noResultsMessage={'Lista klijenata je prazna.'}
        />}
      </div>
    </div>
  </PageLayout>
}
export default Clients