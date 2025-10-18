import React from 'react'
import type { FunctionComponent } from 'react'

export interface Props {}

const App: FunctionComponent<Props> = (props: Props) => {
  return <div>App</div>
}

App.propTypes = {}

export default App
