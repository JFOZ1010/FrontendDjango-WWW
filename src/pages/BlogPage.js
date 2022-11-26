import { Button, Container, Stack, Typography } from '@mui/material';
import { Link as LinkNew} from 'react-router-dom'
import { useEffect, useState } from 'react'; 
import { Helmet } from 'react-helmet-async';
import { useExternalApi } from '../hooks/NewResponse';
// @mui
// components
import Iconify from '../components/iconify';
import { BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';


// import { useNavigate } from 'react-router'
// import NewCreate from '../src/components/News/NewCreate'


// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------
// python3 manage.py runserver 6060

// crear una funcion para mostrar la data obtenida de allNew useExternalApi


export default function BlogPage() {

  // eslint-disable-next-line
  const [new1, setNew1] = useState({})

  const {allNew} = useExternalApi()

  useEffect(() => {
    allNew(setNew1)
    // eslint-disable-next-line
  }, [])

  /*
    useEffect(() => {
    // map new1
    new1.map((new1) => {
      console.log(new1)
      return new1; 
    }) 
  }, [new1])
  */

  // const {allNew} = useExternalApi()
  // const [data, setData] = useState({})

  // const news = useMemo(() => allNew(), [allNew]) 

 // hacer un useEffect de allNew, para que se ejecute cuando se renderice la pagina
 /* 
  useEffect(() => {
    setData(allNew())

  }, [])
  */



  return (
    <>
      <Helmet>
        <title> Dashboard: Blog | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Blog
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} component = {LinkNew} to = {'/dashboard/NewCreate'}>
            New Post
          </Button>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={POSTS} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>
      </Container>
    </>
  );
  // nav = useNavigate()
}
