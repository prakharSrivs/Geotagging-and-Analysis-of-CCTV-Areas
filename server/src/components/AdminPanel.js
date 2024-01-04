import React from 'react'
import Maps from './Maps'
import OffcanvasExample from './OffCanvas'
function AdminPanel() {
  return (
    <div>
    <OffcanvasExample/>
    <div className="mapContainer"> <Maps /></div>
    </div>
  )
}

export default AdminPanel