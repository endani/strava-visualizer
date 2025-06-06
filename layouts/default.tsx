import { Navbar } from '@/components/navbar'
import { Head } from './head'
import { Geist } from 'next/font/google'

const geist = Geist({ subsets: ['latin'] })

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Head />
      <main className="container mx-auto max-w-7xl px-6 flex-grow">
        <Navbar />
        {children}
      </main>
    </div>
  )
}
