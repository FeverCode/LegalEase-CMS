import { createFileRoute, Link } from '@tanstack/react-router'
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { ListCollapse, UploadIcon, CalendarSearchIcon, PlusIcon,  UsersIcon} from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"


import {
  useQuery,
} from '@tanstack/react-query'


export const Route = createFileRoute('/dashboard/clients/')({
  component: ClientIndex
})


interface ClientProps {
  name: string;
  email: string;
  phone: string;
}

function shortenName(name: string): string {
  const names = name.split(" ")
  return names.map((n) => n[0]).join("")
}

function Client({name, email, phone}: ClientProps){
  return (
    <tr className="border-b border-secondary">
      <td className="px-4 py-4">
        <div className="flex items-center">
          <Avatar className="mr-3">
            <AvatarImage alt={name} src="/placeholder-avatar.jpg" />
            <AvatarFallback>{shortenName(name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-sm">Individual</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 ">{email}</td>
      <td className="px-4 py-4 ">{phone}</td>
      <td className="px-4 py-4 text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <ListCollapse className="w-4 h-4" />
              <span className="sr-only">Actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Client</DropdownMenuItem>
            <DropdownMenuItem>Edit Client</DropdownMenuItem>
            <DropdownMenuItem>Delete Client</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>

  )

}

function ClientList() {
  const {isPending, error, data} = useQuery({
    queryKey: [],
    queryFn: async () => {
      const response = await fetch(
        '/user/clients/get', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("auth_key")}`,
          }
        }
      )

      if (!response.ok) {
        let json = await response.json()
        throw new Error(json["detail"])
      }

      return response.json()
  }
  })


  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 flex-1">
      <div className="bg-background rounded-lg shadow-md overflow-hidden">
        <ScrollArea className="rounded-md h-96 border p-4">
        <table className="w-full table-auto">
          <thead className="bg-muted/40">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Email</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Phone</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
            </tr>
          </thead>

          <tbody>
            {isPending && (
              <tr>
                <td colSpan={5} className="text-center py-4">Loading...</td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan={5} className="text-center py-4">{error.message}</td>
              </tr>
            )}
            {data && data.map((client: ClientProps) => (
              <Client key={client.email} {...client} />
            ))}
          </tbody>
        </table>
        </ScrollArea>
      </div>
    </div>
  )
}



function ClientIndex() {
  return (
    <div className="flex max-h-screen w-full flex-col">
      <div className="w-full mb-8">
        <h1 className="text-3xl font-bold">Clients</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage your client information and cases.</p>
      </div>

      <main className="flex flex-wrap h-full">
          <Card className='flex flex-col items-center h-96'>
            <CardHeader>
              <CardTitle>Tools</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex sm:flex-row md:flex-col">
                <Link
                  className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-muted"
                  to="/dashboard/clients/add-file"
                >
                  <PlusIcon className="w-6 h-6" />
                  <span>New File</span>
                </Link>
                <Link
                  className="flex flex-col items-center gap-2 p-2 rounded-md hover:bg-muted"
                  to="/dashboard/clients/add-client"
                >
                  <UsersIcon className="w-6 h-6" />
                  <span>Add Client</span>
                </Link>

                <Link
                  className="flex flex-col items-center gap-2 p-2 rounded-md hover:bg-muted"
                  href="#"
                >
                  <UploadIcon className="w-6 h-6" />
                  <span>Upload Document</span>
                </Link>
                <Link
                  className="flex flex-col items-center gap-2 p-2 rounded-md hover:bg-muted"
                  href="#"
                >
                  <CalendarSearchIcon className="w-6 h-6" />
                  <span>Calendar</span>
                </Link>
              </div>
            </CardContent>
          </Card>

          <ClientList/>
      </main>
    </div>
  )
}
