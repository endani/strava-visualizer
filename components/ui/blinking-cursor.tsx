import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

const BlinkingCursor = ({ className }: { className?: string }) => {
  return (
    <motion.div
      animate="visible"
      className={cn('h-5 w-1 bg-slate-400', className)}
      initial="hidden"
      transition={{
        duration: 0.5,
        repeat: Infinity,
        repeatType: 'reverse',
      }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
    />
  )
}

export { BlinkingCursor }
