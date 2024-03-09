import { Button, Chip, Divider, Image, Input, Listbox, ListboxItem, Card, CardBody, CardHeader, Avatar, CardFooter, ScrollShadow, Slider } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import drone_view from "../assets/default_drone_view.png"
import MapView from '../components/map_view';
import { useEffect, useMemo, useState } from 'react';

import no_avatar from "../assets/no_avatar.png"
import play_icon from "../assets/play-icon.svg"
import pause_icon from "../assets/pause-icon.svg"
import stop_icon from "../assets/stop-icon.svg"
import { PlayIcon } from '../assets/play';
import { PauseIcon } from '../assets/pause';
import { StopIcon } from '../assets/stop';

function FlightRecord() {
  const [pos, setPos] = useState({lat:-2.53709216182746, lng:-44.2791358660317})

  const [selectedKeys, setSelectedKeys] = useState(new Set(["-1"]));

  const [currentLog, setCurrentLog] = useState(null)

  const [flightData, setFlightData] = useState([])

  const [currentLogIndex, setCurrentLogIndex] = useState(0)

  useEffect(()=>{
    setCurrentLogIndex(0)
    setCurrentLog(selectedKeys.values().next().value)
  }, [selectedKeys])

  useEffect(()=>{
    
      setFlightData([
        {id: 1, has_video:false, video_path:"", flight_time:777, around: "IFMA Monte Castelo", preview: null, date: "01/01/2001 - 00:35", log: [{lat: 51, lng:20,}, {lat: 51, lng:20,}, {lat: 51, lng:20,}, {lat: 51, lng:20,} ]},
        {id: 2, has_video:false, video_path:"", flight_time:111, around: "IFMA Monte Castelo", preview: null, date: "01/01/2012 - 15:35", log: [{lat: 81, lng:20,},{lat: 81, lng:20,},{lat: 81, lng:20,}]},
        {id: 3, has_video:false, video_path:"", flight_time:350, around: "IFMA Monte Castelo", preview: null, date: "21/01/2000 - 21:35", log: [{lat: 51, lng:3,},{lat: 81, lng:20,}]},
        {id: 4, has_video:false, video_path:"", flight_time:32, around: "IFMA Monte Castelo", preview: null, date: "14/11/2022 - 12:35", log: [{lat: 12, lng:20,}]},
      ]
      )
    
  }, [])

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  return (
    <div className="flex gap-4">
      <div className='flex flex-col    '>
        <div>
        <MapView pos={pos} size={{width:"700px", height:"500px"}}/>
        <Slider isDisabled  
        size="sm"
        step={1} 
        maxValue={flightData[currentLog]!=null?flightData[currentLog].log.length: 0} 
        minValue={0} 
        aria-label="Temperature"
        defaultValue={0}
        className="max-w"
        value={currentLogIndex}
      />
      <div className=''>
        <Button className='p-2' isIconOnly color="none" aria-label="Like" onClick={()=>{setCurrentLogIndex(currentLogIndex+1); setPos({lat:pos.lat+0.000001, lng:pos.lng})}}>
          <PlayIcon />
        </Button>
        <Button className='p-2' isIconOnly color="none" aria-label="Like">
          <PauseIcon />
        </Button>
        <Button className='p-2' isIconOnly color="none" aria-label="Like">
          <StopIcon />
        </Button>
      </div>
      <Divider />
      <p>{currentLogIndex} - {flightData[currentLog]!=null?flightData[currentLog].log.length: 0}</p>
        </div>
      
      <div className="self-end">
        <Chip className="relative top-6 z-10" color="warning" >Video não disponível!</Chip>
        <Image  className="z-0" src={drone_view} width="250" radius='none'/>
      </div>
      
      </div>
      
      
      <div className="flex flex-col gap-2">
      <ScrollShadow className=" h-[500px]">
            <Listbox 
              aria-label="Single selection example"
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys}
            >

              {flightData.map((flight)=>{
                return (<ListboxItem key={flight.id}>
                    <Card className="min-w-[540px]" radius="none">
                        <CardHeader className="justify-between">
                            <div className="flex gap-5">
                              <Avatar isBordered radius="none" size="md" src={flight.avatar!=null?flight.avatar:no_avatar} />
                              <div className="flex flex-col gap-1 items-start justify-center">
                                <h4 className="text-small font-semibold leading-none text-default-600">{flight.around}</h4>
                                <h5 className="text-small tracking-tight text-default-400">{flight.date}</h5>
                              </div>
                            </div>
                            
                        </CardHeader>
                        <CardBody><h5 className="text-small font-semibold">{flight.flight_time} Segundos de Tempo de Voo</h5></CardBody>
                    </Card>
                </ListboxItem>)
              })}


            
              </Listbox>
          </ScrollShadow>
        <p className="text-small text-default-500">Selected value: {selectedValue}</p>
      </div>

    </div>
    
  );
}

export default FlightRecord;
