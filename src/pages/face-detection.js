import { Button, Divider, Image, Card, Table, TableHeader, TableColumn, TableBody, TableCell, TableRow } from '@nextui-org/react';

import drone_view from "../assets/default_drone_view.png"

import MapView from "../components/map_view"
import { useEffect, useState } from 'react';



function FaceDetection() {
    //let map = < MapView  />;
    const [pos, setPos] = useState({lat:-2.53697577046641, lng:-44.2792379196194})
    const [droneData, setDroneData] = useState(null)
    
    useEffect(()=>{
        fetch("http://127.0.0.1:5000/face_detection", { mode: 'cors'}).then(async (r)=>{
            
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
        }, 500)
    }, [droneData])
    
  return (
    <>
        <div className="grid grid-cols-2 items-end gap-2">
            <div className=''>
                <Image src="http://127.0.0.1:5000/video_feed" width="740" src_={drone_view}/>
            </div>
            



        <Table hideHeader={true} className='' >
        <TableHeader  >
            <TableColumn>.</TableColumn>
            <TableColumn>.</TableColumn>
        </TableHeader>
        <TableBody>
            <TableRow key="1">
            <TableCell className='font-bold'>Localização</TableCell>
            <TableCell>

                <Table>
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
                <Table>
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
                    <Table>
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
    <div className='grid grid-cols-2 pt-10 gap-2' >        
        <div className='map-center '>
                    <MapView  pos={pos}/>
        </div> 
        
            <div className='hidden' >
                <Button >Btn1</Button>
           
                <Button >Btn1</Button>
           
                <Button onClick={()=>{setPos({lat:pos.lat+0.00001, lng: pos.lng})}}>mudar mapa</Button>
            </div>
        
    </div>
    </>
  );
}

export default FaceDetection;
