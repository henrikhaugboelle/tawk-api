import Path from 'path'

export const createOptions = () => {
  return {
    relativeTo: Path.resolve(__dirname, '..')
  }
}
