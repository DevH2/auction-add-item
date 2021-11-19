import React, { ChangeEvent, Component, CSSProperties } from 'react';
import logo from './logo.svg';
import './App.css';
import { Box, Button, Paper, TextField, Typography } from '@material-ui/core';
import { maxWidth } from '@mui/system';

type AppProps = {

}
type AppState = {
  nameInput:string
  descriptionInput:string
  priceInput:string
  imageInput:string
  confirmationText:string
}
type Item = {

}
const styles = {
  main: {
    display:"flex",
    flexDirection:"column",
    maxWidth: "12em",
    alignItems:"center",
    justifyContent:"center",
    transform:"translate(40rem,0)"
  },
  fieldContainer: {
    
  } 
} 
class App extends Component<Readonly<AppProps>, Readonly<AppState>> {
  constructor(props:AppProps){
    super(props)
    this.state ={
      nameInput:"",
      descriptionInput:"",
      priceInput:"",
      imageInput:"",
      confirmationText:""
    } 
  }
  setNameInput = (event:ChangeEvent<HTMLInputElement>):void => this.setState({nameInput: event.currentTarget.value})
  setDescriptionInput = (event:ChangeEvent<HTMLInputElement>):void => this.setState({descriptionInput: event.currentTarget.value })
  setPriceInput = (event:ChangeEvent<HTMLInputElement>):void  => this.setState({priceInput: event.currentTarget.value})
  setImageInput = (event:ChangeEvent<HTMLInputElement>):void => this.setState({imageInput: event.currentTarget.value})
  handleAddItem = async ():Promise<void> => {
    if(!this.state.nameInput || !this.state.confirmationText || !this.state.descriptionInput || !this.state.imageInput)
    try {
      const item:Item = {
        name: this.state.nameInput,
        description: this.state.descriptionInput,
        price: this.state.priceInput,
        image: this.state.imageInput
      }
      const res = await fetch('https://pastadinner.lren.cf/users/additem', {
        method:'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        mode:'cors',
        body: JSON.stringify(item)
      })
      console.log(await res.json())
      this.setState({confirmationText:"Item added"}, () => {
        setTimeout(() => this.setState({confirmationText:""}),3000)
      })
    } catch(error){
      this.setState({confirmationText:"Item not added"}, () => {
        setTimeout(() => this.setState({confirmationText:""}),3000)
      })
      console.log(error)
    }  
  }
  render(){
    return (
      <Box sx={styles.main}>
        <Box sx={styles.fieldContainer}>
          <Paper>
            <TextField onChange={this.setNameInput} label={"Name"}/>
            <TextField onChange={this.setDescriptionInput} label={"Description"}/>
            <TextField onChange={this.setPriceInput}label={"Price"}/>
            <TextField onChange={this.setImageInput}label={"Image Name"}/>
          </Paper>
          <Button onClick={this.handleAddItem}>Add Item</Button>
          <Typography>{this.state.confirmationText}</Typography>
        </Box>
      </Box>
    );
  }
 
}

export default App;
