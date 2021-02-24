import Layout from 'src/components/layout'
import FirebaseAuth from 'src/components/firebaseAuth'
import { GetServerSideProps, NextApiRequest } from 'next'
import { loadIdToken } from 'src/auth/firebaseAdmin'

export default function Auth() {
  console.log('BOOM')
  return <Layout main={<FirebaseAuth />} />
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const uid = await loadIdToken(req as NextApiRequest)

  if (uid) {
    console.log('ITS GONNA BLOW')

    res.setHeader('location', '/')
    res.statusCode = 302
    res.end()
  }

  return { props: {} }
}
