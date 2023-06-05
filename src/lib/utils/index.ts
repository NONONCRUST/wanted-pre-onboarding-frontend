export const clsx = (
  ...classNames: (string | undefined | boolean | null)[]
) => {
  return classNames.filter((item) => typeof item === 'string').join(' ')
}
