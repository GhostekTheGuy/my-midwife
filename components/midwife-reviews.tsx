import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

interface MidwifeReviewsProps {
  midwifeId: string
}

export function MidwifeReviews({ midwifeId }: MidwifeReviewsProps) {
  // This would normally come from an API
  const reviews = [
    {
      id: "1",
      name: "Marta K.",
      date: "May 15, 2023",
      rating: 5,
      comment:
        "Dr. Anna was incredibly helpful with my breastfeeding issues. She was patient, knowledgeable, and gave me practical advice that made a huge difference. I highly recommend her services!",
      avatar: "/placeholder.svg?height=40&width=40&query=woman with brown hair",
    },
    {
      id: "2",
      name: "Karolina W.",
      date: "April 28, 2023",
      rating: 5,
      comment:
        "I had an online consultation with Dr. Kowalska about my milk supply concerns. She provided excellent guidance and followed up with additional resources. Very professional and caring.",
      avatar: "/placeholder.svg?height=40&width=40&query=woman with blonde hair",
    },
    {
      id: "3",
      name: "Agnieszka M.",
      date: "April 10, 2023",
      rating: 4,
      comment:
        "Good advice and professional approach. The only reason for 4 stars instead of 5 is that the appointment started a bit late. Otherwise, very helpful consultation.",
      avatar: "/placeholder.svg?height=40&width=40&query=woman with black hair",
    },
    {
      id: "4",
      name: "Joanna P.",
      date: "March 22, 2023",
      rating: 5,
      comment:
        "Dr. Anna helped me with my newborn's latch issues. After just one session, we saw significant improvement. She's very knowledgeable and has a gentle, supportive approach.",
      avatar: "/placeholder.svg?height=40&width=40&query=woman with red hair",
    },
  ]

  // Calculate average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Reviews</h3>
              <p className="text-sm text-muted-foreground">{reviews.length} verified reviews</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="font-medium">{averageRating.toFixed(1)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {reviews.map((review) => (
        <Card key={review.id}>
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image src={review.avatar || "/placeholder.svg"} alt={review.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{review.name}</h4>
                  <span className="text-sm text-muted-foreground">{review.date}</span>
                </div>
                <div className="flex my-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm mt-2">{review.comment}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
