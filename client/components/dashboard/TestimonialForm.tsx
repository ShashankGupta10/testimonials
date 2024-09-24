import React, { ChangeEvent, Dispatch, FormEvent } from 'react'
import { DialogFooter, DialogHeader } from '../ui/dialog'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { BiTrash } from 'react-icons/bi'
import { Button } from '../ui/button'
import { Switch } from '../ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { SpaceType } from '@appTypes'

const TestimonialForm = ({
  formData,
  setFormData,
  handleChange,
  handleSubmit,
}: {
  formData: SpaceType
  setFormData: Dispatch<React.SetStateAction<SpaceType>>
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  handleChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void
}) => {
  return (
    <form className="col-span-2" onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>Create New Space</DialogTitle>
        <DialogDescription>
          After the Space is created, it will generate a dedicated page for
          collecting testimonials.
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
          <Label htmlFor="custom-message" className="text-left w-32">
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
                    questions: formData.questions.filter((_, i) => i !== idx),
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
            onCheckedChange={(e) => setFormData({ ...formData, stars: e })}
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
  )
}

export default TestimonialForm
