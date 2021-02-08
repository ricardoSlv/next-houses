// import { useState } from "react";
// import { useQuery, gql } from "@apollo/client";
// import { useDebounce } from "use-debounce";
import Layout from 'src/components/layout'
import Map from 'src/components/map'
//import HouseList from 'src/components/houseList'
// import { useLastData } from "src/utils/useLastData";
// import { useLocalState } from "src/utils/useLocalState";
// import { HousesQuery, HousesQueryVariables } from "src/generated/HousesQuery";

export default function Home() {
  return (
    <Layout
      main={
        <main className='flex overflow-x-auto h-full'>
          <section className='w-1/2 h-full pb-4'>Houselisting</section>
          <section className='w-1/2 h-full pb-4'>
            <Map />
          </section>
        </main>
      }
    />
  )
}
