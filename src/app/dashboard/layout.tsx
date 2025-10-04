import { SidebarProvider } from '@/components/ui/sidebar';
import { getAllPlaygroundForUser } from '@/features/dashboard/actions';
import DashboardSidebar from '@/features/dashboard/components/dashboard-sidebar';
import React from 'react';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

  const playgroundData = await getAllPlaygroundForUser()


  const technologyIconMap: Record<string, string> = {
    REACT: "Zap",
    NEXTJS: "Lightbulb",
    EXPRESS: "Database",
    VUE: "Compass",
    HONO: "FlameIcon",
    ANGULAR: "Terminal",
  }

  const formattedPlaygroundData =
    playgroundData?.map((item) => ({
      id: item.id,
      name: item.title,
      starred: item.Starmark?.[0]?.isMarked || false,
      icon: technologyIconMap[item.template] || "Code2", 
    })) || []


  return (
    <div>
      <SidebarProvider>
        <div className='flex min-h-screen w-full overflow-x-hidden '>
            {/* TODO: DashboardSidebar */}
            <DashboardSidebar initialPlaygroundData={[]} />
            <main className='flex-1'>
                {children}
            </main>
        </div>
      </SidebarProvider>
    </div>
  );
}