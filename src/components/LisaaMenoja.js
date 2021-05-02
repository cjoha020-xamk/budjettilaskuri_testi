import { Container, Button, Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

const useStyles = makeStyles({
    otsikko :{
        marginTop: 10,
        marginBottom:10,
        fontSize: 45
    },
    tekstikentta: {

        marginTop: 10,
        marginBottom: 10
                    
    },
  });

function LisaaMenoja(props) {

    const history = useHistory();

    const tyylit = useStyles();

    const [valttamattomyydet, setValttamattomyydet] = useState();

    const [menoerror1, setMenoError1] = useState();

    const [menohelper1, setMenoHelper1] = useState();

    const [huvit, setHuvit] = useState();

    const [menoerror2, setMenoError2] = useState();

    const [menohelper2, setMenoHelper2] = useState();

    const [nappi, setNappi] = useState(true);

    const laskeMenot = () => {

        let hupimenot = huvit;

        let valttamattomyysmenot = valttamattomyydet;

        props.setMenot(Number(hupimenot) + Number(valttamattomyysmenot));

        history.push('/');

    }

    useEffect(() => {

        if(isNaN(valttamattomyydet)){
            setMenoError1(true);
            setMenoHelper1('Syötä numero')
        }else{
            setMenoError1(false);
            setMenoHelper1('')
        }
        if(isNaN(huvit)){
            setMenoError2(true);
            setMenoHelper2('Syötä numero')
        }else{
            setMenoError2(false);
            setMenoHelper2('')
        }
        if(!isNaN(valttamattomyydet) && !isNaN(huvit)){
            setNappi(false)
        }else{
            setNappi(true)
        }    
      }, [valttamattomyydet, huvit])

    return (

        <Container>

            <Typography className={tyylit.otsikko}>Lisää vuosimenot</Typography>

            <TextField 
            label="Välttämättömyydet" 
            variant="outlined" 
            fullWidth
            className={tyylit.tekstikentta}
            error={menoerror1}
            helperText={menohelper1}
            onChange={(e) => {
                setValttamattomyydet(e.target.value);
            }}
            />

            <TextField 
            label="Huvit" 
            variant="outlined" 
            fullWidth
            className={tyylit.tekstikentta}
            error={menoerror2}
            helperText={menohelper2}
            onChange={(e) => {
                setHuvit(e.target.value);
            }}
            />

            
            <Button
            variant='contained'
            color='primary'
            fullWidth
            size='large'
            disabled={nappi}
            onClick={laskeMenot}
            style={{marginTop:10}}
            >Lisää menot</Button>

            <Button
            component={Link}
            to='/'
            variant='contained'
            fullWidth
            size='large'
            style={{marginTop:10}}
            >Peruuta</Button>


        </Container>

    )
}

export default LisaaMenoja
