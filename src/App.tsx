import { useCallback, useEffect, useState } from "react";
import { api } from "./services/api"
import { uuid } from 'uuidv4'

interface IData {
  id: string;
  name: string;
  price: number;
}

function App() {
  const [data, setData] = useState<IData[]>([])
  const [fruta, setFruta] = useState<string>('')
  const [frutaValue, setFrutaValue] = useState<any>()

  useEffect(() => {
    api.get('data').then(
      response => {
        setData(response.data)
      }
    )
  }, [])

  const getData = () => {
    api.get('data').then(
      response => {
        setData(response.data)
      }
    )
  }

  const convertToCurrency = useCallback(
    (value: number) => {
      return Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(value)
    },
    [],
  )

  const addToApi = useCallback(
    () => {
      api.post('data', {
        id: uuid,
        name: fruta,
        price: frutaValue
      }).then(
        response => {
          setFruta('')
          setFrutaValue('')
          getData()
          alert('Tudo certo')
        }
      ).catch(() => alert('Algo deu errado'))
    }, [uuid, fruta, frutaValue]
  )

  return (
    <div className="App">
      <h1>Lista de Frutas</h1>
      <hr/>
      <ul>
        {/* colocar a funcao entre () s/ nao da erro*/}
        { data.map(fruta => (
          <li key={fruta.id}>
            {fruta.name} | {convertToCurrency(fruta.price)}
          </li>
        ))}
      </ul>
      <hr/>
      <h2>{fruta}</h2>
      <br/>
      <input
        type='text'
        // arrow function onChange para n executar no inicio
        onChange={(e) => setFruta(e.target.value)}
        placeholder='digite uma fruta'
        value={fruta}
      />
      <input
        type='number'
        // arrow function onChange para n executar no inicio
        onChange={(e) => setFrutaValue(Number(e.target.value))}
        placeholder='digite o preco da fruta'
        value={frutaValue}
      />
      <button onClick={addToApi} >Adicionar</button>
    </div>
  );
}

export default App;
