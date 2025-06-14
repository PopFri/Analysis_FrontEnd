import React, { useEffect, useState } from 'react'
import Header from '../components/Header'

export default function MonitoringPage() {
  const Server_IP = import.meta.env.VITE_SERVER_IP;

  return (
    <div className='monitoring'>
        <div className='backgroud' />
        <Header />
        
    </div>
  )
}
