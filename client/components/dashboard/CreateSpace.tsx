'use client'

import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Button } from '../ui/button'
import { FaPlus } from 'react-icons/fa6'
import { BiTrash } from 'react-icons/bi'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Switch } from '../ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import TestimonialCard from './TestimonialPreview'
import { useCreateSpace } from '@/hooks/useCreateSpace'
import LoadingAndErrorWrapper from '../common/LoadingAndErrorWrapper'
import { SpaceType } from '@appTypes'
import TestimonialForm from './TestimonialForm'

const CreateNewSpace = () => {
  const [formData, setFormData] = useState<SpaceType>({
    spaceName: '',
    headerTitle: '',
    customMessage: '',
    questions: [
      'Who are you / what are you working on?',
      'How has [our product / service] helped you?',
      'What is the best thing about [our product / service]?',
    ],
    stars: false,
    extraInfo: 'NAME',
  })
  const { mutate, data, error, isPending, isIdle, isSuccess, isError } =
    useCreateSpace()

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = mutate(formData)
  }

  return (
    <LoadingAndErrorWrapper isLoading={isPending} error={error}>
      <Dialog>
        <div className="block w-full h-full  mx-auto">
          <div className="flex justify-end">
            <DialogTrigger asChild>
              <Button className="flex items-center">
                <FaPlus className="mr-2" /> Create new Space
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl flex flex-col justify-between">
              <div className="grid xl:grid-cols-4 md:grid-cols-3 gap-8">
                <TestimonialForm formData={formData} setFormData={setFormData} handleChange={handleChange} handleSubmit={handleSubmit} />
                <div className="col-span-1 xl:col-span-2 flex items-center">
                  <TestimonialCard formData={formData} />
                </div>
              </div>
            </DialogContent>
          </div>
        </div>
      </Dialog>
    </LoadingAndErrorWrapper>
  )
}

export default CreateNewSpace
