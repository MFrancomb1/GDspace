import { Link, Outlet } from "react-router-dom";

const Layout = () =>{
    return(
        <>
        <nav>
            <Link to='/'> Home </Link>
            <Link to='/register'> Register </Link>
            <Link to='/login'> Login </Link>
            <Link to='/player'> Player </Link>
        </nav>
        <hr />
        <Outlet />
        </>
    )
}

export default Layout;