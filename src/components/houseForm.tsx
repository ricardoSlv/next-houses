import { useState, useEffect, ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Image } from 'cloudinary-react'
import { SearchBox } from './searchBox'
import {
  CreateHouseMutation,
  CreateHouseMutationVariables,
} from 'src/generated/CreateHouseMutation'
import {
  UpdateHouseMutation,
  UpdateHouseMutationVariables,
} from 'src/generated/UpdateHouseMutation'
import { CreateSignatureMutation } from 'src/generated/CreateSignatureMutation'

const SIGNATURE_MUTATION = gql`
  mutation CreateSignatureMutation {
    createImageSignature {
      signature
      timestamp
    }
  }
`
const CREATE_HOUSE_MUTATION = gql`
  mutation CreateHouseMutation($input: HouseInput!) {
    createHouse(input: $input) {
      id
    }
  }
`
const UPDATE_HOUSE_MUTATION = gql`
  mutation UpdateHouseMutation($id: String!, $input: HouseInput!) {
    updateHouse(id: $id, input: $input) {
      id
      userId
      image
      publicId
      address
      latitude
      longitude
      bedrooms
    }
  }
`

interface IUploadImageResponse {
  secure_url: string
}
interface IFormData {
  address: string
  latitude: number
  longitude: number
  bedrooms: string
  image: FileList
}
interface IHouse {
  id: string
  image: string
  publicId: string
  address: string
  latitude: number
  longitude: number
  bedrooms: number
}
interface IProps {
  house?: IHouse
}

async function uploadImage(
  image: File,
  signature: string,
  timestamp: number
): Promise<IUploadImageResponse> {
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`
  const formData = new FormData()
  formData.append('file', image)
  formData.append('signature', signature)
  formData.append('timestamp', timestamp.toString())
  formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_KEY)

  const response = await fetch(url, {
    method: 'post',
    body: formData,
  })

  return await response.json()
}

export default function HouseForm({ house }: IProps) {
  const router = useRouter()

  const [submitting, setSubmitting] = useState(false)
  const [previewImage, setPreviewImage] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    errors,
    watch,
  } = useForm<IFormData>({
    defaultValues: house
      ? {
          address: house.address,
          latitude: house.latitude,
          longitude: house.longitude,
          bedrooms: house.bedrooms.toString(),
        }
      : {},
  })

  const address = watch('address')

  const [createSignature] = useMutation<CreateSignatureMutation>(
    SIGNATURE_MUTATION
  )

  const [createHouse] = useMutation<
    CreateHouseMutation,
    CreateHouseMutationVariables
  >(CREATE_HOUSE_MUTATION)

  const [updateHouse] = useMutation<
    UpdateHouseMutation,
    UpdateHouseMutationVariables
  >(UPDATE_HOUSE_MUTATION)

  useEffect(() => {
    register({ name: 'address' }, { required: 'Please enter your address' })
    register({ name: 'latitude' }, { required: true, min: -90, max: 90 })
    register({ name: 'longitude' }, { required: true, min: -180, max: 180 })
  }, [register])

  const handleCreate = async (data: IFormData) => {
    const { data: signatureData } = await createSignature()
    if (signatureData) {
      const { signature, timestamp } = signatureData.createImageSignature
      const imageData = await uploadImage(data.image[0], signature, timestamp)

      const { data: houseData } = await createHouse({
        variables: {
          input: {
            address: data.address,
            image: imageData.secure_url,
            coordinates: {
              latitude: data.latitude,
              longitude: data.longitude,
            },
            bedrooms: parseInt(data.bedrooms),
          },
        },
      })

      if (houseData?.createHouse) {
        router.push(`/houses/${houseData.createHouse.id}`)
      } else {
        alert('Error! 😨 Oh no!')
      }
    }
  }

  const handleUpdate = async (currentHouse: IHouse, data: IFormData) => {
    let image = currentHouse.image

    if (data.image[0]) {
      const { data: signatureData } = await createSignature()
      if (signatureData) {
        const { signature, timestamp } = signatureData.createImageSignature
        const imageData = await uploadImage(data.image[0], signature, timestamp)
        image = imageData.secure_url
      }
    }

    const { data: houseData } = await updateHouse({
      variables: {
        id: currentHouse.id,
        input: {
          address: data.address,
          image: image,
          coordinates: {
            latitude: data.latitude,
            longitude: data.longitude,
          },
          bedrooms: parseInt(data.bedrooms),
        },
      },
    })

    if (houseData?.updateHouse) {
      router.push(`/houses/${currentHouse.id}`)
    }
  }

  const onSubmit = (data: IFormData) => {
    setSubmitting(false)
    if (house) handleUpdate(house, data)
    else handleCreate(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='mx-auto w-full max-w-xl py-4'
    >
      <h1 className='text-xl'>
        {house ? `Editing ${house.address}` : 'Add a new house'}
      </h1>
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
          defaultValue={house ? house.address : ''}
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
                  if (house || fileList.length === 1) return true
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
            {previewImage ? (
              <img
                src={previewImage}
                style={{ width: 576, height: (9 / 16) * 576 }}
                className='mt-4 object-cover'
              />
            ) : house ? (
              <Image
                className='mt-4 w-full'
                cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                publicId={house.publicId}
                alt={house.address}
                secure
                dpr='auto'
                quality=''
                width={576}
                height={(9 / 16) * 576}
                crop='fill'
                gravity='auto'
              />
            ) : null}
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
                max: { value: 10, message: 'Too many beds 🙀' },
                min: { value: 1, message: 'No beds, where sleep ? 🤔 ' },
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
            <Link href={house ? `/houses/${house.id}` : '/'}>
              <a>Cancel</a>
            </Link>
          </div>
        </>
      )}
    </form>
  )
}
