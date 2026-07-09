import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ExerciseCardSkeleton() {
	return (
		<Card className="relative mx-auto w-full max-w-sm pt-0">
			<Skeleton className="aspect-video w-full rounded-none" />

			<CardHeader>
				<CardAction>
					<Skeleton className="h-5 w-16 rounded-full" />
				</CardAction>
				<CardTitle>
					<Skeleton className="h-6 w-2/3" />
				</CardTitle>
				<CardDescription>
					<Skeleton className="hidden mt-1 h-4 w-full sm:block" />
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex flex-wrap gap-2">
					<Skeleton className="h-5 w-20 rounded-full" />
					<Skeleton className="h-5 w-18 rounded-full" />
					<Skeleton className="h-5 w-24 rounded-full" />
				</div>
			</CardContent>
		</Card>
	)
}