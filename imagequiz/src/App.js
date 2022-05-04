import { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './components/Menu';
import Home from './components/Home';
import Login from './components/Login';
import FederatedLogin from './components/FederatedLogin';
import Register from './components/Register';
import Quiz from './components/Quiz';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  const [customer, setCustomer] = useState(localStorage.getItem('customer'));

  let loggedInHandler = (email) => {
    localStorage.setItem('customer', email);
    setCustomer(email);
  }

  const customerLoggedOutHandler = () => {
    localStorage.removeItem('customer');
    setCustomer(undefined);
  }

  return (
    <HashRouter>
      <Container fluid>
        <Row>
          <Col>
            <Menu customer={customer} customerLoggedOut={customerLoggedOutHandler} />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/login/:from' element={<Login isLoggedIn={loggedInHandler} />} />
              <Route path='/login' element={<Login isLoggedIn={loggedInHandler} />} />
              <Route path='/google/:username/:name' element={<FederatedLogin provider="google" customerLoggedIn={loggedInHandler} />}/>
              <Route exact path='/register' element={<Register />} />
              <Route exact path='/quiz/:id' element={
                <ProtectedRoute customer={customer}><Quiz /></ProtectedRoute>
              } />

            </Routes>
          </Col>
        </Row>
      </Container>
    </HashRouter>
  );
}

const ProtectedRoute = ({ customer, children }) => {
  const { id } = useParams();
  if (customer) {
    return children;
  } else {
    return <Navigate to={`/login/${id}`} />
  }
}



export default App;
