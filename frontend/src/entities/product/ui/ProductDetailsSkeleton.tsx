import { Skeleton } from "@/shared/ui/skeleton/Skeleton";

export const ProductDetailsSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <Skeleton className="h-6 w-32 mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="relative aspect-square w-full rounded-3xl border border-gray-100 overflow-hidden">
           <Skeleton className="h-full w-full" />
        </div>

        <div className="flex flex-col justify-center space-y-6">
          
          <div className="space-y-4">
            <Skeleton className="h-5 w-24" /> 
            <Skeleton className="h-12 w-3/4" /> 
          </div>

          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>

          <hr className="border-gray-100" />

          <div className="flex items-center justify-between">
             <div className="space-y-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-10 w-32" /> 
             </div>
             <Skeleton className="h-8 w-24 rounded-full" /> 
          </div>

          <div className="space-y-3">
             <Skeleton className="h-5 w-32" /> 
             <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-10 w-16 rounded-md" />
                ))}
             </div>
          </div>

          <Skeleton className="h-14 w-full rounded-xl md:w-1/2" />
        </div>
      </div>
    </div>
  );
};