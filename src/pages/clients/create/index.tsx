import PageLayout from "@/components/PageLayout"
import { Routes } from "@/constants"
import { Button } from "@heroui/react"

const Create = () => {

  function renderActions() {
    return <div className="flex align-center gap-[10px]">
      <Button
        className="text-white shadow-lg"
        color="success"
      >
        {'Sacuvaj'}
      </Button>
      <Button
        className="text-white shadow-lg"
        color="danger"
      >
        {'Otkaži'}
      </Button>
    </div>
  }

  return <PageLayout
    title={'Dodaj klijenta'}
    actions={renderActions}
    closeUrl={Routes.CLIENTS}
  >
    <div></div>
  </PageLayout>
}
export default Create