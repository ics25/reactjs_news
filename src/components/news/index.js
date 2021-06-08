import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
  
  const columns = [
    { id: 'id_history', label: 'ID history', minWidth: 170 },
    { id: 'h_id_city', label: 'ID City', minWidth: 100 },
    { id: 'h_name_city', label: 'Name City', minWidth: 100 },
  ];

  function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
  }
  

  const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
  ];

const News = () => {
    const classes = useStyles();

    React.useEffect(() => {
      getCities();
    }, []);

      const [noticiasCiudad, setNoticiasCiudad] = React.useState("");
      const [cities, setCities] = React.useState(null);
      const [city, setCity] = React.useState(null);
      const [history, setHistory] = React.useState(null);
      const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(10);

      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };

      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

      
      const [open, setOpen] = React.useState(false);

      const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };

      async function getNoticasGenerales(idCiudad){
        await axios.get('/api/NewsCiudad/'+idCiudad)
        .then(response=> {
          // console.log(['Mostrando response de obtener avance del curso'], response.data.data);
          console.log(response.data);
          setNoticiasCiudad(response.data);
        })
        .catch(error =>{
          console.log(error);
        })
      }

      async function getHistory(){
        await axios.get('/api/histories')
        .then(response=> {
          console.log(response.data);
          setHistory(response.data);
        })
        .catch(error =>{
          console.log(error);
        })
      }

      async function getCities(){
        await axios.get('/api/city')
        .then(response=> {
          // console.log(['Mostrando response de obtener avance del curso'], response.data.data);
          console.log(response.data);
          setCities(response.data);
        })
        .catch(error =>{
          console.log(error);
        })
      }
      
    return (
        <div>
            <Container>
              <Grid 
                containter container
                direction="row"
                justify="space-between"
                alignItems="baseline"
              >
                <Grid item xs={6}>
                  <h1>Noticas por ciudad</h1>
                </Grid>
                <Grid item xs={6}>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={(e)=>{
                      e.preventDefault();
                      getHistory();
                      handleClickOpen();
                    }
                    }
                  >
                    <b>Ver historial</b>
                  </Button>
                </Grid>
              </Grid>

              <span>Seleccione una ciudad:</span>
              <br />
                
                <List component="nav" aria-label="contacts">
                {	
                    cities && cities.map((c,i)=>{
                        return(
                            <ListItem 
                            button 
                            style={ (city-1) === i ? {backgroundColor:'#d7e4ff',fontWeight:'bold'} : {}}
                            onClick={(e)=>{
                                e.preventDefault();
                                setCity(c.id_city);
                                console.log("id_ciudad: ",c.id_city);
                                getNoticasGenerales(c.id_city);
                            }}>
                                <ListItemIcon>
                                  { (city-1) === i ? <CheckCircleIcon style={{color:"black"}} /> : <LocationCityIcon /> }
                                </ListItemIcon>
                                <ListItemText primary={(city-1) === i ? <b>{c.name_city}</b> : c.name_city } />
                            </ListItem>
                        )
                    })
}
                </List>
                <hr />
                <br />
                <div>
                {	
                    noticiasCiudad && noticiasCiudad.news.map((item,a)=>{
                        return(
                            <div>
                              <Card className={classes.root}>
                                  <CardContent>
                                      <Typography className={classes.title} color="textSecondary" gutterBottom>
                                          <b>Autor: </b><span>{item.author}</span>
                                      </Typography>
                                      <Typography variant="h5" component="h2">
                                      {item.title}   
                                      </Typography>
                                      <Typography className={classes.pos} color="textSecondary">
                                          {item.description}
                                      </Typography>
                                      <Typography variant="body2" component="p">
                                      {item.content}
                                      <br />
                                      {'"a benevolent smile"'}
                                      </Typography>
                                  </CardContent>
                              </Card>
                              <br />
                            </div>
                        )
                    })
                }
                {
                    noticiasCiudad == null ?
                    <>
                        <br />
                        <b style={{color:"orange"}}>No hay noticias para esta ciudad</b>
                    </>
                    :
                    ""
                }
                </div>
            </Container>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Historial de ciudades consultadas"}</DialogTitle>
              <DialogContent>
                <Paper className={classes.root}>
                  <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ minWidth: column.minWidth }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {history && history.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                          return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                              {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                  <TableCell key={column.id} align={column.align}>
                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={history ? history.length : ""}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </Paper>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                  Cerrar
                </Button>
              </DialogActions>
          </Dialog>
        </div>
    )
}

export default News
