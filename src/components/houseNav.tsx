import { useMutation, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuth } from 'src/auth/useAuth'
import { DeleteHouse, DeleteHouseVariables } from 'src/generated/DeleteHouse'

const DELETE_MUTATION = gql`
  mutation DeleteHouse($id: String!) {
    deleteHouse(id: $id)
  }
`
interface IProps {
  house: {
    id: string
    userId: string
  }
}

export default function HouseNav({ house }: IProps) {
  const router = useRouter()
  const { user } = useAuth()
  const canManage = user?.uid === house.userId
  const [deleteHouse, { loading }] = useMutation<
    DeleteHouse,
    DeleteHouseVariables
  >(DELETE_MUTATION)

  return (
    <nav>
      <Link href='/'>
        <button
          type='button'
          className='px-2 mx-1 border-2 border-gray-300 rounded'
        >
          <a>Map</a>
        </button>
      </Link>
      {canManage && (
        <>
          <Link href={`/houses/${house.id}/edit`}>
            <button
              type='button'
              className='px-2 mx-1 border-2 border-gray-300 rounded'
            >
              Edit
            </button>
          </Link>
          <button
            type='button'
            className='px-2 mx-1 border-2 border-gray-300 rounded'
            disabled={loading}
            onClick={async () => {
              if (confirm('Are you sure?')) {
                await deleteHouse({ variables: { id: house.id } })
                router.push('/')
              }
            }}
          >
            Delete
          </button>
        </>
      )}
    </nav>
  )
}
