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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  formControl: {
    margin: theme.spacing.unit * 1,
    minWidth: 400,
  }
});

class ProductsClass extends React.Component {
    state = {
      edit: false,
      name: "",
      price: 0,
      reference: "",
      size: "",
      stock: 0,
      idUp:0,
      status:"1",
      products: [],
      openModal:false,
      openModalEdit:false,
      campos:[
        { name: 'Nombre',type: 'text', 'real': 'name'},
        { name: 'Precio',type: 'number' , 'real': 'price'},
        { name: 'Referencia',type: 'text',  'real': 'reference'},
        { name: 'Categoria', type: 'text',  'real': 'name'},
        { name: 'Tamaño',type: 'text', 'real': 'size'},
        { name: 'Stock',type: 'number', 'real': 'stock'}
      ],
      categorias: [],
      cateSelected: 0
    };

    componentDidMount() {
        
        this.getData();
        this.getCategorias();
      }

    getData(){

        axios.get(`https://artecart.co/api/products`)
          .then(res => {
             let { data }  = res;
             this.setState({ products: data.products });
          });
        
    }

    getCategorias(){
      axios.get(`https://artecart.co/api/categories`)
          .then(res => {
             let { data }  = res;
             this.setState({ categorias: data.categories });
          });

    }

    handleOpen(product) {   

      this.setState({
        name: product.name,
        price: product.price,
        reference: product.reference,
        size: product.size,
        stock: product.stock,
        cateSelected: product.category_id,
        idUp: product.id,
        status: product.status
      });
    
      this.setState({openModalEdit:true});
    
    }

    handleClose = () => {
        this.setState({ open: false }); 
    };

    handleCloseModal (){
      this.setState({openModal:false});
    };

    handleOpenModal (){
      this.setState({openModal:true});
    };

    handleCloseModalEdit (){
      this.setState({openModalEdit:false});

    };


    handleDelete(product){
      
        let confirm = window.confirm('¿Está seguro/a de eliminar este producto?');
         if(confirm){
          let info = {
            id: product.id,
            name: product.name,
            price: product.price,
            reference: product.reference,
            size: product.size,
            stock: product.stock,
            category: product.category_id,
            status: "0"  
         }
          axios.post(`https://artecart.co/api/products/update`, { json: JSON.stringify(info)})
               .then(res => {
                   if(res.data.status == "success"){
                     this.getData();
                     this.handleCloseModalEdit();
                      
                   }
           })
           
         }
    }

    handleChangeCategory(e){

      this.setState({
        cateSelected : e.target.value
      });

    }

    handleChangeInput(e, name){
        let { value } =  e.target;
        switch(name){
         case 'Nombre':
            this.setState({ name :value });
          break;

          case 'Precio':
            this.setState({ price :value });
          break;

          case 'Referencia':
            this.setState({ reference :value });
            break;

          case 'Tamaño':
            this.setState({ size :value });
            break;

          case 'Stock':
          this.setState({ stock :value });
          break;
      }

    }

    handleCreate(){
     
      let info = {
         name: this.state.name,
         price: this.state.price,
         reference: this.state.reference,
         size: this.state.size,
         stock: this.state.stock,
         category: this.state.cateSelected  
      }
       axios.post(`https://artecart.co/api/products/store`, { json: JSON.stringify(info)})
            .then(res => {
                console.log(res);
                console.log(res.data);
                if(res.data.status == "success"){
                  this.getData();
                  this.handleCloseModal();
                   
                }
        })
    }

