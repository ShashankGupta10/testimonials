import Navbar from '@/components/common/Navbar'
import Footer from '@/components/common/Footer'

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}