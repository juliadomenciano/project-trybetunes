import React from 'react';
import { NavLink } from 'react-router-dom';
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
                 <NavLink to="/search" data-testid="link-to-search">Search</NavLink>
                 <NavLink
                   to="/favorites"
                   data-testid="link-to-favorites"
                 >
                   Favorites
                 </NavLink>
                 <NavLink to="/profile" data-testid="link-to-profile">Profile</NavLink>
               </div>
             </header>)}
       </div>

     );
   }
}

export default Header;
