import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import apiAccess from '../communication/APIAccess';


const Home = () => {
    const [flowers, setFlowers] = useState([]);
    const navigate = useNavigate();

    let startQuiz = (flowerName) => {
        navigate('/quiz/' + flowerName);
    }

    useEffect(() => {
        apiAccess.getFlowers()
        .then(x => {
            setFlowers(x);
        })
        .catch(e => {
            console.log(e);
            alert('Something went wrong.')
        })
    }, []);

    return (
        <Container>
            <Row xs={1} md={3} className="g-4 text-center">
                {flowers.map((f, i) => (
                    <Col key={i}>
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