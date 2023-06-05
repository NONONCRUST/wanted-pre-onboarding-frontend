import React from 'react'
import { clsx } from '../../lib/utils'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  validated?: boolean
  fullWidth?: boolean
}

const TextField: React.FC<Props> = ({
  className,
  errorMessage = '',
  validated = true,
  fullWidth,
  ...props
}) => {
  return (
    <div className={clsx('relative', fullWidth && 'flex-1')}>
      <input
        className={clsx(
          'p-2 border rounded-md w-full outline-blue-500',
          !validated && 'border-red-500 outline-red-500',

          className
        )}
        {...props}
      />
      {!validated && errorMessage && (
        <p className="absolute -bottom-6 text-red-500 text-sm mt-1">
          {errorMessage}
        </p>
      )}
    </div>
  )
}

export default TextField
