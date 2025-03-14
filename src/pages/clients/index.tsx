import TableComp from "@/components/TableComp"
import { ClientService } from "@/lib/api/clients";
import {
  Input,
  Button
} from "@heroui/react";
import { Search } from 'lucide-react'
import { useEffect, useState } from "react";

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
  const [filterValues, setFilterValues] = useState({
    rows: 20,
    page: 1
  })
  const [search, setSearch] = useState('')
  const [clients, setClients] = useState([])

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
      setClients(response.data.data)
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
            base: "w-full sm:max-w-[25%]",
            inputWrapper: "border-1",
          }}
          placeholder="Search by name..."
          size="sm"
          startContent={<Search className="text-default-300" />}
          value={search}
          variant="bordered"
          onClear={() => setSearch('')}
          onValueChange={(value: string) => setSearch(value)}
        />
        <div className="flex gap-3">
          <Button className="bg-foreground text-background" size="md">
            Dodaj Klijenta
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">Total {clients.length} users</span>
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

  return <div className="space-y-8 animate-fade-in w-full">
    <div>
      {renderFilters()}
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