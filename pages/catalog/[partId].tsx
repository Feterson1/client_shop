import { getBoilerPartFx } from '@/app/api/boilerParts'
import Layout from '@/components/layout/layout'
import CatalogPartPage from '@/components/templates/PartPage/CatalogPartPage'
import { $boilerPart, setBoilerPart } from '@/context/boilerPart'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import { IQueryParams } from '@/types/catalog'
import { useStore } from 'effector-react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Custom404 from '../404'
import Breadcrumbs from '@/components/modules/BreadCrumbs/BreadCrumbs'

function PartPage({ query }: { query: IQueryParams }) {
  const { shouldLoadContent } = useRedirectByUserCheck()
  const boilerPart = useStore($boilerPart)
  const router = useRouter()
  const [error, setError] = useState(false)
  const lastCrumb = document.querySelector('.last-crumb') as HTMLElement

  const loadBoilerPart = async () => {
    try {
      const data = await getBoilerPartFx(`/boiler-parts/find/${query.partId}`)
      if (!data) {
        setError(true)
        return
      }
      setBoilerPart(data)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  const getDefaultTextGenerator = useCallback(
    (subpath: string) => subpath.replace('catalog', 'Каталог'),
    []
  )

  const getTextGenerator = useCallback((param: string) => {
    ;({})[param]
  }, [])

  useEffect(() => {
    loadBoilerPart()
  }, [router.asPath])
  useEffect(() => {
    if (lastCrumb) {
      lastCrumb.textContent = boilerPart.name
    }
  }, [lastCrumb, boilerPart])

  return (
    <>
      <Head>
        <title>Аква Термикс | {shouldLoadContent ? boilerPart.name : ''}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE-edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
      </Head>
      {error ? (
        <Custom404 />
      ) : (
        shouldLoadContent && (
          <Layout>
            <main>
              <Breadcrumbs
                getDefaultTextGenerator={getDefaultTextGenerator}
                getTextGenerator={getTextGenerator}
              />
              <CatalogPartPage />
              <div className="overlay" />
            </main>
          </Layout>
        )
      )}
    </>
  )
}

export async function getServerSideProps(context: { query: IQueryParams }) {
  return {
    props: { query: { ...context.query } },
  }
}

export default PartPage
