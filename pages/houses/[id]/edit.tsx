import { GetServerSideProps, NextApiRequest } from 'next'
import { useRouter } from 'next/router'
import { useQuery, gql } from '@apollo/client'
import { loadIdToken } from 'src/auth/firebaseAdmin'
import Layout from 'src/components/layout'
import HouseForm from 'src/components/houseForm'
import { useAuth } from 'src/auth/useAuth'
import {
  EditHouseQuery,
  EditHouseQueryVariables,
} from 'src/generated/EditHouseQuery'

const EDITHOUSE_QUERY = gql`
  query EditHouseQuery($id: String!) {
    house(id: $id) {
      id
      userId
      address
      image
      publicId
      bedrooms
      latitude
      longitude
    }
  }
`

export default function EditHouse() {
  const {
    query: { id },
  } = useRouter()

  if (!id) return null

  return <HouseData id={id as string} />
}

function HouseData({ id }: { id: string }) {
  const { user } = useAuth()
  const { data, loading } = useQuery<EditHouseQuery, EditHouseQueryVariables>(
    EDITHOUSE_QUERY,
    { variables: { id } }
  )

  if (!user) return <Layout main={<h1 className='text-2xl'>Please Login</h1>} />
  if (loading) return <Layout main={<h1 className='text-2xl'>Loading...</h1>} />
  if (data && !data.house)
    return <Layout main={<h1 className='text-2xl'>Unable to load house</h1>} />
  if (!user) return <Layout main={<h1 className='text-2xl'>Please Login</h1>} />
  if (user.uid !== data?.house?.userId)
    return (
      <Layout main={<h1 className='text-2xl'>You don't have permission</h1>} />
    )

  return (
    <Layout
      main={
        <main>
          <HouseForm house={data.house} />
        </main>
      }
    />
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const uid = await loadIdToken(req as NextApiRequest)

  if (!uid)
    return {
      redirect: {
        permanent: false,
        destination: '/auth',
      },
    }
  else return { props: {} }
}
