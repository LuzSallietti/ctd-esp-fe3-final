import { Comic } from 'dh-marvel/features/comic/comic.types'
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

interface CharacterCardProps {
    data: Comic;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ data }) => {
    return (
        <>
            <Card sx={{minWidth: { xs: '100%', md: '50%' }}}>
                <CardMedia
                    component="img"
                    sx={{ width: '100%', height: '20rem', objectFit: 'cover' }}
                    image={`${data.thumbnail.path}.${data.thumbnail.extension}`}
                    alt={data.title}
                />
                <CardContent sx={{ flex: '1', flexDirection: 'column' }}>
                    <Typography variant="h6" component="h2" gutterBottom fontWeight={500}>
                        {data.title}
                    </Typography>
                    <Typography variant='h6' fontWeight={600}>${data.price}</Typography>
                </CardContent>
            </Card>
        </>
    )
}

export default CharacterCard