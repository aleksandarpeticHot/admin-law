import { Card, CardBody, CardHeader } from "@heroui/react"

const Dashboard = () => {

  const mockData = [
    { title: "Jovo coks v. valovi", desc: "Odnjelo sve niz valove", time: "2 hours ago" },
    { title: "Estate Planning - Williams Family", desc: "Documents ready for review", time: "Yesterday" },
    { title: "Corporate Merger - ABC Inc.", desc: "Due diligence completed", time: "2 days ago" },
    { title: "Martinez Property Dispute", desc: "New evidence submitted", time: "3 days ago" },
  ]

  const mockUpcomingData = [
    { title: "File Motion for Discovery", date: "Tomorrow, 5:00 PM" },
    { title: "Client Consultation - Jefferson", date: "Wed, 10:00 AM" },
    { title: "Contract Review - TechCorp", date: "Fri, 2:00 PM" },
    { title: "Deposition Preparation", date: "Next Monday" },
  ]

  function renderActivity() {
    return <Card className="max-w-[700px] w-[50%] p-[20px]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-2xl font-bold text-default-900">Recent Activity</p>
          <p className="text-small text-default-500">Your latest case updates and activities</p>
        </div>
      </CardHeader>
      <CardBody className="gap-[20px]">
        {mockData.map(mock => {
          return <div className="flex justify-between align-baseline" key={mock.title}>
            <div className="">
              <p className="text-lg text-default-700">{mock.title}</p>
              <p className="text-sm text-default-500">{mock.desc}</p>
            </div>
            <small className="text-default-500">{mock.time}</small>
          </div>
        })}
      </CardBody>
    </Card>
  }

  function renderUpcomingEvents() {
    return <Card className="w-[50%] max-w-[700px] p-[20px]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-2xl font-bold text-default-900">Upcoming Deadlines</p>
          <p className="text-small text-default-500">Your most pressing items</p>
        </div>
      </CardHeader>
      <CardBody className="gap-[20px]">
        {mockUpcomingData.map(mock => {
          return <div key={mock.date} className="flex justify-between items-center">
            <div>
              <p className="text-lg text-default-700">{mock.title}</p>
              <p className="text-sm text-default-500">{mock.date}</p>
            </div>
          </div>
        })}
      </CardBody>
    </Card>
  }

  return <div className="space-y-8 animate-fade-in w-full">
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground mt-2">Welcome back to your legal workspace</p>
    </div>
    <div className="flex align-center justify-around gap-[50px]">
      {renderActivity()}
      {renderUpcomingEvents()}
    </div>
  </div>

}
export default Dashboard