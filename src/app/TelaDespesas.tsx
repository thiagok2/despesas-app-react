import { Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { carregaDespesas, IDespesa } from './backend';
import ExibicaoTotal from './ExibicaoTotal';
import SelecaoAnoMes from './SelecaoAnoMes';
import TabelaDespesas from './TabelaDespesas';

function TelaDespesas() {
  const history = useHistory();

  const params = useParams<{anoMes: string}>();
  const { anoMes } = params;
  const [despesas, setDespesas] = useState<IDespesa[]>([]);
  
  useEffect(() => {
    carregaDespesas(anoMes).then(setDespesas);
  }, [anoMes]);

  function onChangeAnoMes(anoMes: string) {
    history.push(`/despesas/${anoMes}`);
  }

  return (
    <>
      <Box display={'flex'} justifyContent={'space-between'}>
        <SelecaoAnoMes anoMes={anoMes} onChangeAnoMes={onChangeAnoMes}/>
        <ExibicaoTotal total={totalDespesas(despesas)}/>
      </Box>
      
      <TabelaDespesas despesas={despesas}/>
    </>
  );
}

function totalDespesas(despesas: IDespesa[]):number{
  return despesas.reduce( (acum, d) => acum + d.valor, 0);
}
export default TelaDespesas