import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import React from 'react'

interface ISelecaoAnoMesProps {
  anoMes: string;
  onChangeAnoMes: (anoMes: string) => void;
}

function SelecaoAnoMes(props: ISelecaoAnoMesProps) {

  const [ano, mes] = props.anoMes.split('-');

  return (
    <div>
      <FormControl>
        <InputLabel>Ano</InputLabel>
        <Select
          value={ano}
          onChange={(evt) => props.onChangeAnoMes(evt.target.value + "-" + mes)}
        >
          <MenuItem value="2022">2022</MenuItem>
          <MenuItem value="2023">2023</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Mês</InputLabel>
        <Select
          value={mes}
          onChange={(evt) => props.onChangeAnoMes(ano + "-" + evt.target.value)}
        >
          <MenuItem value="01">Janeiro</MenuItem>
          <MenuItem value="02">Fevereiro</MenuItem>
          <MenuItem value="03">Março</MenuItem>
          <MenuItem value="04">Abril</MenuItem>
          <MenuItem value="05">Maio</MenuItem>
          <MenuItem value="06">Junho</MenuItem>
          <MenuItem value="07">Julho</MenuItem>
          <MenuItem value="08">Agosto</MenuItem>
          <MenuItem value="09">Setembro</MenuItem>
          <MenuItem value="10">Outubro</MenuItem>
          <MenuItem value="11">Novembro</MenuItem>
          <MenuItem value="12">Dezembro</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default SelecaoAnoMes