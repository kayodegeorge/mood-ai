import Editor from '@/components/Editor'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getEntry = async (id) => {
  const user = await getUserByClerkId()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
  })

  return entry
}
const EntryPage = async ({ params }) => {
  const entry = await getEntry(params.id)
  const analysisData = [
    { name: 'Summary', value: '' },
    { name: 'Subject', value: '' },
    { name: 'Mood', value: '' },
    { name: 'Nagative', value: false },
  ]
  return (
    <div className='h-full w-full grid grid-cols-3'>
      <div className='col-span-2'>
        <Editor entry={entry} />
      </div>
      <div className='border-l border-black/10'>
        <div className='bg-blue-300 px-6 py-10'>
          <h2 className='2xl'>Analysis</h2>
        </div>
        <div className=''>
          <ul>
            {analysisData.map((item) => (
              <li
                key={item.name}
                className='flex items-center justify-between text-lg font-semibold px-2 py-2 border-b border-t border-black/10'
              >
                <span className=''>{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default EntryPage
