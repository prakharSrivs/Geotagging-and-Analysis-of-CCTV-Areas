import React from 'react'
import Form from 'react-bootstrap/Form'
import '../cssFiles/UserPortalCard.css'
import DeleteIcon from '@mui/icons-material/Delete';

function UserPortalCard(props) {
  console.log('reached');
  return (
    <>
        <div className="cameraCard">
            <div className="cameraName">
               {props.CameraName}
            </div>
            <div className="subheading">
              BackUp : {props.BackupDays} days
            </div>
            <div className="subheading">
            <Form >
            <Form.Check type="switch" id="custom-switch" label="Active"  />
            </Form>
            </div>
            <DeleteIcon className='iconDelete'/>
        </div>
    </>
  )
}

export default UserPortalCard