import { Button, Chip, Divider, Input} from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { PlayIcon } from '../assets/play';
import { StopIcon } from '../assets/stop';
import { useState } from 'react';

function Managment() {
  const [detectionState, setDetectionState] = useState(true)
  const [loggingState, setLoggingState] = useState(true)

  function getOptionsForState(state){
    if(state){
      return {color:"success", btn:<StopIcon />, }
    }
  }

  return (
    <div className="mx-auto flex flex-col" >
        
        <div className='w-6/12  self-center gap-2'>
        <p className='text-lg font-bold'>API</p>
        <Input type="text" placeholder='ex: 192.168.0.1:4545' label="DRONE DEVICE HOST" radius='none' className='pt-2'></Input>
        <Input type="text" placeholder='ex: 127.0.0.1:5000' label="API HOST" radius='none' className='py-2'></Input>
        <Input type="text" placeholder='ex: 127.0.0.1:1935/exemplo' label="RTMP Url" radius='none' className='py-2'></Input>
        <Divider />

        <p className='text-lg font-bold'>Geral</p>
        <Input type="number" step={50} min={0} placeholder='milisegundos' label="Delay de Atualização do Drone" radius='none' className='py-2' ></Input>
        <Input type="number" step={50} min={0} placeholder='milisegundos' label="Delay de Checagem dos Serviços" radius='none' className='py-2' ></Input>
        <Divider />
        <Button className="right-0 my-4" color="default" radius='none'>
        Aplicar Mundanças
        </Button>
        <Chip color="danger" variant="light">Aplicar mundanças irá reiniciar todos os serviços!</Chip>
        <p className='text-lg font-bold'>Serviços</p>
        <div className='w-6/12 grid grid-cols-3 grid-rows-2 gap-2'> 
          <p className='text-sm font-bold flex'>Detection: </p>
          <Chip  color={detectionState?"success":"danger"}  variant="solid">{detectionState?"Rodando":"Parado"}</Chip>
          <Button className='-m-2' isIconOnly color="none" aria-label="Like" onClick={()=>{setDetectionState(!detectionState)}} >
            {detectionState?<StopIcon />:<PlayIcon />}
          </Button>
        
          <p className='text-sm font-bold flex'>Logging: </p>
          <Chip  color={loggingState?"success":"danger"}  variant="solid">{loggingState?"Rodando":"Parado"}</Chip>
          <Button className='-m-2' isIconOnly color="none" aria-label="Like" onClick={()=>{setLoggingState(!loggingState)}} >
            {loggingState?<StopIcon />:<PlayIcon />}
          </Button>
        
        </div>
        
        </div>
    </div>
  );
}

export default Managment;
