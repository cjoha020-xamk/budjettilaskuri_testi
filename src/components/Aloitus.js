import { Button, Container, Typography } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'


const useStyles = makeStyles({
    otsikko :{
        marginTop: 10,
        marginBottom:10,
        fontSize: 45
    },
    teksti: {

        marginTop: 10,
        marginBottom: 10,
        fontSize: 20
                    
    },
    nappi:{

        marginTop: 10,
        marginBottom: 10,

    },
    teksti2: {

        marginTop: 10,
        marginBottom: 10,
        fontSize: 30,
        color: 'blue'
                    
    },
    teksti3: {

        marginTop: 10,
        marginBottom: 10,
        fontSize: 30,
        color: 'red'
                    
    },
    teksti4: {

        marginTop: 10,
        marginBottom: 10,
        fontSize: 30,
        color: 'black'
                    
    },
  });


function Aloitus(props) {

    const tyylit = useStyles();

    let kuukausitulot = props.tulot / 12;

    let kuukausimenot = props.menot / 12;

    let kuukausisaastot = props.saastot / 12;
    

    useEffect(() => {
        if(props.tulot > 0 && props.menot > 0){
            props.setSaastot(Number(props.tulot) - Number(props.menot))
        }else{
            props.setSaastot('Säästöjä ei voi laskea ennen menojen lisäämistä.')
        }
  
      }, [props])

    return (
        
        <Container>

            <Typography className={tyylit.otsikko}>Budjettilaskuri</Typography>

            <Typography className={tyylit.teksti}>Hallitse kuukausittaista budjettiasi sovelluksen avulla</Typography>

            <Button
            component={Link}
            to='/tulot'
            variant='contained'
            color='primary'
            fullWidth
            size='large'
            className={tyylit.nappi}
             >Lisää tuloja</Button>

            <Button
            component={Link}
            to='/menot'
            variant='contained'
            color='secondary'
            fullWidth
            size='large'
            className={tyylit.nappi}
             >Lisää menoja</Button>


            <Typography className={tyylit.teksti2}>{`Tulot vuodessa: ${props.tulot.toFixed(2)} €`}</Typography> 

            <Typography className={tyylit.teksti2}>{`Tulot kuukaudessa: ${kuukausitulot.toFixed(2)} €`}</Typography>

            <Typography className={tyylit.teksti3}>{`Menot vuodessa: ${props.menot.toFixed(2)} €`}</Typography> 

            <Typography className={tyylit.teksti3}>{`Menot kuukaudessa: ${kuukausimenot.toFixed(2)} €`}</Typography>

            {(props.saastot > 0) 
            ? <Container>
                <Typography className={tyylit.teksti4}>{`Säästöt vuodessa: ${props.saastot.toFixed(2)} €`}</Typography>
                <Typography className={tyylit.teksti4}>{`Säästöt kuukaudessa: ${kuukausisaastot.toFixed(2)} €`}</Typography>
                </Container>
            : (props.saastot < 0)
            ?  <Container>
                <Typography className={tyylit.teksti4}>{`Säästöt vuodessa: ${props.saastot.toFixed(2)} €`}</Typography>
                <Typography className={tyylit.teksti4}>{`Säästöt kuukaudessa: ${kuukausisaastot.toFixed(2)} €`}</Typography>
                </Container>
            :  <Typography>Säästöjä ei voi laskea ennen tulojen ja menojen lisäämistä</Typography>
            } 


        </Container>            

    )
}

export default Aloitus
