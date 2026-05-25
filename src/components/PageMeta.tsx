import { Helmet } from 'react-helmet-async'
import { useContent } from '../context/ContentContext'

interface PageMetaProps {
  title: string
  description?: string
}

export function PageMeta({ title, description }: PageMetaProps) {
  const { company } = useContent()
  const siteName = company?.name ?? 'MZA Solutions'
  const fullTitle = title === 'Home' ? siteName : `${title} | ${siteName}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
    </Helmet>
  )
}
