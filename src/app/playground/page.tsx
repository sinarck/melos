import React from 'react'
import { Metadata } from "next"
import ImageUpload from '@/components/ImageUpload'

export const metadata: Metadata = {
  title: "Playground - Melos AI",
  description: "Give Melos AI a try yourself and explore what it has to offer",
}

const page = () => {
  return (
    <div>
      <ImageUpload />
    </div>
  )
}

export default page
