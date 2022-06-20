import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from './UserContext';

const Layout = (props) => {
    const { user } = useUserContext();
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-sm navbar-dark fixed-top bg-dark border-bottom box-shadow">
                    <div className="container">
                        <Link to='/' className='navbar-brand'>
                            Real Time Tasks
                        </Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                            <ul className="navbar-nav flex-grow-1">
                                <li className="nav-item">
                                    <Link to='/' className='nav-link text-light'>
                                        Home
                                    </Link>
                                </li>
                                {!user && <>
                                    <li className="nav-item">
                                        <Link to='/signUp' className='nav-link text-light'>
                                            SignUp
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to='/logIn' className='nav-link text-light'>
                                            Log In
                                        </Link>
                                    </li></>
                                }
                                {user && <li className="nav-item">
                                    <Link to='/logOut' className='nav-link text-light'>
                                        Log Out
                                    </Link>
                                </li>}
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <div className="container" style={{ marginTop: 60 }}>
                {props.children}
            </div>

        </div>
    )
}

export default Layout;