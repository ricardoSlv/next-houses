import { useState } from 'react'
import Link from 'next/link'
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl'
import { ViewState } from 'react-map-gl/index'
import 'mapbox-gl/dist/mapbox-gl.css'

interface IHouse {
  id: string
  latitude: number
  longitude: number
}

interface IProps {
  house: IHouse
  nearby: IHouse[]
}

export default function SingleMap({ house, nearby }: IProps) {
  const [viewport, setViewport] = useState({
    latitude: house.latitude,
    longitude: house.longitude,
    zoom: 13,
  })

  return (
    <section className='text-black h-full'>
      <ReactMapGL
        {...viewport}
        width='100%'
        height='100%'
        onViewportChange={(nextViewport: ViewState) =>
          setViewport(nextViewport)
        }
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        mapStyle='mapbox://styles/leighhalliday/ckhjaksxg0x2v19s1ovps41ef'
        minZoom={8}
        scrollZoom={false}
      >
        <div className='absolute top-0 left-0 p-4'>
          <NavigationControl showCompass={false} />
        </div>
        <Marker
          latitude={house.latitude}
          longitude={house.longitude}
          offsetLeft={-16}
          offsetTop={-16}
        >
          <button type='button'>
            <img
              src='/home-color.svg'
              className='h-8 w-8'
              alt='Selected House'
            />
          </button>
        </Marker>
        {nearby.map((nearH) => (
          <Marker
            key={nearH.id}
            latitude={nearH.latitude}
            longitude={nearH.longitude}
            offsetLeft={-16}
            offsetTop={-16}
          >
            <Link href={`/houses/${nearH.id}`}>
              <a>
                <img
                  src='/home-solid.svg'
                  className='h-8 w-8'
                  alt='Nearby House'
                />
              </a>
            </Link>
          </Marker>
        ))}
      </ReactMapGL>
    </section>
  )
}
