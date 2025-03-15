import { FormFields } from '@/components/FormFields'
import PageLayout from '@/components/PageLayout'
import { Routes } from '@/constants'
import { ClientService, ClientStoreType } from '@/lib/api/clients'
import { notify } from '@/pages/lib/notify'
import { useClientsOptionsSWR } from '@/swr/clientSwr'
import { Button, SelectItem } from '@heroui/react'
import { Building2, IdCard, Flag, MapPinHouse, Phone } from 'lucide-react'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

const Create = () => {
  const router = useRouter()

  const {
    data: clientOptions,
    isLoading: isLoadingOptions
  } = useClientsOptionsSWR()

  const { control, handleSubmit, watch } = useForm<ClientStoreType>({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      clientTypeId: 1
    }
  })

  const watchClientType = watch('clientTypeId')

  function renderUniqueId() {
    if (watchClientType.toString() === '1') {
      return <FormFields.Input
        control={control}
        label='JMBG'
        rules={{
          required: {
            value: true,
            message: 'Molimo unesite JMBG'
          },
          maxLength: {
            value: 13,
            message: 'Max. broj karaktera je 13!'
          }
        }}
        name='uniqueId'
        classNames={{
          innerWrapper: ['w-[50%] max-w-[50%]'],
          label: ['!text-black']
        }}
        labelPlacement='outside'
        placeholder='e.g. 0322119900097'
        variant='bordered'
        startContent={
          <IdCard />
        }
      />
    }

    return <FormFields.Input
      control={control}
      label='JIB'
      rules={{
        required: {
          value: true,
          message: 'Molimo unesite JIB'
        },
        maxLength: {
          value: 8,
          message: 'Max. broj karaktera je 8!'
        }
      }}
      name='uniqueId'
      classNames={{
        innerWrapper: ['w-[50%]'],
        label: ['!text-black']
      }}
      labelPlacement='outside'
      placeholder='e.g. 0322119900097'
      variant='bordered'
      startContent={
        <IdCard />
      }
    />
  }

  function renderForm() {
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
            required: {
              value: true,
              message: 'Molimo unesite drzavu'
            },
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
        <FormFields.Select
          label='Grad'
          control={control}
          name={'cityId'}
          rules={{
            required: {
              value: true,
              message: 'Molimo izaberite grad!'
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
          variant='bordered'
          placeholder='Izaberite grad'
        >
          {options.cities.map((city) => (
            <SelectItem
              key={city.id}
            >{city.text}</SelectItem>
          ))}
        </FormFields.Select>
      </div>
      <div className='flex align-centar gap-[20px]'>
        <FormFields.Input
          control={control}
          label='Ulica'
          rules={{
            required: {
              value: true,
              message: 'Molimo unesite ulicu'
            },
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

  async function onSubmit(data: ClientStoreType) {
    try {
      await ClientService.createClient(data)
      notify('Uspjeh', 'success', 'Uspjesno ste kreirali klijenta')
      router.push(Routes.CLIENTS)
    } catch (error) {
      console.log(error)
    }
  }

  function renderActions() {
    return <div className='flex align-center gap-[10px]'>
      <Button
        className='text-white shadow-lg'
        color='success'
        type='submit'
      >
        {'Sacuvaj'}
      </Button>
      <Button
        className='text-white shadow-lg'
        color='danger'
      >
        {'Otkaži'}
      </Button>
    </div>
  }

  const options = useMemo(() => clientOptions ?? { cities: [], clientTypes: [] }, [clientOptions]);

  return <PageLayout
    title={'Dodaj klijenta'}
    isLoading={isLoadingOptions}
    actions={renderActions}
    closeUrl={Routes.CLIENTS}
    onSubmit={handleSubmit(onSubmit)}
  >
    {renderForm()}
  </PageLayout>
}
export default Create