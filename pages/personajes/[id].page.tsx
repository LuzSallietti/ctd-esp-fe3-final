import { getCharacter } from 'dh-marvel/services/marvel/marvel.service'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router';
import { Character } from 'dh-marvel/features/character/character.types'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, Card, CardContent, CardMedia, Typography, Button, Select, MenuItem, CardActions } from '@mui/material';

interface CharacterPageProps {
  character: Character
}

const CharacterPage: NextPage<CharacterPageProps> = ({ character }) => {
  console.log(character)
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };
  return (
    <>
    <Box sx= {{padding: '5vw 2vw', display:'flex', justifyContent:'center' }}>
    <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, width: { xs: '100%', md: '66%' }, minHeight:'66vh'}}>
        <CardMedia
          component="img"
          sx={{ width: { xs: '100%', sm: '50%' }, height: '75%', objectFit: 'cover' }}
          image={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt="Producto"
        />
        <CardContent sx={{ flex: '1', flexDirection: 'column' }}>
          <Typography variant="h5" component="h2" gutterBottom fontWeight={800}>
            {character.name}
          </Typography>          
          <Typography variant="subtitle1" gutterBottom fontWeight={600} marginTop={4}>
            Biografía
          </Typography>
          <Typography variant="body1" gutterBottom>
            {character.description && character.description || "Sin descripción disponible"}
          </Typography>          
          <CardActions>
            <Button variant="outlined" color="primary" startIcon={<ArrowBackIosIcon/>} onClick={handleGoBack} sx={{ mt: 2, ml: 1, mr: 1 }}>
              Volver
            </Button>            
          </CardActions>          
        </CardContent>
      </Card>
      </Box>
      </>
  )
}

export const getServerSideProps : GetServerSideProps = async ({params}) => {
  
  const id = params?.id as string
  const character = await getCharacter(id);

  return {
		props: {
			character
		}
	}

}


export default CharacterPage