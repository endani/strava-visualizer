import { Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils'

export const Loader = ({ className }: { className?: string }) => {
  return (
    <div className="flex justify-center items-center w-full">
      <Loader2 className={cn('h-8 w-8 animate-spin text-primary', className)} />
    </div>
  )
}
