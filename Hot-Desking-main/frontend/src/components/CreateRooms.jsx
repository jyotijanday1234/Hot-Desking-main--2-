import React from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'
import { useState } from 'react';
import Swal from 'sweetalert2'
import env from '../env.json'
import Checkbox from '@mui/material/Checkbox';
const CreateRooms = () => {
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  let [checkPrinter, setCheckPrinter] = useState(false);
  let [checkProjector, setCheckProjector] = useState(false);
  let [checkWifi,setCheckWifi] = useState(false)
  const handlePrinter = (event) => {
    console.log(event);
    checkPrinter = event.target.checked
    setCheckPrinter(checkPrinter);
    console.log('checkPrinter',checkPrinter);
  };
  const handleProjector = (event) => {
    checkProjector = event.target.checked
    setCheckProjector(checkProjector);
    console.log('checkProjector',checkProjector);
  };
  const handleWifi = (event) => {
    checkWifi = event.target.checked
    setCheckWifi(checkWifi);
    console.log('checkWifi',checkWifi);
  };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let body = {
            roomName : data.get('roomName'),
            roomSize : data.get('roomSize'),
            location: data.get('location'),
            rentPerHr: data.get('rentPerHr'),
            image: data.get('image'),
          }
        const base64 = await convertToBase64(body.image)
        body.image = base64
        body.printer = checkPrinter
        body.projector = checkProjector
        body.wifi = checkWifi
        console.log('body',body);
        try {
            const url = env.backend_url_room + '/createrooms'
            const response = await axios.post(url,body)
            setMsg(response.data.message)
            Swal.fire({
              icon: 'success',
              title: 'New Meeting Room Created Successfully',
             })
         } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
      };
  return (
    <div>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <TextField
                  autoComplete="given-name"
                  name="roomName"
                  required
                  fullWidth
                  id="roomName"
                  label="Room Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  fullWidth
                  id="roomSize"
                  label="Room Size"
                  name="roomSize"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  fullWidth
                  id="location"
                  label="Location"
                  name="location"
                  autoComplete="location"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  fullWidth
                  id="rentPerHr"
                  label="Rent Per Hour"
                  name="rentPerHr"
                  autoComplete="rentPerHr"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  fullWidth
                  accept="image/*"
                  type='file'
                  id="image"
                  label=""
                  name="image"
                  autoComplete="image"
                />
              </Grid>
              <br />
              <Grid item xs={4}>
                <div>
                  <h3>Room Aminities</h3>
                  <div>
                    <Checkbox
                      checked={checkPrinter}
                      onChange={handlePrinter}
                    />
                    <label htmlFor="">Printer</label>
                  </div>
                  <div>
                    <Checkbox
                      checked={checkProjector}
                      onChange={handleProjector}
                    />
                    <label htmlFor="">Projector</label>
                  </div>
                  <div>
                    <Checkbox
                      checked={checkWifi}
                      onChange={handleWifi}
                    />
                    <label htmlFor="">Wifi and Broadband</label>
                  </div>
                 
                </div>
              </Grid>
              
            </Grid>
            {error && <div style={{color:'red',margin:'5px',padding:'5px'}}>{error}</div>}
            {msg && <div style={{color:'green',margin:'5px',padding:'5px'}}>{msg}</div>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Room
            </Button>
          </Box>
    </div>
  )
}

export default CreateRooms

function convertToBase64(file){
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      };
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }