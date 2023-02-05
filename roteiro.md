## Avaliar as versões do package json

- React 17
- Material 4
- React Router 5

## Fazer os ajustes em App.tsx e index.tsx

## Backend App, ok?

- Seguir a pasta backend na raiz do projeto

* db.json
* package.json
* roteiro.md

## Criar app/backend.ts webapp

```
export interface IDespesa {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: string;
}

export function carregaDespesas(anoMes: string): Promise<IDespesa[]> {
  return fetch(`http://localhost:3001/despesas?mes=${anoMes}&_sort=dia`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erro ao carregar dados");
      }
    });
}
```

## Criar componentes básicos

### TelaDespesas(principal)

    ```
      useEffect(() => {
        carregaDespesas('2022-01').then((data) => {
          console.log(data);
        });
      }, [])
    ```

### Outros componentes TabelaDespesas, ExibicaoTotal, SelecaoAnoMes

      * Usar o plugin do Vsc: ctrl + space => rfce
      * Importar TabelaDespesas, ExibicaoTotal, SelecaoAnoMes no TelaDespesas\
      * Cortar o layout com <Box> do material-ui

      ```
      <>
        <Box display={'flex'} justifyContent={'space-between'}>
          <SelecaoAnoMes/>
          <ExibicaoTotal/>
        </Box>

        <TabelaDespesas/>
      </>
      ```

## Carregando as despesas

- useEffect, useState
- carregaDespesas(backend) - Promises

```
  //TelaDespesas.tsx
  const [despesas, setDespesas] = useState<IDespesa[]>([]);
    useEffect(() => {
      carregaDespesas('2022-01').then(setDespesas);
  }, [])
```

- Comunicação dos componentes via props

  ```
  //TelaDespesas.tsx
  <TabelaDespesas despesas={despesas}/>
   ...

   //TabelaDespesas.tsx
  interface ITabelaDespesasProp {
    despesas:IDespesa[]
  }
  function TabelaDespesas(props: ITabelaDespesasProp) {
  ...

  ```

  ## Criando Tabela Despesas

  - Visitar o site do material-ui 4 e copiar o exemplo de jsx
    (Material Tables)[https://v4.mui.com/components/tables/]

  ```
  //TabelaDespesas
  <TableContainer component={Paper}>
    <Table aria-label="simple table">
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
  ```

  ### Configurando Rotas e Lendo Parâmetros

  - React Router 5x\*

  ```
    //App.tsx
    <BrowserRouter>
      <Switch>
        <Route path={"despesas/:anoMes"}>
          <TelaDespesas />
        </Route>
      </Switch>

    </BrowserRouter>
  ```

  - Parameters - Lendo parametros com Hook: useParams

  ```
  //TelaDespesas.tsx
  ...
  const params = useParams<{anoMes: string}>();
  const { anoMes } = params;
  const [despesas, setDespesas] = useState<IDespesa[]>([]);

  useEffect(() => {
    carregaDespesas(anoMes).then(setDespesas);
  }, [anoMes]);
  ```

  ### Componente ExibicaoTotal

  //totalDespesas calc/format

  ```
  //App.jtsx
  ...
  <ExibicaoTotal total={totalDespesas(despesas)}/>
  ...
  function totalDespesas(despesas: IDespesa[]):number{
    return despesas.reduce( (acum, d) => acum + d.valor, 0);
  }

  ```

  ### Componente SelecaoAnoMes

  1. Criar interface de props

  ```
  interface ISelecaoAnoMesProps {
    anoMes: string;
  }

  function SelecaoAnoMes(props: ISelecaoAnoMesProps) {

  const [ano, mes] = props.anoMes.split('-');
  ...

  ```

  2. Criar elementos com FormControl e Select/MenuItem

  ```
  <div>
      <FormControl>
        <InputLabel>Ano</InputLabel>
        <Select value={ano}>
          <MenuItem value="2022">2022</MenuItem>
          <MenuItem value="2023">2023</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Mês</InputLabel>
        <Select value={mes}>
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
  ```

  3. Os componentes já são atualizados conforme a rota, já que recebe anoMes via
     props do componente pai, TelaDespesas. Porém, suas mudanças ainda não estão refletidas nos demais. Para alcançarmos isso, precisamos notificar o componente pai.
     Fazemos isso com uma função callback, via props

     ```
     //SelecaoAnoMes.jsx
     interface ISelecaoAnoMesProps {
      anoMes: string;
      onChangeAnoMes: (anoMes: string) => void;
     }
     ...
     <Selector
      value={ano}
      onChange={(evt) => props.onChangeAnoMes(evt.target.value + "-" + mes)}>
     ...
     <Selector
      value={mes}
      onChange={(evt) => props.onChangeAnoMes(ano + "-" + evt.target.value)}>
      ...
     ```

### Extras

#### Upgrade react-router 6

1. Alterar versão no package.json
   react-router-dom": "^6.3.0"
2. No App.js

- Substituir Switch por Routes
- Componente no <Router> não é mais passado via children, mas sim via a props elemento={compoente}
  ```
    // App.js
    <BrowserRouter>
      <Routes>
        <Route path="/despesas/:anoMes" element={<TelaDespesas />} />
        <Route
          path="/"
          element={<Navigate replace to={`/despesas/${getAnoMesAtual()}`} />}
        />
      </Routes>
    </BrowserRouter>
  ```
  - prop replace, substitui no histórico. Ficamos apenas com uma entrada;
  - useHistory substituído por useNavigate. O retorno da chamada do hook useNavigate, já é a função usada para navigate(). Ex.:
  ```
    const navigate = useNavigate();
    function onChangeAnoMes(anoMes: string) {
      navigate(`/despesas/${anoMes}`);
    }
  ```
  - Outro ajuste é proteger os parametros da utilizados de valores não definidos(undefined)
