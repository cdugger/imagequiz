import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import apiAccess from '../communication/APIAccess';

const Menu = (props) => {

    let logout = () => {
        apiAccess.logout()
        .then(x => {
            props.customerLoggedOut();
        })
        .catch(e => {
            console.log(e);
        })
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#">Flowers</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {props.customer ?
                            <>
                                <Navbar.Text>
                                    Signed in as {props.customer}
                                </Navbar.Text>
                                <Nav.Link href="#/" onClick={logout}>Logout</Nav.Link>
                            </>
                            :
                            <>
                                <Nav.Link href="#/login">Login</Nav.Link>
                                <Nav.Link href="#/register">Register</Nav.Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;