import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export const ActivityDetailsSkeleton = () => {
  return (
    <div className="py-8 bg-muted/20 -mx-6 px-6">
      <div className="container mx-auto">
        <div className="mb-8">
          <Skeleton className="h-10 w-48 mb-4" />

          <Skeleton className="h-10 w-3/4 mt-2" />
          <Skeleton className="h-5 w-1/2 mt-3" />

          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-6 gap-x-4 border-t pt-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <Skeleton className="h-8 w-8 rounded-full mt-1" />
                <div className="w-full space-y-1">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-6 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <Skeleton className="h-[500px] w-full rounded-md" />

          <Card className="bg-gradient-to-br from-background to-muted/50">
            <CardHeader>
              <Skeleton className="h-6 w-1/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
