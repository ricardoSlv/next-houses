import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { Image } from 'cloudinary-react'
import ReactMapGL, { MapRef, Marker, Popup } from 'react-map-gl'
import { ViewState } from 'react-map-gl/index'
import 'mapbox-gl/dist/mapbox-gl.css'
// import { useLocalState } from "src/utils/useLocalState";
// import { HousesQuery_houses } from "src/generated/HousesQuery";
// import { SearchBox } from "./searchBox";

interface IProps {}

export default function Map({}: IProps) {
  const mapRef = useRef<MapRef | null>(null)
  const [viewport, setViewport] = useState<ViewState>({
    latitude: 43,
    longitude: -79,
    zoom: 10,
  })
  return (
    <div className='text-black relative h-full'>
      <ReactMapGL
        {...viewport}
        width='100%'
        height='100%'
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        onViewStateChange={(nextViewport: ViewState) =>
          setViewport(nextViewport)
        }
        ref={(instance) => (mapRef.current = instance)}
        minZoom={5}
        maxZoom={15}
        mapStyle='mapbox://styles/leighhalliday/ckhjaksxg0x2v19s1ovps41ef'
      ></ReactMapGL>
    </div>
  )
}
