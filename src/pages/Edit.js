import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TextField from '@material-ui/core/TextField';


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

class Edit extends Component {

  state = { expanded: false,
        type: '',
        object: {},
        data: ''

     };
  
  

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  handleChange (e) {
    this.setState({
        data : e.target.value
    });
    let info = {
       "id": this.props.info.id,
       "category": e.target.value,
       "type": "categoy",
       "event": this.props.name
    }
     localStorage.setItem("data", JSON.stringify(info));
    
  }

  componentWillMount(){
      if(this.props.info.category){
        this.setState({
            data : this.props.info.category
        });
      }
}


 


  render () {
    const { classes } = this.props; 
    const { type } = this.props;
    const { handleRoute } = this.props;
    const { handleEdit } = this.props;
    const { info } = this.props;
    const { name } = this.props;
   

    console.log('Hola desde categoría: ', type);

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary">
             { name }  { type }
            </Typography>

            <div>
                    <TextField
                    id="standard-full-width"
                    label="Nombre de la categoría"
                    style={{ margin: 8 }}
                    value={this.state.data}
                    placeholder="Ingresa el nombre de la categoría"
                    fullWidth
                    onChange={(e) => {this.handleChange(e)}}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />
           </div>
         
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleRoute}>Atrás</Button>
            <Button size="small" color="primary" onClick={handleEdit}>Editar</Button>
          </CardActions>
        </Card>     
      </div>
    );
  }
}

Edit.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Edit);