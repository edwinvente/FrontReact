import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import  Edit from "./Edit";
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class CategoriesClass extends React.Component {
    state = {
      edit: false,
      category: {},
      categorias: [],
      openModal: false
    };

    componentDidMount() {
        
        this.getData();
  
      }
    getData(){

        axios.get(`https://artecart.co/api/categories`)
          .then(res => {
             let { data }  = res;
            //console.log('response', data);
             this.setState({ categorias: data.categories });
          });
        
    }

    handleOpen(category) {   
        
      this.setState({ edit: true, category: category});
      localStorage.clear();  
    }

    handleClose = () => {
        this.setState({ open: false });
        
    };

    handleRoute(){
        this.setState({ edit: false});
        localStorage.clear(); 
    }


    handleEdit(){
      let data = JSON.parse(localStorage.getItem('data'));
      if(data){
        let info = {
            id: data.id,
            category: data.category,
            status: 1
        }
         axios.post(`https://artecart.co/api/categories/update`, { json: JSON.stringify(info)})
                 .then(res => {
                 this.getData();
                 this.handleRoute();
         })    
      }
      
      
    }

    handleCloseModal (){
      this.setState({openModal:false});
    };

    handleOpenModal (){
      this.setState({openModal:true});
    };

     handleChange(e){
       let category = {"category": e.target.value};
      this.setState({
        category : category
       });
    }

    handleCreate(){
       if(this.state.category.category){
        axios.post(`https://artecart.co/api/categories/store`, { json: JSON.stringify(this.state.category)})
            .then(res => {
                this.getData();
                this.handleCloseModal();
            })
         
       }
    }
  

    handleDelete(category){
       
        let confirm = window.confirm('¿Está seguro/a de eliminar esta categoría?');
         if(confirm){
            category.status = "0";
            axios.post(`https://artecart.co/api/categories/update`, { json: JSON.stringify(category)})
                 .then(res => {
                 this.getData();
                
              })
       
         }
    }

   render(){
    const { classes } = this.props;
    const type = 'categoría';

    return (
       <div>
           <Paper className={classes.root}>
          

          { !this.state.edit ? <Table className={classes.table}> 
          
            <TableHead>
            <Button variant="contained" color="primary" onClick={ () => this.handleOpenModal() }>
                Crear categoría
            </Button>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell numeric>Categoria</TableCell>
                <TableCell numeric>Acciones</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              { this.state.categorias ? this.state.categorias.map(category => {
                return ( category.status != "0" ?
                  <TableRow key={category.id}>
                    <TableCell component="th" scope="row" size="small">
                      {category.id}
                    </TableCell>
                    <TableCell numeric size="small">{category.category}</TableCell>
                    <TableCell numeric size="small">
                    <Button variant="contained" color="primary" onClick={() => this.handleOpen(category)}>
                       Editar
                    </Button>
                      <Button variant="contained" color="secondary" onClick={() => this.handleDelete(category)}>
                       Eliminar
                       </Button>
                    </TableCell>
            
                  </TableRow> : ''
                );
              }): <CircularProgress />}
            </TableBody>
            </Table> : <Edit type={'categoria'}  
              handleRoute= { () => this.handleRoute() }
              handleEdit = { () => this.handleEdit() }
              name={'Editar'}
              info={this.state.category}
              ></Edit> }

        </Paper>
        <Dialog aria-labelledby="simple-dialog-title" open={this.state.openModal}>
      <DialogTitle id="simple-dialog-title">Crear Categoría</DialogTitle>
        <div>
        <TextField
                    id="standard-full-widt2"
                    label="Nombre de la categoría"
                    style={{ margin: 8 }}
                    placeholder="Ingresa el nombre de la categoría"
                    fullWidth
                    onChange={(e) => {this.handleChange(e)}}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />
           
                      <Button variant="contained" color="secondary" onClick={() => this.handleCloseModal()}>
                       Cerrar
                       </Button>

                    <Button variant="contained" color="primary" onClick={() => this.handleCreate()}>
                          Crear categoría
                    </Button>
           
        </div>
    </Dialog>
       </div>
      );
   }

}

CategoriesClass.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
 const Categories = withStyles(styles)(CategoriesClass);
  
export default Categories;

