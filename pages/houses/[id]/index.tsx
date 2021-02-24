import { useRouter } from 'next/router'
import { Image } from 'cloudinary-react'
import { useQuery, gql } from '@apollo/client'
import Layout from 'src/components/layout'
import HouseNav from 'src/components/houseNav'
import SingleMap from 'src/components/singleMap'
import {
  ShowHouseQuery,
  ShowHouseQueryVariables,
} from 'src/generated/ShowHouseQuery'
import React from 'react'
import { useLastData } from 'src/utils/useLastData'

const SHOW_HOUSE_QUERY = gql`
  query ShowHouseQuery($id: String!) {
    house(id: $id) {
      id
      userId
      address
      publicId
      bedrooms
      latitude
      longitude
      nearby {
        id
        latitude
        longitude
      }
    }
  }
`

export default function ShowHouse() {
  const {
    query: { id },
  } = useRouter()
  if (!id) return null
  return <HouseData id={id as string} />
}

function HouseData({ id }: { id: string }) {
  const { data: apollodata } = useQuery<
    ShowHouseQuery,
    ShowHouseQueryVariables
  >(SHOW_HOUSE_QUERY, { variables: { id } })
  const data = useLastData(apollodata)

  if (!data) return <Layout main={<section>Loading...</section>} />
  if (!data.house)
    return <Layout main={<section>Unable to load House</section>} />

  const { house } = data

  return (
    <Layout
      main={
        <main className='flex flex-wrap overflow-scroll'>
          <section className='sm:w-full md:w-1/2 h-full p-4 flex flex-col'>
            <HouseNav house={house} />
            <h1 className='text-3xl my-2'>{house.address}</h1>
            <div className='max-h-full overflow-hidden'>
              <Image
                className='pb-2'
                cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                publicId={house.publicId}
                secure
                dpr='auto'
                quality='auto'
                width='100%'
                height={Math.floor(9 / 16) * 900}
                gravity='auto'
              />
            </div>

            <p>{house.bedrooms} 🛏 house</p>
          </section>
          <section className='sm:w-full md:w-1/2 h-full'>
            <SingleMap house={house} nearby={house.nearby} />
          </section>
        </main>
      }
    />
  )
}
