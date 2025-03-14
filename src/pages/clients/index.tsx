import TableComp from "@/components/TableComp"
import { Routes } from "@/constants";
import { ClientOptionsType, ClientService } from "@/lib/api/clients";
import {
  Input,
  Button,
  Select,
  SelectItem,
  Autocomplete,
  AutocompleteItem
} from "@heroui/react";
import { Search } from 'lucide-react'
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";

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
    clientType: '',
    city: ''
  })
  const [search, setSearch] = useState('')
  const [clients, setClients] = useState([])
  const [options, setOptions] = useState<ClientOptionsType>({
    cities: [],
    clientTypes: []
  })

  useEffect(() => {
    fetchClients()
  }, [])

  useEffect(() => {
    fetchClients()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValues])

  async function fetchClients() {
    try {
      const response = await ClientService.getClients({ ...filterValues })
      const responseOptions = await ClientService.getClientOptions()
      setClients(response.data.data)
      setOptions(responseOptions.data)
    } catch (error) {
      console.log(error)
    }
  }

  function renderFilters() {
    return <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          classNames={{
            base: "w-full sm:max-w-[250px]",
            inputWrapper: "border-1",
          }}
          placeholder="Trazi klijenta..."
          size="sm"
          startContent={<Search className="text-default-300" />}
          value={search}
          variant="bordered"
          onClear={() => setSearch('')}
          onValueChange={(value: string) => setSearch(value)}
        />
        <div className="flex gap-3">

          <Autocomplete
            className="w-[200px]"
            value={filterValues.city}
            aria-label=""
            placeholder="Odaberite grad"
          >
            {options.cities.map((city) => (
              <AutocompleteItem
                onPress={() => setFilterValues({
                  ...filterValues,
                  city: city.id
                })}
                key={city.id}>{city.text}</AutocompleteItem>
            ))}
          </Autocomplete>

          <Select
            className="w-[200px]"
            aria-label=""
            onChange={(event: ChangeEvent<HTMLSelectElement>) => console.log(event.currentTarget)}
            placeholder="Izaberi vrstu klijenta"
            value={filterValues.clientType}
          >
            {options.clientTypes.map((clientType) => (
              <SelectItem
                key={clientType.id}
                onPress={() => setFilterValues({
                  ...filterValues,
                  clientType: clientType.id
                })}
              >{clientType.text}</SelectItem>
            ))}
          </Select>

          <Button onPress={() => router.push(Routes.CLIENTS_CREATE)} color="primary" size="md">
            Dodaj Klijenta
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">Total {clients.length} klijenata</span>
        <label className="flex items-center text-default-400 text-small">
          Redova po stranici:
          <select
            className="bg-transparent outline-none text-default-400 text-small"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilterValues({
              ...filterValues,
              rows: parseInt(e.currentTarget.value, 10)
            })}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </label>
      </div>
    </div>
  }

  function renderActions() {
    return <>
    </>
  }

  return <div className="space-y-8 animate-fade-in w-full">
    <div>
      {renderFilters()}
      {renderActions()}
      <TableComp
        tableColumnHeaders={tableColumnHeaders}
        rows={clients}
        page={filterValues.page}
        noResultsMessage={'Lista klijenata je prazna.'}
      />
    </div>
  </div>
}
export default Clients