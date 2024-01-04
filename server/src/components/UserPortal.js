import React,{useEffect, useState} from 'react'
import PortalNavBar from './PortalNavBar'
import UserPortalCard from './UserPortalCard'
import '../cssFiles/UserPortalCard.css'
import { Form,Button,Modal } from 'react-bootstrap'
import { auth } from '../firebase'
import { db } from '../firebase'
import { collection, query,where, getDocs ,addDoc } from 'firebase/firestore'
import { async } from '@firebase/util'
import { DockOutlined } from '@mui/icons-material'
function UserPortal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data,setData]=useState([]);
  const [cameraName,setCameraName]=useState();
  const [backupTime,setBackupTime]=useState(0);
  const [location,setLocation]=useState([]);

  const user = auth.currentUser;
  const dataCollectionRef=collection(db,"cameraData");
  let downData =[];
  useEffect(()=>{
    async function gettingDataExample(){
      const q = query(dataCollectionRef, where("userId", "==", user.uid));
      const querySnapShot= await getDocs(q)
      let i=0;
      querySnapShot.forEach((doc) => {
        downData[i++]=doc.data();
      });
      setData(downData);
      console.log(data);
    }
    gettingDataExample();
  },[])
  useEffect(()=>{
    async function gettingDataExample(){
      const q = query(dataCollectionRef, where("userId", "==", user.uid));
      const querySnapShot= await getDocs(q)
      let i=0;
      querySnapShot.forEach((doc) => {
        downData[i++]=doc.data();
      });
      setData(downData);
      console.log(data);
    }
    gettingDataExample();
  },[show])  
  const storeData=function(e) {
    e.preventDefault();
    console.log('reached',cameraName,backupTime,location);
    const createData=async()=>{
    await addDoc(dataCollectionRef,{cameraName,backupTime,userName:user.displayName,location,userId:user.uid,phoneNumber:user.phoneNumber})
    }
    createData();
  }

  return (
    <div>
    <PortalNavBar/>
    <div className="allCards">
    {data && console.log(data)}
    {data.map(item=> (
      <div>
      <UserPortalCard CameraName={item.cameraName} BackupDays={item.backupTime}/>
      </div>
    ))}
    <div className="cameraCard" id='special' style={{padding:0}} onClick={handleShow}>
        <div style={{fontSize:'105px',fontWeight:400,marginLeft:"auto",marginRight:"auto"}}>+</div>
        </div>
    </div>
    {} 
    {
      show && <>
         
      <>
      <Modal style={{marginTop:"100px"}} show={show} onHide={handleClose}>
       
        <Modal.Body>
        <Form onSubmit={storeData}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Camera Name</Form.Label>
        <Form.Control type="text" placeholder="Camera X" onChange={(e)=> setCameraName(e.target.value)}/>
      </Form.Group>
      <Form.Label>Location</Form.Label>
      <Button variant="primary" type="" className='locationButton' style={{backgroundColor:  "#3F3CE8", display:"block",border:"none",borderRadius:0,marginBottom:"15px",height:"40px"}}>
      Use My Location 
      </Button>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>BackUp Time</Form.Label>
        <Form.Control type="number" placeholder="In Days" onChange={(e)=> setBackupTime(e.target.value)}/>
      </Form.Group>
      
      <Button variant="primary" type="submit" style={{backgroundColor:  "#3F3CE8",height:'50px'}} >
      Add 
      </Button>
    </Form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
      
      </>
    }
    </div>
  )
  
}

export default UserPortal