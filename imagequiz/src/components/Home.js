import flowers from '../data';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';


const Home = () => {
    const flowerInfo = flowers.map((f) => {
        return <Col>
            <Card>
                <Card.Img variant="top" src={f.picture} />
                <Card.Body>
                    <Card.Title>{f.name}</Card.Title>
                </Card.Body>
            </Card>
        </Col>
    })
    return (
        <Row xs={1} md={4} className="g-4">
            {flowerInfo}
        </Row>
    );
}

export default Home;