import React, {useContext} from 'react'
import { useEffect } from 'react'
import nodeContext from '../context/notes/noteContext'

export default function About() {
    const a = useContext(nodeContext)

    useEffect(() => {
        a.update();
        // eslint-disable-next-line
    },[])

  return (
    <div style={{marginTop : "70px"}}>
      This is About {a.state.name}
    </div>
  )
}
