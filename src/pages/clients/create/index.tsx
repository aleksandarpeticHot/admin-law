import { FormFields } from '@/components/FormFields'
import PageLayout from '@/components/PageLayout'
import { Routes } from '@/constants'
import { useClientsOptionsSWR } from '@/swr/clientSwr'
import { Button, SelectItem } from '@heroui/react'
import { Building2, IdCard } from 'lucide-react'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

type FormValues = {
  name: string,
  clientTypeId: number,
  uniqueId: string
  bankAccountNumber: string | null
}

const Create = () => {

  const {
    data: clientOptions,
    isLoading: isLoadingOptions
  } = useClientsOptionsSWR()

  const { control, handleSubmit, watch } = useForm<FormValues>({
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
    </>
  }

  async function onSubmit(data: unknown) {
    console.log(data)
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