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
import  ModalGeneric from "./ModalGeneric";
import  Edit from "./Edit";
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactModal from 'react-modal';



import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';

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


class ProductsClass extends React.Component {
    state = {
      edit: false,
      category: {},
      products: []
    };

    componentDidMount() {
        
            this.getData();
   

            // axios.post(`https://artecart.co/api/categories/store`, { json: JSON.stringify({"category":"test Prueba mas"})})
            //     .then(res => {
            //         console.log(res);
            //         console.log(res.data);
            //     })
            // }, 3000);
      }

    getData(){

        axios.get(`https://artecart.co/api/products`)
          .then(res => {
             let { data }  = res;
            //console.log('response', data);
            console.log(data.products);
             this.setState({ products: data.products });
          });
        
    }

    handleOpen(category) {   
        
      this.setState({ edit: true, category: category});
      localStorage.clear();
     // console.log(category);    
    }

    handleClose = () => {
        this.setState({ open: false });
        
    };

    handleRoute(){
        console.log('Oeee!');
        this.setState({ edit: false});
        localStorage.clear();
        // console.log(this.state.category);   
    }


    

    handleEdit(){
      let data = JSON.parse(localStorage.getItem('data'));
      if(data){
        let info = {
            id: data.id,
            category: data.category,
            status: 1
        }
      // console.log('update esto eso jeje', data);
         axios.post(`https://artecart.co/api/categories/update`, { json: JSON.stringify(info)})
                 .then(res => {
                 this.getData();
                 this.handleRoute();
         })    
      }
      
      
    }

    handleDelete(category){
        //console.log(category);
        let confirm = window.confirm('¿Está seguro/a de eliminar esta categoría?');
         if(confirm){
            category.status = "0";
            axios.post(`https://artecart.co/api/categories/update`, { json: JSON.stringify(category)})
                 .then(res => {
                 this.getData();
                 //this.handleRoute();
              })
            //this.getData();
         }
    }

   render(){
    const { classes } = this.props;
    const type = 'categoría';

    return (
        <Paper className={classes.root}>
          { !this.state.edit ? <Table className={classes.table}> 
          
            <TableHead>
            <Button variant="contained" color="primary">
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
      );
   }

}

ProductsClass.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  // We need an intermediary variable for handling the recursive nesting.
 const Products = withStyles(styles)(ProductsClass);
  
export default Products;

// Categories.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(Categories);