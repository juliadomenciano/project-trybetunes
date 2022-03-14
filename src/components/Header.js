import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      waiting: true,
      name: '',
    };
  }

  async componentDidMount() {
    await this.gettingObj();
  }

   gettingObj = async () => {
     const data = await getUser();
     this.setState({
       name: data.name,
       waiting: false,
     });
   }

   render() {
     const { name, waiting } = this.state;

     return (

       <div>
         { waiting ? <Loading />
           : (
             <header data-testid="header-component">
               <h1 data-testid="header-user-name">
                 {name}
               </h1>
               <div>
                 <Link to="/search" data-testid="link-to-search">Search</Link>
                 <Link
                   to="/favorites"
                   data-testid="link-to-favorites"
                 >
                   Favorites
                 </Link>
                 <Link to="/profile" data-testid="link-to-profile">Profile</Link>
               </div>
             </header>)}
       </div>

     );
   }
}

export default Header;
