import React, {useContext, useState}from 'react'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {notlarContext} from './Store'

function Not () {


    const[notlar, setNotlar] = useContext(notlarContext);

    const [not, setnot] = useState("");

    const handleInputChange = event => {
        const { name, value } = event.target;
        setnot({ ...not, [name]: value });
    };

    const sil = id => {
        fetch(`http://localhost:3005/notlar/${id}`, {
          method: 'DELETE'
        })
        setNotlar(notlar.filter(x => x.id !== id));
    }

    const findId = m =>{
        var x = 1;
        for(var i = 0; i < notlar.length; i++){
            if(x < notlar[i].id){
                x = notlar[i].id
            }
        }
        x= x+1;
        return x; 
      }

    const ekle = e => {
        fetch('http://localhost:3005/notlar/', {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:findId,
                not:not.not,
            })
        })
        window.location.reload();
    }



    return (
        <Container component="main" maxWidth="xs">
            <br/><br/><br/><br/><br/><br/>
            
            <TextField id="standard-basic" label="Not" name ="not" onChange={handleInputChange} />
            
            <Button variant="contained" color="primary" onClick={()=>ekle()}>Not Ekle</Button>
            <br/><br/><br/><br/>
            <TableContainer component={Paper}>
                <Table  aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell >Not</TableCell>
                        <TableCell >Sil</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    
                        {
                            notlar.map(not => 

                                <TableRow key={not.id} >

                                    <TableCell >{not.id}</TableCell>
                                    <TableCell >{not.not}</TableCell>
                                    <TableCell >
                                        <Button variant="contained" color="secondary" onClick={() => sil(not.id)}>Sil</Button>
                                    </TableCell>
                                        
                                </TableRow>
                            
                                )
                        }
                        
                    </TableBody>
                </Table>
            </TableContainer>
            
            </Container>
            
    )

}

export default Not