import Navbar from '@/components/common/Navbar'
import Footer from '@/components/common/Footer'
import Sidebar from '@/components/common/Sidebar'
import Hamburger from '@/components/common/Hamburger'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className='ml-96 py-8 w-full flex flex-col gap-4 px-4'>
          <Hamburger />
          {children}
        </div>
      </div>
    </>
  )
}
