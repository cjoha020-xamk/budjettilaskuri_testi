import { Button, Container, Typography, TextField } from "@material-ui/core"
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


function LisaaTuloja(props) {

    
    const history = useHistory();

    const tyylit = useStyles();

    const [ansiotulot, setAnsioTulot] = useState();

    const [paaomatulot, setPaaOmaTulot] = useState();

    const [ansioveroprosentti, setAnsioVeroProsentti] = useState();

    const [ika, setIka] = useState();

    const [ansioerror, setAnsioError] = useState(false);

    const [ansiohelper, setAnsioHelper] = useState('');

    const [paaomaerror, setPaaOmaError] = useState(false);

    const [paaomahelper, setPaaOmaHelper] = useState('');

    const [ansioveroerror, setAnsioVeroError] = useState(false);

    const [ansioverohelper, setAnsioVeroHelper] = useState('');

    const [ikaerror, setIkaError] = useState(false);

    const [ikahelper, setIkaHelper] = useState('');

    const [nappi, setNappi] = useState(true);


    const laskeTulot = () => {

        let ansiobrutto = Number(ansiotulot);

        let paaomabrutto = Number(paaomatulot);

        let ansionetto = 0;

        let paaomanetto = 0;

        let ansiotuloverot = 0;

        let yli = 0;

        let tyoelakemaksu = 0;
    
        let tyottomyyskorvaus = 0;
    
        let sairasvakuutusmaksu = 0;
    
        let ylevero = 0;
    
        let kirkollisvero = 0;

        if(ika >= 17 && ika <= 52){
            tyoelakemaksu = Number(ansiobrutto) / 100 * 7.15
        }else if(ika >= 53 && ika <= 62){
            tyoelakemaksu = Number(ansiobrutto) / 100 * 8.65
        }else if(ika >= 63){
            tyoelakemaksu = Number(ansiobrutto) / 100 * 7.15
        }else{
            tyoelakemaksu = 0
        }
       
        if(ansiotulot >= 14776){
            sairasvakuutusmaksu = Number(ansiobrutto) / 100 * 1.36
        }else{
            sairasvakuutusmaksu = 0
        }

        if(ika <= 64 && ika >= 17){
            tyottomyyskorvaus = 1.4;
        }else{
            tyottomyyskorvaus = 0.5;
        }

        if(ansiobrutto >= 14000){
            yli = ansiobrutto - 14000;
            ylevero = yli / 100 * 2.5;
            if(ylevero >= 163){
                ylevero = 163;
            }
        }else{
            ylevero = 0;
        }

        if(ansiobrutto >= 14400){
            kirkollisvero = ansiobrutto / 100 * 1.5;
        }else{
            kirkollisvero = 0;
        }

        if(paaomabrutto <= 30000){
            paaomanetto = paaomabrutto / 100 * 70
        }
        if(paaomabrutto > 30000){
            paaomanetto = paaomabrutto / 100 * 66
        }

        ansiotuloverot = ansiotulot / 100 * ansioveroprosentti;

        ansiotuloverot +=  tyoelakemaksu + sairasvakuutusmaksu + tyottomyyskorvaus + kirkollisvero

        ansionetto = (Number(ansiobrutto) - Number(ansiotuloverot));

        props.setTulot(Number(ansionetto) + Number(paaomanetto))

        history.push('/');

    }

    useEffect(() => {

        if(isNaN(ansiotulot)){
            setAnsioError(true);
            setAnsioHelper('Syötä numero')
        }else{
            setAnsioError(false);
            setAnsioHelper('');
        }
        if(isNaN(paaomatulot)){
            setPaaOmaError(true);
            setPaaOmaHelper('Syötä numero')
        }else{
            setPaaOmaError(false);
            setPaaOmaHelper('');
        }
        if(isNaN(ansioveroprosentti)){
            setAnsioVeroHelper('Syötä numero')
            setAnsioVeroError(true)
        }else{
            setAnsioVeroHelper('')
            setAnsioVeroError(false)
        }
        if(isNaN(ika)){
            setIkaHelper('Syötä ikäsi')
            setIkaError(true)
        }else{
            setIkaHelper('')
            setIkaError(false)
        }
        if(!isNaN(ansiotulot) && !isNaN(paaomatulot) && !isNaN(ansioveroprosentti) && !isNaN(ika)){
            setNappi(false)
        }else{
            setNappi(true)
        }
  
      }, [ansiotulot, paaomatulot, ansioveroprosentti, ika])

    return (

        <Container>

            <Typography className={tyylit.otsikko}>Lisää vuositulot</Typography>

            <TextField 
            label="Syötä ikä" 
            variant="outlined" 
            fullWidth
            className={tyylit.tekstikentta}
            error={ikaerror}
            helperText={ikahelper}
            onChange={(e) => {
                setIka(e.target.value);
              }}
            />

            <TextField 
            label="Lisää ansiotuloja (brutto)" 
            variant="outlined" 
            fullWidth
            className={tyylit.tekstikentta}
            error={ansioerror}
            helperText={ansiohelper}
            onChange={(e) => {
                setAnsioTulot(e.target.value);
              }}
            />

            <TextField 
            label="Lisää pääomatuloja (brutto)" 
            variant="outlined" 
            fullWidth
            className={tyylit.tekstikentta}
            error={paaomaerror}
            helperText={paaomahelper}
            onChange={(e) => {
                setPaaOmaTulot(e.target.value);
              }}
            />

            <TextField 
            label="Lisää ansiotulojesi veroprosentti" 
            variant="outlined" 
            fullWidth
            className={tyylit.tekstikentta}
            error={ansioveroerror}
            helperText={ansioverohelper}
            onChange={(e) => {
                setAnsioVeroProsentti(e.target.value);
              }}
            />

            <Button
            variant='contained'
            color='primary'
            fullWidth
            size='large'
            disabled={nappi}
            onClick={laskeTulot}
            style={{marginTop:10}}
            >Lisää tulot</Button>

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

export default LisaaTuloja
