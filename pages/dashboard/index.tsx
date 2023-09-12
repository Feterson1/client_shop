import Layout from '@/components/layout/layout';
import Head from 'next/head'


function Dashboard() {
  return (
    <>
      <Head>
        <title>Аква Термикс</title>
        <meta charSet='UTF-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE-edge'/>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'/>
        <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
      </Head>
      <Layout>
      <main>
        <div className='overlay'>
        <h1>dashboard</h1>
        </div>
      </main>
      </Layout>
    </>
  )
}

export default Dashboard;