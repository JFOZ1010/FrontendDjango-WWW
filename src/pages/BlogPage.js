
import { Link as LinkNew } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { Button, Container, Stack, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { Helmet } from 'react-helmet-async';


// @mui

import NewCardUtil from '../components/News/NewCardUtil';

import { useExternalApi } from '../hooks/NewResponse';
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
  { value: 'oldest', label: 'Oldest' },
];


// ----------------------------------------------------------------------
// python3 manage.py runserver 6060

// crear una funcion para mostrar la data obtenida de allNew useExternalApi


export default function BlogPage() {

  // eslint-disable-next-line
  const [new1, setNew1] = useState({})

  const { allNew } = useExternalApi()

  useEffect(() => {
    allNew(setNew1)
    // const aux = Object.values(new1)
    // setNew1(aux)

    // eslint-disable-next-line
  }, [])

  if (JSON.stringify(new1) === '{}') return <div> Cargando <LinearProgress /> </div>
  console.log(JSON.stringify(new1))

  return (

    <>

      <Helmet>
        <title> Dashboard: Blog | Minimal UI </title>
      </Helmet>
      {/* {console.log(JSON.stringify(new1))} */}
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Blog
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} component={LinkNew} to={'/dashboard/NewCreate'}>
            New Post
          </Button>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>
          <NewCardUtil new = {new1}/>
      </Container>
    </>
  );
  // nav = useNavigate()
}
