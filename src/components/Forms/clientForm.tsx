import { useFormContext, useWatch } from 'react-hook-form'
import { FormFields } from '../FormFields'
import { Building2, Flag, IdCard, MapPinHouse, Phone } from 'lucide-react'
import { AutocompleteItem, SelectItem } from '@heroui/react'
import { ClientOptionsType } from '@/lib/api/clients'
import { useEffect } from 'react'

interface Props {
  options: ClientOptionsType
}

const ClientForm: React.FC<Props> = ({ options }) => {
  const { control, formState: { touchedFields }, setValue } = useFormContext()

  const watchClientType = useWatch({ control, name: 'clientTypeId' })
  const watchUnique = useWatch({ control, name: 'uniqueId' })

  useEffect(() => {
    if (touchedFields.clientTypeId) {
      setValue('uniqueId', '')
    }
    // eslint-disable-next-line
  }, [watchClientType])

  function renderUniqueId() {
    if (watchClientType.toString() === '2') {
      return <div className='w-[100%] flex flex-col'>
        <FormFields.Input
          control={control}
          label='JMBG'
          rules={{
            required: {
              value: true,
              message: 'Molimo unesite JMBG'
            },
            maxLength: {
              value: 13,
              message: 'Polje mora imati tačno 13 karaktera!'
            },
            minLength: {
              value: 13,
              message: 'Polje mora imati tačno 13 karaktera!'
            }
          }}
          name='uniqueId'
          classNames={{
            innerWrapper: ['w-[50%] max-w-[50%]'],
            label: ['!text-black']
          }}
          className='m-0'
          labelPlacement='outside'
          placeholder='e.g. 0322119900097'
          variant='bordered'
          startContent={
            <IdCard />
          }
        />
        <small style={{ color: watchUnique?.length > 13 ? 'red' : 'black' }}>{`${watchUnique?.length || 0}/13`}</small>
      </div>
    }

    return <div className='w-[100%] flex flex-col'>
      <FormFields.Input
        control={control}
        label='JIB'
        rules={{
          required: {
            value: true,
            message: 'Molimo unesite JIB'
          },
          maxLength: {
            value: 8,
            message: 'Polje mora imati tačno 8 karaktera!'
          },
          minLength: {
            value: 8,
            message: 'Polje mora imati tačno 8 karaktera!'
          }
        }}
        name='uniqueId'
        classNames={{
          innerWrapper: ['w-[50%] m-0'],
          label: ['!text-black']
        }}
        className='m-0'
        labelPlacement='outside'
        placeholder='e.g. 0322119900097'
        variant='bordered'
        startContent={
          <IdCard />
        }
      />
      <small style={{ color: watchUnique?.length > 8 ? 'red' : 'black' }}>{`${watchUnique?.length || 0}/8`}</small>
    </div>
  }

  return <>
    <div className='flex align-centar gap-[20px]'>
      <FormFields.Input
        control={control}
        label='Ime'
        rules={{
          required: {
            value: true,
            message: 'Molimo unesite ime'
          },
          maxLength: {
            value: 150,
            message: 'Max. broj karaktera je 150!'
          }
        }}
        name='name'
        classNames={{
          innerWrapper: ['w-[50%]'],
          label: ['!text-black']
        }}
        labelPlacement='outside'
        placeholder='e.g. Alpe adria Bank'
        variant='bordered'
        startContent={
          <Building2 />
        }
      />
      <FormFields.Select
        label='Vrsta klijenta'
        control={control}
        name={'clientTypeId'}
        rules={{
          required: {
            value: true,
            message: 'Molimo izaberite vrstu klijenta!'
          }
        }}
        aria-label=''
        labelPlacement='outside'
        classNames={{
          innerWrapper: [
            'w-[50%]'
          ],
          label: ['!text-black']
        }}
        selectedKeys={[watchClientType.toString()]}
        variant='bordered'
        placeholder='Izaberi vrstu klijenta'
      >
        {options.clientTypes.map((clientType) => (
          <SelectItem
            key={clientType.id}
          >{clientType.text}</SelectItem>
        ))}
      </FormFields.Select>
    </div>
    <div className='flex align-centar gap-[20px]'>
      {renderUniqueId()}
      <FormFields.Input
        control={control}
        label='Ziro racun'
        rules={{
          maxLength: {
            value: 50,
            message: 'Max. broj karaktera je 50!'
          }
        }}
        name='bankAccountNumber'
        classNames={{
          innerWrapper: ['w-[50%]'],
          label: ['!text-black']
        }}
        labelPlacement='outside'
        placeholder='e.g. 0032 3321 3321 4444'
        variant='bordered'
        startContent={
          <Building2 />
        }
      />
    </div>
    <div className='flex align-centar gap-[20px]'>
      <FormFields.Input
        control={control}
        label='Drzava'
        rules={{
          maxLength: {
            value: 200,
            message: 'Max. broj karaktera je 200!'
          }
        }}
        name='state'
        classNames={{
          innerWrapper: ['w-[50%]'],
          label: ['!text-black']
        }}
        labelPlacement='outside'
        placeholder='e.g. Bosna i Hercegovina'
        variant='bordered'
        startContent={
          <Flag />
        }
      />
      <FormFields.AutComplete
        label={<span className='text-black'>{'Grad'}</span>}
        control={control}
        name={'cityId'}
        aria-label=''
        autoComplete='off'
        labelPlacement='outside'
        classNames={{
          listboxWrapper: ['!text-black']
        }}
        variant='bordered'
        placeholder='Izaberite grad'
        value={'2'}
      >
        {options.cities.map((city) => (
          <AutocompleteItem
            key={city.id}
          >{city.text}</AutocompleteItem>
        ))}
      </FormFields.AutComplete>
    </div>
    <div className='flex align-centar gap-[20px]'>
      <FormFields.Input
        control={control}
        label='Ulica'
        rules={{
          maxLength: {
            value: 200,
            message: 'Max. broj karaktera je 200!'
          }
        }}
        name='street'
        classNames={{
          innerWrapper: ['w-[50%]'],
          label: ['!text-black']
        }}
        labelPlacement='outside'
        placeholder='e.g. Zivojina Misica 35'
        variant='bordered'
        startContent={
          <MapPinHouse />
        }
      />
      <FormFields.Input
        control={control}
        label='Telefon'
        rules={{
          required: {
            value: true,
            message: 'Molimo unesite telefon'
          },
          maxLength: {
            value: 150,
            message: 'Max. broj karaktera je 150!'
          }
        }}
        name='phoneNumber'
        classNames={{
          innerWrapper: ['w-[50%]'],
          label: ['!text-black']
        }}
        labelPlacement='outside'
        placeholder='e.g. 065-221-333'
        variant='bordered'
        startContent={
          <Phone />
        }
      />
    </div>
    <div className='flex align-centar gap-[20px]'>
      <FormFields.Input
        control={control}
        label='Faks'
        rules={{
          maxLength: {
            value: 150,
            message: 'Max. broj karaktera je 150!'
          }
        }}
        name='fax'
        classNames={{
          innerWrapper: ['w-[50%]'],
          label: ['!text-black']
        }}
        labelPlacement='outside'
        placeholder='e.g. 11222'
        variant='bordered'
        startContent={
          <Phone />
        }
      />
      <FormFields.Input
        control={control}
        label='Kontact'
        rules={{
          maxLength: {
            value: 150,
            message: 'Max. broj karaktera je 150!'
          }
        }}
        name='contact'
        classNames={{
          innerWrapper: ['w-[50%]'],
          label: ['!text-black']
        }}
        labelPlacement='outside'
        placeholder='e.g. 065-221-333'
        variant='bordered'
        startContent={
          <Phone />
        }
      />
    </div>
    <div className='flex align-centar gap-[20px]'>
      <FormFields.Textarea
        name={'description'}
        control={control}
        placeholder={'Unesite Opis'}
        variant='bordered'
        classNames={{
          innerWrapper: ['w-[50%]'],
          label: ['!text-black']
        }}
        label='Opis'
        rules={{
          maxLength: {
            value: 1000,
            message: 'Max. broj karaktera je 1000!'
          }
        }}
      />
    </div>
  </>
}
export default ClientForm