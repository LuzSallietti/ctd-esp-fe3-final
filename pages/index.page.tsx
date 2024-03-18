import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { Comic } from 'dh-marvel/features/comic/comic.types';
import Head from 'next/head';
import Link from 'next/link';
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { getComics } from 'dh-marvel/services/marvel/marvel.service';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


interface IndexPageProps {
    comics: Comic[];
    currentPage: number;
}

const Index: NextPage<IndexPageProps> = ({ comics, currentPage }) => {
    const router = useRouter();

    const handlePreviousPage = () => {
        const newPage = currentPage - 1;
        router.push(`/?page=${newPage}`);
    };

    const handleNextPage = () => {
        const newPage = currentPage + 1;
        router.push(`/?page=${newPage}`);
    };

    return (
        <>
            <Head>
                <title>Marvel Comics E-commerce</title>
                <meta name="description" content="By your Marvel Comics online" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <BodySingle title={"Comics"}>
                <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', padding: '5vw 2vw' }}>
                    {comics.map((comic) => (
                        <Card key={comic.id} sx={{ width: '16rem', margin: '1rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <CardMedia
                                sx={{ width: '100%', height: '15rem' }}
                                image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} // Concatenar la URL de la imagen
                                title={comic.title}
                            />
                            <CardContent>
                                <Typography gutterBottom sx={{ fontWeight: '600' }}>
                                    {comic.title}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{justifyContent: 'space-between'}}>
                                <Link href={`/comics/${comic.id}`} passHref>
                                    <Button size="small">Ver detalle</Button>
                                </Link>
                                <Button size="small" variant="contained" endIcon={<ShoppingCartIcon/>}>Comprar</Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
                <Box sx={{ textAlign: 'center', marginBottom: '4rem'}}>
                    <Button variant="outlined" startIcon={<ArrowBackIosIcon/>} onClick={handlePreviousPage} disabled={currentPage === 1}>
                        Anterior
                    </Button>
                    <Button variant="outlined" endIcon={<ArrowForwardIosIcon/>} onClick={handleNextPage}>
                        Siguiente
                    </Button>
                </Box>
            </BodySingle>
        </>
    );
};

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async (ctx) => {
    const { page = '1' } = ctx.query;
    const currentPage = parseInt(page as string);
    const offset = currentPage === 1 ? 0 : (currentPage - 1) * 12;
    const comics = await getComics(offset, 12);

    return {
        props: {
            comics: comics.data.results,
            currentPage
        }
    };
};

export default Index;