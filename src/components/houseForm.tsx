import { useState, useEffect, ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
// import { useMutation, gql } from "@apollo/client";
// import { useRouter } from "next/router";
import Link from 'next/link'
// import { Image } from "cloudinary-react";
import { SearchBox } from './searchBox'
// import {
//   CreateHouseMutation,
//   CreateHouseMutationVariables,
// } from "src/generated/CreateHouseMutation";
// import {
//   UpdateHouseMutation,
//   UpdateHouseMutationVariables,
// } from "src/generated/UpdateHouseMutation";
// import { CreateSignatureMutation } from "src/generated/CreateSignatureMutation";

interface IFormData {
  address: string
  latitude: number
  longitude: number
  bedrooms: number
  image: FileList
}

interface IProps {}

export default function HouseForm({}: IProps) {
  const [submitting, setSubmitting] = useState(false)
  const [previewImage, setPreviewImage] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    errors,
    watch,
  } = useForm<IFormData>({ defaultValues: {} })

  const address = watch('address')

  useEffect(() => {
    register({ name: 'address' }, { required: 'Please enter your address' })
    register({ name: 'latitude' }, { required: true, min: -90, max: 90 })
    register({ name: 'longitude' }, { required: true, min: -180, max: 180 })
  }, [register])

  const handleCreate = async (data: IFormData) => {
    console.log(data)
  }

  const onSubmit = (data: IFormData) => {
    setSubmitting(false)
    handleCreate(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='mx-auto w-full max-w-xl py-4'
    >
      <h1 className='text-xl'>Add a new house</h1>
      <div className='mt-4'>
        <label htmlFor='search' className='block'>
          Search for your address
        </label>
        <SearchBox
          onSelectAddress={(address, latitude, longitude) => {
            setValue('address', address)
            setValue('latitude', latitude)
            setValue('longitude', longitude)
          }}
          defaultValue=''
        />
        {errors.address && <p>{errors.address.message}</p>}
      </div>
      {address && (
        <>
          <div className='mt-4'>
            <label
              htmlFor='image'
              className='p-4 block border-dashed border-4 border-grey-600 cursor-pointer'
            >
              Click to add image (16:9)
            </label>
            <input
              id='image'
              name='image'
              className='hidden'
              type='file'
              accept='image/*'
              ref={register({
                validate: (fileList: FileList) => {
                  if (fileList.length === 1) return true
                  return 'Please upload one File'
                },
              })}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (e?.target?.files?.[0]) {
                  const file = e.target.files[0]
                  const reader = new FileReader()
                  reader.onloadend = () => {
                    setPreviewImage(reader.result as string)
                  }
                  reader.readAsDataURL(file)
                }
              }}
            />
            {previewImage && (
              <img
                src={previewImage}
                style={{ width: 576, height: (9 / 16) * 576 }}
                className='mt-4 w-full object-cover'
              ></img>
            )}
            {errors.image && <p>{errors.image.message}</p>}
          </div>
          <div className='mt-4'>
            <label htmlFor='bedrooms' className='block'>
              Beds
            </label>
            <input
              id='bedrooms'
              name='bedrooms'
              type='number'
              className='p-2'
              ref={register({
                required: 'Please enter the number of bedrooms',
                max: { value: 10, message: 'Too many rooms 🙀' },
                min: { value: 1, message: 'No bedrooms, where sleep ? 🤔 ' },
              })}
            />
            {errors.bedrooms && <p>{errors.bedrooms.message}</p>}
          </div>
          <div className='mt-4'>
            <button
              className='bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded'
              type='submit'
              disabled={submitting}
            >
              Save
            </button>{' '}
            <Link href='/'>
              <a>Cancel</a>
            </Link>
          </div>
        </>
      )}
    </form>
  )
}
