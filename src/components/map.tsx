import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { Image } from 'cloudinary-react'
import ReactMapGL, { MapRef, Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { ViewState } from 'react-map-gl/index'
import { useLocalState } from 'src/utils/useLocalState'
import { HousesQuery_houses } from 'src/generated/HousesQuery'
import { SearchBox } from './searchBox'

interface IProps {
  setDataBounds: (bounds: string) => void
  houses: HousesQuery_houses[]
  highlightedId: string | null
}

interface MapState extends ViewState {
  transitionDuration: number
}

export default function Map({ setDataBounds, houses, highlightedId }: IProps) {
  const [selected, setSelected] = useState<HousesQuery_houses | null>(null)
  const mapRef = useRef<MapRef | null>(null)
  const [viewport, setViewport] = useLocalState<MapState>('viewport', {
    latitude: 43,
    longitude: -79,
    zoom: 10,
    transitionDuration: 0,
  })

  useEffect(() => {
    setViewport({ ...viewport, transitionDuration: 0 })
  }, [])
  return (
    <section className='text-black relative h-full'>
      <ReactMapGL
        {...viewport}
        width='100%'
        height='100%'
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        onViewportChange={(nextMapState: MapState) => {
          setViewport(nextMapState)
        }}
        ref={(instance) => (mapRef.current = instance)}
        minZoom={5}
        maxZoom={15}
        mapStyle='mapbox://styles/leighhalliday/ckhjaksxg0x2v19s1ovps41ef'
        onLoad={() => {
          if (mapRef.current) {
            const bounds = mapRef.current.getMap().getBounds()
            setDataBounds(JSON.stringify(bounds.toArray()))
          }
        }}
        onInteractionStateChange={(extra: { isDragging: boolean }) => {
          if (!extra.isDragging && mapRef.current) {
            const bounds = mapRef.current.getMap().getBounds()
            setDataBounds(JSON.stringify(bounds.toArray()))
          }
        }}
      >
        <nav className='absolute top-0 w-full z-10 p-4'>
          <SearchBox
            defaultValue=''
            onSelectAddress={(_address, latitude, longitude) => {
              if (latitude && longitude) {
                setViewport((old) => ({
                  ...old,
                  latitude,
                  longitude,
                  zoom: 12,
                }))
                if (mapRef.current) {
                  const bounds = mapRef.current.getMap().getBounds()
                  setDataBounds(JSON.stringify(bounds.toArray()))
                }
              }
            }}
          />
        </nav>
        {houses.map((house) => (
          <Marker
            key={house.id}
            className={house.id === highlightedId ? 'z-10' : ''}
            latitude={house.latitude}
            longitude={house.longitude}
            offsetLeft={-16}
            offsetTop={-16}
          >
            <button
              type='button'
              className='h-8 w-8 text-3xl'
              onClick={() => setSelected(house)}
            >
              <img
                src={
                  house.id === highlightedId
                    ? '/home-color.svg'
                    : '/home-solid.svg'
                }
                alt='house'
                className='h-8 w-8'
              />
            </button>
          </Marker>
        ))}
        {selected && (
          <Popup
            latitude={selected.latitude}
            longitude={selected.longitude}
            onClose={() => setSelected(null)}
            closeOnClick={false}
          >
            <article className='text-center'>
              <h3 className='px-4 break-words max-w-title'>
                {selected.address}
              </h3>
              <Image
                className='mx-auto my-4'
                cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                publicId={selected.publicId}
                alt='selected house'
                secure
                dpr='auto'
                quality='auto'
                width={200}
                height={Math.floor((9 / 16) * 200)}
                crop='fill'
                gravity='auto'
              />
            </article>
          </Popup>
        )}
      </ReactMapGL>
    </section>
  )
}
