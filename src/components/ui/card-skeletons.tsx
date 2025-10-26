import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function CardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-56 w-full rounded-none" />
      <CardHeader className="space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-2 w-full mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-11 w-full" />
      </CardFooter>
    </Card>
  )
}

export function TestimonialSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-[350px] w-full rounded-none" />
      <CardContent className="p-6 space-y-4">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex items-center gap-3 mt-6">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function StatSkeleton() {
  return (
    <Card className="p-6 text-center space-y-3">
      <Skeleton className="h-16 w-16 rounded-full mx-auto" />
      <Skeleton className="h-10 w-24 mx-auto" />
      <Skeleton className="h-4 w-32 mx-auto" />
    </Card>
  )
}

export function TeamMemberSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-64 w-full rounded-none" />
      <CardContent className="p-6 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex gap-2 mt-4">
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
      </CardContent>
    </Card>
  )
}

export function ProgramCardSkeleton() {
  return (
    <Card className="h-full flex flex-col">
      <Skeleton className="h-56 w-full rounded-t-lg rounded-b-none" />
      <CardHeader className="space-y-3">
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardHeader>
      <CardContent className="grow space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-2 w-full rounded-full" />
          <Skeleton className="h-3 w-24" />
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-12 w-full" />
      </CardFooter>
    </Card>
  )
}

export function ImpactStorySkeleton() {
  return (
    <Card className="p-6 space-y-4">
      <Skeleton className="aspect-square rounded-lg" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </Card>
  )
}
