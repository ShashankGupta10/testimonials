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
        <div className="block w-full h-full max-w-screen-xl mx-auto">
          <div className="flex justify-end">
            <DialogTrigger asChild>
              <Button className="flex items-center">
                <FaPlus className="mr-2" /> Create new Space
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl flex flex-col justify-between">
              <div className="grid xl:grid-cols-4 md:grid-cols-3 gap-8">
                {/* Form starts here */}
                <form className="col-span-2" onSubmit={handleSubmit}>
                  <DialogHeader>
                    <DialogTitle>Create New Space</DialogTitle>
                    <DialogDescription>
                      After the Space is created, it will generate a dedicated
                      page for collecting testimonials.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    {/* Space Name */}
                    <div className="flex gap-4 items-center">
                      <Label htmlFor="space-name" className="text-left w-32">
                        Space Name
                      </Label>
                      <Input
                        id="space-name"
                        name="spaceName"
                        className="w-full"
                        placeholder="Enter space name"
                        value={formData.spaceName}
                        onChange={handleChange}
                      />
                    </div>
                    {/* Header Title */}
                    <div className="flex gap-4 items-center">
                      <Label htmlFor="header-title" className="text-left w-32">
                        Header Title
                      </Label>
                      <Input
                        id="header-title"
                        name="headerTitle"
                        className="w-full"
                        placeholder="Would you like to give a shoutout?"
                        value={formData.headerTitle}
                        onChange={handleChange}
                      />
                    </div>
                    {/* Custom Message */}
                    <div className="flex gap-4 items-start">
                      <Label
                        htmlFor="custom-message"
                        className="text-left w-32"
                      >
                        Message
                      </Label>
                      <Textarea
                        id="custom-message"
                        name="customMessage"
                        className="w-full"
                        placeholder="Write a warm message for your customers."
                        value={formData.customMessage}
                        onChange={handleChange}
                      />
                    </div>
                    {/* Questions */}
                    <div className="flex flex-col gap-2">
                      <Label className="text-left w-32">Questions</Label>
                      {formData.questions.map((question, idx) => (
                        <div className="flex gap-2" key={idx}>
                          <Input
                            value={question}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                questions: formData.questions.map((q, i) =>
                                  i === idx ? e.target.value : q,
                                ),
                              })
                            }
                            placeholder="Enter question"
                            className="w-full"
                          />
                          <BiTrash
                            className="text-red-600 my-auto cursor-pointer"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                questions: formData.questions.filter(
                                  (_, i) => i !== idx,
                                ),
                              })
                            }
                          />
                        </div>
                      ))}
                      <Button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            questions: [...formData.questions, ''],
                          })
                        }
                        className="mt-2"
                      >
                        Add Question
                      </Button>
                    </div>
                    {/* Collect Star Ratings */}
                    <div className="flex gap-2 justify-between items-center w-full py-4">
                      <Label htmlFor="collect-star" className="w-64">
                        Collect Star Ratings
                      </Label>
                      <Switch
                        id="collect-star"
                        name="stars"
                        checked={formData.stars}
                        onCheckedChange={(e) =>
                          setFormData({ ...formData, stars: e })
                        }
                      />
                    </div>
                    {/* Collect Extra Info */}
                    <div className="flex gap-2 justify-between items-center w-full">
                      <Label htmlFor="extra-info" className="w-64">
                        Collect Extra Info
                      </Label>
                      <Select
                        onValueChange={(e: 'NAME' | 'EMAIL' | 'SOCIAL') =>
                          setFormData({ ...formData, extraInfo: e })
                        }
                        value={formData.extraInfo}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select info type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="EMAIL">Email</SelectItem>
                          <SelectItem value="SOCIAL">Social Link</SelectItem>
                          <SelectItem value="NAME">Name</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button type="submit">Create Space</Button>
                  </DialogFooter>
                </form>
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
