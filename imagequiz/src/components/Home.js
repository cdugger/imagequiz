import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import data_service from '../data_access_layer/data_service';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();

    let startQuiz = (flowerName) => {
        navigate('/quiz/' + flowerName);
    }

    return (
        <Container>
            <Row xs={1} md={3} className="g-4 text-center">
                {data_service.getFlowers().map((f, i) => (
                    <Col>
                        <Card className="h-100" onClick={() => startQuiz(f.name)}>
                            <Card.Img variant="top" src={f.picture} />
                            <Card.Body>
                                <Card.Title>{f.name}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Home;