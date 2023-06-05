import React from 'react'
import { Link } from 'react-router-dom'
import { clsx } from '../../lib/utils'

interface Props extends React.HTMLAttributes<HTMLParagraphElement> {
  to: string
}

const LinkText: React.FC<Props> = ({ children, className, to, ...props }) => {
  return (
    <Link to={to}>
      <span
        className={clsx('text-blue-500 underline cursor-pointer', className)}
        {...props}
      >
        {children}
      </span>
    </Link>
  )
}

export default LinkText
