import { Skeleton } from "@/shared/ui/skeleton/Skeleton";

export const ProductListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="flex flex-col rounded-xl bg-white p-4 shadow-sm h-128">
          <Skeleton className="aspect-square w-full rounded-lg mb-4" />

          <div className="mt-auto space-y-2 mb-2">
            <Skeleton className="h-6 w-3/4" /> 
            <Skeleton className="h-4 w-1/2" /> 
          </div>

          <div className="space-y-2 mb-4">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
          </div>

          <div className="flex items-center justify-between mt-auto">
            <Skeleton className="h-7 w-20" /> 
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};