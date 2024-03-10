import { Button, Divider, Image, Card, Table, TableHeader, TableColumn, TableBody, TableCell, TableRow, ScrollShadow, Listbox } from '@nextui-org/react';

import drone_view from "../assets/default_drone_view.png"

import MapView from "../components/map_view"
import { useEffect, useState } from 'react';

function PID() {//let map = < MapView  />;
  const [pos, setPos] = useState({lat:-2.53697577046641, lng:-44.2792379196194})
  const [droneData, setDroneData] = useState(null)
  const [detections, setDetections] = useState([{positive: true, date:"03/03/2023 - 03:03:15", num_detections:1, frame:"http://127.0.0.1:5000/pid-frame/455414", detections: [{class_name:"Pessoa", score:0.74, estimated_geopos:{lat:-2.53697577, lng:-44.2792379}}]}])
  
  
  useEffect(()=>{
    fetch("http://127.0.0.1:5000/pid", { mode: 'cors'}).then(async (r)=>{
        
    }).catch(err=>{console.log(err)})
  }, [])

  useEffect(()=>{
      setTimeout(()=>{
              fetch("http://127.0.0.1:5000/drone_data", { mode: 'cors'}).then(async (r)=>{
                  setDroneData(await r.json());
                  if(droneData!=null){
                      setPos({lat:droneData.lat, lng:droneData.lng})
                  }
              }).catch(err=>{console.log(err)})
              
              fetch("http://127.0.0.1:5000/get-next-pid", { mode: 'cors'}).then(async (r)=>{
                  let d = await r.json();
                  if(d.positive){
                    setDetections([r, ...detections])
                  }
              }).catch(err=>{console.log(err)}) 
      }, 500)
  }, [droneData])
  
return (
  <>
    
   
      <div class="grid grid-cols-3 items-end gap-2">
          <div className='col-span-2 col-start-1'>
              <Image src_="http://127.0.0.1:5000/video_feed" width="740" src={drone_view}/>
          </div>
          



      <Table  hideHeader={true} className='' width={200} fullWidth={false} layout="fixed">
      <TableHeader  >
          <TableColumn>.</TableColumn>
          <TableColumn>.</TableColumn>
      </TableHeader>
      <TableBody>
          <TableRow key="1">
          <TableCell className='font-bold'>Localização</TableCell>
          <TableCell>

              <Table removeWrapper >
                  <TableHeader>
                      <TableColumn className='font-bold'>Lat</TableColumn>
                      <TableColumn className='font-bold'>Lng</TableColumn>
                      <TableColumn className='font-bold'>Alt</TableColumn>
                  </TableHeader>
                  <TableBody>
                      <TableRow>
                          <TableCell>{droneData!=null?droneData.lat.toFixed(7):"-"}</TableCell>
                          <TableCell>{droneData!=null?droneData.lng.toFixed(7):"-"}</TableCell>
                          <TableCell>{droneData!=null?droneData.alt:"-"}m</TableCell>
                      </TableRow>
                  </TableBody>
              </Table>

          </TableCell>
          </TableRow>
          <TableRow key="2">
          <TableCell className='font-bold'>Orientação</TableCell>
          <TableCell>
              <Table removeWrapper >
                      <TableHeader>
                          <TableColumn className='font-bold'>Pitch</TableColumn>
                          <TableColumn className='font-bold'>Roll</TableColumn>
                          <TableColumn className='font-bold'>Yaw</TableColumn>
                      </TableHeader>
                      <TableBody>
                          <TableRow>
                              <TableCell>{droneData!=null?droneData.pitch:"-"}</TableCell>
                              <TableCell>{droneData!=null?droneData.roll:"-"}</TableCell>
                              <TableCell>{droneData!=null?droneData.yaw:"-"}</TableCell>
                          </TableRow>
                      </TableBody>
                  </Table>
          </TableCell>
          </TableRow>
          <TableRow key="3">
          <TableCell className='font-bold'>Velocidade (m/s)</TableCell>
          <TableCell>
                  <Table removeWrapper >
                      <TableHeader>
                          <TableColumn className='font-bold'>X</TableColumn>
                          <TableColumn className='font-bold'>Y</TableColumn>
                          <TableColumn className='font-bold'>Z</TableColumn>
                      </TableHeader>
                      <TableBody>
                          <TableRow>
                              <TableCell>{droneData!=null?droneData.vel_x:"-"}</TableCell>
                              <TableCell>{droneData!=null?droneData.vel_y:"-"}</TableCell>
                              <TableCell>{droneData!=null?droneData.vel_z:"-"}</TableCell>
                          </TableRow>
                      </TableBody>
                  </Table>
          </TableCell>
          </TableRow>
          
      </TableBody>
      </Table>
  
          
         
          
      </div>
  <Divider className='mt-5' />
  <div className='grid grid-cols-3 pt-10 gap-2' >    
        <div className='col-span-2' >
             <p className='font-simibold text-xl text-shadow'>Histórico</p>
             <ScrollShadow hideScrollBar className="">
                {detections.length==0?<p className=''>Vazio</p>:""}
                {detections.map((e)=>{
                    return (
                        <p>{JSON.stringify(e)}</p>
                    );
                })}
             </ScrollShadow>
        </div>
              
      <div className='map-center '>
                  <MapView  pos={pos} size={{width:"500px", height: "350px"}}/>
      </div> 
      
         
      
  </div>
  </>
);
}

export default PID;
