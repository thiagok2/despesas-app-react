import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React from 'react'
import { IDespesa } from './backend'


interface ITabelaDespesasProp {
  despesas:IDespesa[]
}
function TabelaDespesas(props: ITabelaDespesasProp) {

  const {despesas} = props;
  return (
    <TableContainer component={Paper}>
      <Table aria-label="Tabela de despesas">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Mes/Dia</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell align="right">Valor(R$)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {despesas.map((despesa) => (
            <TableRow key={despesa.id}>
              <TableCell component="th" scope="row">
                {despesa.id} 
              </TableCell>
              <TableCell component="th" scope="row">
                {despesa.mes}-{despesa.dia} 
              </TableCell>
              <TableCell>{despesa.descricao}</TableCell>
              <TableCell>{despesa.categoria}</TableCell>
              <TableCell align="right">{despesa.valor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TabelaDespesas