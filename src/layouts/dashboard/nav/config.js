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
        path: '/dashboard/productPage',
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
        path: '/dashboard/reports',
        icon: icon('ic_analytics'),
      },
      {
        title: 'Tienda',
        path: '/dashboard/productPage',
        icon: icon('ic_cart'),
      },
      {
        title: 'Noticias',
        path: '/dashboard/noticiasAdmin',
        icon: icon('ic_blog'),
      },
      /*{
        title: 'Generar Scrapping',
        path: '/dashboard/scrapping-gen',
        icon: icon('ic_lock'),
      },*/
    ]
  } else if (tipo.localeCompare('Supplier') === 0) {
    config  =
    [
      {
        title: 'Tienda',
        path: '/dashboard/productPage',
        icon: icon('ic_cart'),
      },
      {
        title: 'Noticias',
        path: '/dashboard/noticiasClientes',
        icon: icon('ic_blog'),
      },
      {
        title: 'Tienda',
        path: '/dashboard/productPage',
        icon: icon('ic_cart'),
      },
      {
        title: 'Reporte: top items por proveedor',
        path: 'reports/itemsBySupplier',
        icon: icon('ic_analytics'),
      },
      {
        title: 'Reporte ItemByCat',
        path: 'reports/itembycat',
        icon: icon('ic_analytics'),
      }
    ]
  } else {
    config  = []
  }
}

const navConfig = config;
export default navConfig;
