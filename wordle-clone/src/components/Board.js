import React from 'react'
import { boardDefault } from '../Words'
import { useState } from 'react'

function Board() {
    const [board, setBoard] = useState(boardDefault)
  return (
    <div className='board'>
        <div className='row'></div>
        <div className='row'></div>
        <div className='row'></div>
        <div className='row'></div>
        <div className='row'></div>
        <div className='row'></div>
    </div>
  )
}

export default Board