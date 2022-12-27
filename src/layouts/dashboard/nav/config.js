// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;
const tipo = window.localStorage.getItem('tipo');
// console.log(tipo);
let config;

if (tipo){
  if (tipo.localeCompare('Cliente') === 0) {
    config  = [
      {
        title: 'Tienda',
        path: '/dashboard',
        icon: icon('ic_cart'),
      },
      {
        title: 'Noticias',
        path: '/dashboard/noticiasClientes',
        icon: icon('ic_blog'),
      },
    ]
  }else if (tipo.localeCompare('Admin') === 0) {
    config  = [
      {
        title: 'Gestión de usuarios',
        path: '/dashboard/gestion_usuarios',
        icon: icon('ic_user')
      },
      {
        title: 'Reportes',
        path: '/dashboard',
        icon: icon('ic_analytics'),
      },
      {
        title: 'Tienda',
        path: '/dashboard',
        icon: icon('ic_cart'),
      },
      {
        title: 'Noticias',
        path: '/dashboard/noticiasAdmin',
        icon: icon('ic_blog'),
      },
      {
        title: 'Generar Scrapping',
        path: '/dashboard/scrapping-gen',
        icon: icon('ic_lock'),
      },
    ]
  } else if (tipo.localeCompare('Supplier') === 0) {
    config  = 
    [
      {
        title: 'Tienda',
        path: '/dashboard',
        icon: icon('ic_cart'),
      },
      {
        title: 'Noticias',
        path: '/dashboard/noticiasClientes',
        icon: icon('ic_blog'),
      },
      {
        title: 'Reportes',
        path: '/dashboard',
        icon: icon('ic_analytics'),
      },
    ]
  } else {
    config  = []
  }
}
/*
const navConfig = [
  {
    title: 'Registro',
    path: '/dashboard/registro',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Actualizacion',
    path: '/dashboard/prueba',
    icon: icon('ic_user'),
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
  {
    title: 'Gestion de usuarios',
    path: '/dashboard/gestion_usuarios',
    icon: icon('ic_user')
  },
];
*/

const navConfig = config;
export default navConfig;
