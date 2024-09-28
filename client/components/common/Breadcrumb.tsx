'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { usePathname } from 'next/navigation'

const Hamburger = () => {
  const params = usePathname()
  const formattedParams = params
    .split('/')
    .map((param) => param.charAt(0).toUpperCase() + param.slice(1))
    .slice(1)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {formattedParams.map((param, index) => (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink
              href={`
                /${formattedParams
                  .slice(0, index + 1)
                  .join('/')
                  .toLowerCase()}
              `}
            >
              {param}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default Hamburger
