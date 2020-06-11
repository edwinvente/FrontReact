import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import axios from 'axios';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';


const styles = theme => (
  {
    root: {
      display: 'flex',
      alignItems: 'center'
    },
    card: {
      minWidth: 275,
      maxWidth: 400,
      marginRight: 20,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      marginBottom: 16,
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
      marginLeft: 'auto',
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }
);

class Shop extends Component {

  state = { expanded: false , 
    products: []
  };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  componentDidMount() {
        
    this.getData();
    // this.getCategorias();
  }

  getData(){

    axios.get(`https://artecart.co/api/products`)
      .then(res => {
         let { data }  = res;
          console.log(data.products);
          
         this.setState({ products: data.products });
      });
    
    }

    handleShop(product){
      let info = {
        id: product.id,
        name: product.name,
        price: product.price,
        reference: product.reference,
        size: product.size,
        stock: (product.stock) - 1,
        category: product.category_id,
        status: product.status 
     }

     if(product.stock == 0){
        alert('No se puede comprar este producto');
        return;
     }
      axios.post(`https://artecart.co/api/products/update`, { json: JSON.stringify(info)})
           .then(res => {
               if(res.data.status == "success"){
                 this.getData();
                  
               }
       })
    }

  render () {
    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;

    return (
      <div className={classes.root}>

      <GridList cellHeight={180} className={classes.gridList}>
              <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                <ListSubheader component="div">Tienda de productos</ListSubheader>
              </GridListTile>
              {this.state.products.map((prodcut) => (
                <GridListTile key={prodcut.id}>
                  <img src={`https://via.placeholder.com/100x100?text=producto`} alt={prodcut.name} />
                  <GridListTileBar
                    title={prodcut.name}
                    subtitle={<span>Stock: {prodcut.stock}</span>}
                    actionIcon={
                      <Button variant="contained" color="primary" onClick={() => this.handleShop(prodcut)}>
                      Comprar Producto
                </Button>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>


     
        
        
  
              
  
        
      </div>
    );
  }
}

Shop.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Shop);