import React from 'react'

interface IExibicaoTotalProps {
  total: number
}
function ExibicaoTotal(props: IExibicaoTotalProps) {
  return (
    <div>R$ {props.total.toFixed(2).replace('.',',')}</div>
  )
}

export default ExibicaoTotal