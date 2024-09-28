import Navbar from '@/components/common/Navbar'
import Hamburger from '@/components/common/Breadcrumb'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar />
      <div className="flex">
        <div className='p-8 w-full flex flex-col gap-4 h-[89vh]'>
          <Hamburger />
          {children}
        </div>
      </div>
    </>
  )
}
