import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { toast } from 'react-toastify'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { useAddTestimonial } from '@/hooks/useAddTestimonial'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { Textarea } from '../ui/textarea'
import { StarFilledIcon } from '@radix-ui/react-icons'
import { Star } from 'lucide-react'

interface RecordVideoModalProps {
  isOpen: boolean
  onClose: () => void
}

const RecordVideoModal: React.FC<RecordVideoModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { mutate, data } = useAddTestimonial()
  const { slug } = useParams()

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    videoUrl: null as string | null,
    videoFile: null as Blob | null,
    testimonialMessage: '',
    rating: 0,
  })
  const [isUploading, setIsUploading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const chunks: Blob[] = []

  const handleAddTestimonial = async () => {
    if (formData.videoFile) {
      const cloudinaryUrl = await uploadToCloudinary(formData.videoFile)
      setFormData({ ...formData, videoUrl: cloudinaryUrl })
      mutate({
        name: formData.name,
        companyName: formData.company,
        testimonialVideo: cloudinaryUrl,
        testimonialMessage: formData.testimonialMessage,
        spaceId: slug as string,
        rating: formData.rating,
      })
    }
  }

  const uploadToCloudinary = async (file: Blob) => {
    setIsUploading(true)
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    console.log(preset)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', preset || '')
    formData.append(
      'cloud_name',
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
    )

    try {
      const result = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      toast.success('Testimonial added successfully.')
      return result.data.secure_url
    } catch (error) {
      toast.error('Testimonial addition failed.')
      console.error('Cloudinary upload error:', error)
      return null
    } finally {
      setIsUploading(false)
      onClose()
    }
  }

  useEffect(() => {
    if (isRecording && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current
    }
  }, [isRecording])

  const startRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast.error('Your browser does not support video recording.')
      return
    }

    try {
      if (formData.videoUrl) {
        URL.revokeObjectURL(formData.videoUrl)
        setFormData({ ...formData, videoUrl: null })
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })

      streamRef.current = stream
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      mediaRecorder.ondataavailable = (event) => chunks.push(event.data)
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' })
        setFormData({
          ...formData,
          videoFile: blob,
          videoUrl: URL.createObjectURL(blob),
        })
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      toast.error('Failed to start recording. Please check permissions.')
      console.error('Error accessing media devices.', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='h-full overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle>Record a Video</DialogTitle>
        </DialogHeader>

        <div className="flex justify-center mb-4">
          {isRecording ? (
            <video ref={videoRef} autoPlay className="rounded-lg w-full" />
          ) : formData.videoUrl ? (
            <video
              controls
              src={formData.videoUrl}
              className="rounded-lg w-full"
            />
          ) : (
            <div className="bg-gray-200 w-full rounded-lg h-64 flex items-center justify-center">
              <span className="text-gray-500">Camera will appear here</span>
            </div>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="name" className="text-left w-32">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            className="w-full"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="company" className="text-left w-32">
            Company
          </Label>
          <Input
            id="company"
            name="company"
            className="w-full"
            placeholder="Enter your company"
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="company" className="text-left w-32">
            Testimonial Message
          </Label>
          <Textarea
            id="message"
            name="message"
            className="w-full"
            rows={2}
            placeholder="Enter your message..."
            value={formData.testimonialMessage}
            onChange={(e) =>
              setFormData({
                ...formData,
                testimonialMessage: e.target.value as string,
              })
            }
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="company" className="text-left w-32">
            Rating
          </Label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setFormData({ ...formData, rating: star })} // Update rating on click
                aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`} // Accessibility
              >
                {star <= formData.rating ? (
                  <StarFilledIcon className="w-6 h-6 text-yellow-500" />
                ) : (
                  <Star />
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-between space-x-4">
          {isRecording ? (
            <Button
              variant="destructive"
              className="w-full"
              onClick={stopRecording}
            >
              Stop Recording
            </Button>
          ) : (
            <Button
              onClick={startRecording}
              className="w-full"
              variant={'secondary'}
            >
              {formData.videoUrl ? 'Re-record' : 'Start Recording'}
            </Button>
          )}

          <Button
            className="w-full"
            onClick={handleAddTestimonial}
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Add Testimonial'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default RecordVideoModal
