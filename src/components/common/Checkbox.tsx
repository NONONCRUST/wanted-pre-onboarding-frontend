import React from 'react'
import { clsx } from '../../lib/utils'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox: React.FC<Props> = ({ className, ...props }) => {
  return <input className={clsx(className)} {...props} type="checkbox" />
}

export default Checkbox
