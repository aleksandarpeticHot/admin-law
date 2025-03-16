import PageLayout from '@/components/PageLayout'
import { Routes } from '@/constants'
import { useRouter } from 'next/router'

const ClientEdit: React.FC = () => {
  const router = useRouter()

  console.log(router.query?.id)

  return <PageLayout
    title={'Edit klijenta'}
    closeUrl={Routes.CLIENTS}
  >
    <></>
  </PageLayout>
}
export default ClientEdit