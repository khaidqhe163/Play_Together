import React from 'react'

function PiRight({setOpenHire}) {
    return (
        <div className='pi-right pi'>
            <button>Chat</button>
            <button>Donate</button>
            <button onClick={setOpenHire}>Thuê</button>
        </div>
    )
}

export default PiRight
