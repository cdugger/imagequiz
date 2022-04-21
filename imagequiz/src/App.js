import { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './components/Menu';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Quiz from './components/Quiz';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  const [customer, setCustomer] = useState(undefined);

  let loggedInHandler = (email) => {
    setCustomer(email);
  }

  return (
    <HashRouter>
      <Container fluid>
        <Row>
          <Col>
            <Menu customer={customer} />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/login' element={<Login isLoggedIn={loggedInHandler} />} />
              <Route exact path='/register' element={<Register />} />
              <Route exact path='/quiz/:id' element={<Quiz customer={customer} />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </HashRouter>
  );
}

export default App;
