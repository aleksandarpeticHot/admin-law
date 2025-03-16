import ClientForm from '@/components/Forms/clientForm'
import PageLayout from '@/components/PageLayout'
import { Routes } from '@/constants'
import { ClientService, ClientStoreType } from '@/lib/api/clients'
import { notify } from '@/pages/lib/notify'
import { useClientsOptionsSWR } from '@/swr/clientSwr'
import { Button } from '@heroui/react'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const Create = () => {
  const router = useRouter()

  const {
    data: clientOptions,
    isLoading: isLoadingOptions
  } = useClientsOptionsSWR()

  const methods = useForm<ClientStoreType>({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      clientTypeId: 1
    }
  })

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
    onSubmit={methods.handleSubmit(onSubmit)}
  >
    <FormProvider {...methods}>
      <ClientForm options={options} />
    </FormProvider>
  </PageLayout>
}
export default Create