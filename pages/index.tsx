import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import { useDebounce } from 'use-debounce'
import Layout from 'src/components/layout'
import Map from 'src/components/map'
import HouseList from 'src/components/houseList'
import { useLastData } from 'src/utils/useLastData'
import { useLocalState } from 'src/utils/useLocalState'
import { HousesQuery, HousesQueryVariables } from 'src/generated/HousesQuery'
import { data } from 'autoprefixer'

const HOUSES_QUERY = gql`
  query HousesQuery($bounds: BoundsInput!) {
    houses(bounds: $bounds) {
      id
      latitude
      longitude
      address
      publicId
      bedrooms
    }
  }
`

type BoundsArray = [[number, number], [number, number]]

const parseBounds = (boundsString: string): HousesQueryVariables['bounds'] => {
  const bounds: BoundsArray = JSON.parse(boundsString)
  const [[swLon, swLat], [neLon, neLat]] = bounds

  return {
    sw: {
      latitude: swLat,
      longitude: swLon,
    },
    ne: {
      latitude: neLat,
      longitude: neLon,
    },
  }
}

export default function Home() {
  const [highlightedId, setHighlightedId] = useState<string | null>(null)

  const [dataBounds, setDataBounds] = useLocalState<string>(
    'bounds',
    '[[0,0],[0,0]]'
  )

  const [debouncedDataBounds] = useDebounce(dataBounds, 200)
  const { data, error } = useQuery<HousesQuery, HousesQueryVariables>(
    HOUSES_QUERY,
    {
      variables: { bounds: parseBounds(debouncedDataBounds) },
    }
  )
  const lastData = useLastData(data)

  if (error)
    return (
      <Layout
        main={
          <main>
            <h1 className='text-3xl'>Error loading houses</h1>
          </main>
        }
      />
    )
  else
    return (
      <Layout
        main={
          <main className='flex overflow-x-auto h-full'>
            <section className='w-1/2 h-full pb-4'>
              <HouseList
                houses={lastData ? lastData.houses : []}
                setHighlightedId={setHighlightedId}
              />
            </section>
            <section className='w-1/2 h-full pb-4'>
              <Map
                setDataBounds={setDataBounds}
                houses={lastData ? lastData.houses : []}
                highlightedId={highlightedId}
              />
            </section>
          </main>
        }
      />
    )
}
