import EmptyState from '@/components/ui/empty-state'
import { deleteProjectById, duplicateProjectById, editProjectById, getAllPlaygroundForUser } from '@/features/dashboard/actions'
import AddNewButton from '@/features/dashboard/components/add-new-button'
import ProjectTable from '@/features/dashboard/components/project-table'
import React from 'react'

const Page = async () => {
  const playgrounds = await getAllPlaygroundForUser();
  return (
    <div className = 'flex flex-col justify-start items-center min-h-screen mx-auto max-w-7xl px-4 py-10'>
      <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full'>
        <AddNewButton />
      </div>

      <div className = 'mt-10 flex flex-col justify-center items-center w-full'></div>
      {
        playgrounds && playgrounds.length === 0 ? (
          <EmptyState
            title="No Playgrounds"
            description="You have not created any playgrounds yet. Click the button above to add a new one."
            imageSrc= {'developer-avatar.svg'}
          />
        ) : (
          // TODO add playground table
          // @ts-ignore
          <ProjectTable
            projects={playgrounds || []}
            onDelete={deleteProjectById}
            onUpdateProject={editProjectById}
            onDuplicateProject={duplicateProjectById}
          />
        )
      }
    </div>
  )
}

export default Page