    handleUpdate(){
     
      let info = {
         id: this.state.idUp,
         name: this.state.name,
         price: this.state.price,
         reference: this.state.reference,
         size: this.state.size,
         stock: this.state.stock,
         category: this.state.cateSelected,
         status: this.state.status  
      }
       axios.post(`https://artecart.co/api/products/update`, { json: JSON.stringify(info)})
            .then(res => {
                console.log(res);
                console.log(res.data);
                if(res.data.status == "success"){
                  this.getData();
                  this.handleCloseModalEdit();
                   
                }
        })
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
                Crear producto
            </Button>
           
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell numeric>Nombre</TableCell>
                <TableCell numeric>Precio</TableCell>
                <TableCell numeric>Referencia</TableCell>
                <TableCell numeric>Tamaño</TableCell>
                <TableCell numeric>Stock</TableCell>
                <TableCell numeric>Acciones</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              { this.state.products ? this.state.products.map(product => {
                return ( product.status != "0" ?
                  <TableRow key={product.id}>
                    <TableCell component="th" scope="row" size="small">
                      {product.id}
                    </TableCell>
                    <TableCell numeric size="small">{product.name}</TableCell>
                    <TableCell numeric size="small">{product.price}</TableCell>
                    <TableCell numeric size="small">{product.reference}</TableCell>
                    <TableCell numeric size="small">{product.size}</TableCell>
                    <TableCell numeric size="small">{product.stock}</TableCell>
                    <TableCell numeric size="small">
                    <Button variant="contained" color="primary" onClick={() => this.handleOpen(product)}>
                       Editar
                    </Button>
                      <Button variant="contained" color="secondary" onClick={() => this.handleDelete(product)}>
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
      <DialogTitle id="simple-dialog-title">Crear Producto</DialogTitle>
        <div>
           { this.state.campos.map((campo, index) => {
             let data = (campo.name == 'Categoria') ? <FormControl className={classes.formControl}>
             <InputLabel id="demo-simple-select-label">Categoría</InputLabel>
             <Select
               id="demo-simple-select"
               value={this.state.cateSelected}
               fullWidth
               onChange={ (e) => { this.handleChangeCategory(e)} }
             >
               <MenuItem value={0}>--</MenuItem>
               {this.state.categorias.map((cate, i) => {
                  return(<MenuItem key={i} value={cate.id}>{cate.category}</MenuItem>) 
               })}
               
             </Select>
           </FormControl> : <TextField
                    key={index}
                    id="standard-full-widt"
                    label={campo.name}
                    style={{ margin: 8 }}
                    placeholder={campo.name}
                    fullWidth
                    onChange={(e) => {this.handleChangeInput(e, campo.name)}}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}></TextField>
              return (
                   data
                
              );
           })}
                      
              <Button variant="contained" color="secondary" onClick={() => this.handleCloseModal()}>
                Cerrar
                </Button>

            <Button variant="contained" color="primary" onClick={() => this.handleCreate()}>
                  Crear Producto
            </Button>
           
        </div>
    </Dialog>

    <Dialog aria-labelledby="simple-dialog-title" open={this.state.openModalEdit}>
      <DialogTitle id="simple-dialog-title2">Editar Producto</DialogTitle>
        <div>
           { this.state.campos.map((campo, index) => {
             let data = (campo.name == 'Categoria') ? <FormControl className={classes.formControl}>
             <InputLabel id="demo-simple-select-label2">Categoría</InputLabel>
             <Select
               id="demo-simple-select2"
               value={this.state.cateSelected}
               fullWidth
               onChange={ (e) => { this.handleChangeCategory(e)} }
             >
               <MenuItem value={0}>--</MenuItem>
               {this.state.categorias.map((cate, i) => {
                  return(<MenuItem key={i} value={cate.id}>{cate.category}</MenuItem>) 
               })}
               
             </Select>
           </FormControl> : <TextField
                    key={index}
                    id="standard-full-widt"
                    label={campo.name}
                    style={{ margin: 8 }}
                    placeholder={campo.name}
                    value={this.state[campo.real]}
                    fullWidth
                    onChange={(e) => {this.handleChangeInput(e, campo.name)}}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}></TextField>
              return (
                   data
                
              );
           })}
                      
              <Button variant="contained" color="secondary" onClick={() => this.handleCloseModalEdit()}>
                Cerrar
                </Button>

            <Button variant="contained" color="primary" onClick={() => this.handleUpdate()}>
                  Actualizar Producto
            </Button>
           
        </div>
    </Dialog>

        </div>
      );
   }

}

ProductsClass.propTypes = {
    classes: PropTypes.object.isRequired
  };

 const Products = withStyles(styles)(ProductsClass);
  
export default Products;
