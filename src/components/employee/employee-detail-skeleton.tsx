import { Skeleton } from '../ui/skeleton';
import { Card, CardContent, CardHeader } from '../ui/card';

export function EmployeeDetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-20" />
        <div>
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96 mt-2" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-20 w-20 rounded-full" />
              <div>
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-6 w-32 mt-2" />
                <Skeleton className="h-6 w-24 mt-2" />
              </div>
            </div>
            <div className="text-right">
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}