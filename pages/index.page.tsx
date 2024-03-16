import type {NextPage} from 'next'
import { GetStaticProps } from 'next';
import Head from 'next/head'
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { getComics } from 'dh-marvel/services/marvel/marvel.service';
import  Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Index: NextPage = ({comics}) => {
    console.log(comics)
    const data = comics.data.results
    return (
        <>
            <Head>
                <title>Marvel Comics E-commerce</title>
                <meta name="description" content="By your Marvel Comics online"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <BodySingle title={"Comics"}>
                <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent:'center', padding: '5vw 2vw'}}>
                {data.map((comic)=> (
                    <Card key={comic.id} sx={{width: '16rem', margin: '1rem 2rem', display: 'flex', flexDirection:'column', justifyContent:'space-between'}}>
                        <CardMedia
                            sx={{width: '100%', height:'15rem'}}                            
                            image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} // Concatenar la URL de la imagen
                            title={comic.title}
                        />                      
                        <CardContent>                        
                            <Typography gutterBottom sx={{ fontWeight: '600'}}>
                            {comic.title}
                            </Typography>                           
                        </CardContent>
                        <CardActions>
                            <Button size="small">Ver detalle</Button>
                            <Button size="small" variant="contained">Comprar</Button>
                        </CardActions>                   
                    </Card>
                ))}
                </Box>                                
            </BodySingle>
        </>
    )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
	const comics = await getComics(0,12);

	return {
		props: {
			comics
		}
	}
}


export default Index
