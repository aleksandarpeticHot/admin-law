import ClientForm from '@/components/Forms/clientForm'
import PageLayout from '@/components/PageLayout'
import { Routes } from '@/constants'
import { ClientEditType, ClientService } from '@/lib/api/clients'
import { notify } from '@/pages/lib/notify'
import { useClientsOptionsSWR } from '@/swr/clientSwr'
import { Button } from '@heroui/react'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const ClientEdit: React.FC = () => {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const methods = useForm<ClientEditType>({
    mode: 'onSubmit',
    defaultValues: {
      clientTypeId: 1
    }
  })

  const {
    data: clientOptions,
    isLoading: isLoadingOptions
  } = useClientsOptionsSWR()

  useEffect(() => {
    if (router.query.id) {
      fetchData()
    }
  }, [router.query.id])

  async function fetchData() {
    setIsLoading(true)
    try {
      const response = await ClientService.getClient(router.query.id as string)
      methods.reset({
        ...response.data
      })
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  function renderActions() {
    return <Button
      color='success'
      type='submit'
      className='text-white shadow-lg'>
      {'Sacuvaj'}
    </Button>
  }

  async function onSubmit(data: ClientEditType) {
    setIsLoading(true)
    try {

      const payload = Object.keys(methods.formState.dirtyFields).reduce((previousValue, currentValue) => {
        const typedKey = currentValue as keyof ClientEditType;
        if (data[typedKey]) {
          return {
            ...previousValue,
            [typedKey]: data[typedKey]
          }
        }
        return previousValue;
      }, {} as Partial<ClientEditType>)

      await ClientService.updateClient(router.query.id as string, payload)
      notify('Cestitam', 'success', 'Klijent je uspešno ažuriran.')
      router.push(Routes.CLIENTS)
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  const options = useMemo(() => clientOptions ?? { cities: [], clientTypes: [] }, [clientOptions]);

  return <PageLayout
    title={'Edit klijenta'}
    closeUrl={Routes.CLIENTS}
    isLoading={isLoadingOptions || isLoading}
    actions={() => renderActions()}
    onSubmit={methods.handleSubmit(onSubmit)}
  >
    <FormProvider {...methods}>
      <ClientForm options={options} />
    </FormProvider>
  </PageLayout>
}
export default ClientEdit