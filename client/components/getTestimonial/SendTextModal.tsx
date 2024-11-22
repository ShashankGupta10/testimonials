import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Label } from '@radix-ui/react-label'
import { toast } from 'react-toastify'
import { useParams } from 'next/navigation'
import { useAddTestimonial } from '@/hooks/useAddTestimonial'
import { Star } from 'lucide-react'
import { StarFilledIcon } from '@radix-ui/react-icons'

interface SendTextModalProps {
  isOpen: boolean
  onClose: () => void
  spaceData: {
    spaceName: string
    headerTitle: string
    customMessage: string
    questions: string[]
  }
}

const SendTextModal: React.FC<SendTextModalProps> = ({
  isOpen,
  onClose,
  spaceData,
}) => {
  const { mutate } = useAddTestimonial()
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    testimonial: '',
    rating: 0,
  })
  const { slug } = useParams()

  const handleSubmit = () => {
    if (!formData.name || !formData.companyName || !formData.testimonial) {
      toast.error('All fields and questions are required.')
      return
    }
    mutate({
      name: formData.name,
      companyName: formData.companyName,
      testimonialMessage: formData.testimonial,
      testimonialVideo: '',
      spaceId: slug as string,
      rating: formData.rating,
    })
    toast.success('Testimonial submitted successfully!')
  }

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {'Testimonial for ' + spaceData.headerTitle}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-gray-500">{spaceData.customMessage}</p>
          <ul className="list-disc list-inside text-black">
            {spaceData.questions.map((question, index) => (
              <div key={index}>
                <li>{question}</li>
              </div>
            ))}
          </ul>
          <div>
            <Label htmlFor="testimonial">Testimonial</Label>
            <Textarea
              id="testimonial"
              value={formData.testimonial}
              onChange={(e) =>
                setFormData({ ...formData, testimonial: e.target.value })
              }
              placeholder="Type your testimonial here"
              className="w-full"
              rows={4}
            />
          </div>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter your name"
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) =>
                setFormData({ ...formData, companyName: e.target.value })
              }
              placeholder="Enter your company name"
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="rating">Rating</Label>
            {/* Rating: Show 5 stars and how many stars the user clicks will be the rating */}

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setFormData({ ...formData, rating: star })} // Update rating on click
                  aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`} // Accessibility
                >
                  {star <= formData.rating ? <StarFilledIcon className='w-6 h-6 text-yellow-500' /> : <Star />}
                </button>
              ))}
            </div>
          </div>
          <Button onClick={handleSubmit} className="w-full">
            Submit Testimonial
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SendTextModal
