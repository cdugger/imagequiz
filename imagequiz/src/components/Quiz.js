import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import apiAccess from '../communication/APIAccess';

const Quiz = (props) => {
    const navigate = useNavigate();
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
    const [score, setScore] = useState(0);
    const [quiz, setQuiz] = useState(undefined);
    const { id } = useParams();
    const [disabled, setDisabled] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        if (!quiz) {
            apiAccess.getQuiz(id)
                .then(x => {
                    setQuiz(x);
                })
                .catch(e => {
                    alert('Something went wrong');
                    console.log(e);
                });
        }
    }, [quiz, id]);

    let nextQuizQuestion = () => {
        if (currentQuestionNumber === quiz.questions.length - 1) {
            setGameOver(true);
            // submit the score if user is logged in
            if (props.customer) {
                apiAccess.addScore(props.customer, id, score)
                    .then(x => {
                        if (x.done) {
                            console.log('Successfully submitted score');
                        } else {
                            console.log('Score not submitted');
                            console.log(x.message);
                        }
                    }).catch(e => {
                        console.log(e);
                        console.log('Something went wrong');
                    })
            }
        } else {
            setCurrentQuestionNumber(currentQuestionNumber + 1);
            setDisabled(false);
        }

    }

    let checkAnswer = (choice, event) => {
        // prevents the choice from being clicked again after the correct answer is picked
        if (disabled) {
            return;
        }

        if (choice === quiz.questions[currentQuestionNumber].answer) {
            let icon = document.createElement('i');
            icon.setAttribute("class", "bi-check");
            icon.setAttribute("style", "font-size: 2rem; color: green");
            event.target.appendChild(icon);
            setScore(score + 1);
        } else {
            let icon = document.createElement('i');
            icon.setAttribute("class", "bi-x");
            icon.setAttribute("style", "font-size: 2rem; color: red");
            event.target.appendChild(icon);
        }

        setDisabled(true);
        setTimeout(() => {
            nextQuizQuestion();
        }, 1500)
    }

    let startOver = () => {
        setCurrentQuestionNumber(0);
        setScore(0);
        setDisabled(false);
        setGameOver(false);
    }

    return (
        <Container>
            {quiz ?
                <Card className="text-center" style={{ "width": "40rem" }}>
                    <Card.Header as="h5" >{currentQuestionNumber + 1}/6 <span className="d-flex justify-content-end">Your Score: {score}/6</span> </Card.Header>
                    <Card.Img variant="top" src={quiz.questions[currentQuestionNumber].picture} />
                    <Card.Body>
                        <Card.Title>{quiz.name} Quiz</Card.Title>
                        <Card.Subtitle></Card.Subtitle>
                        <Card.Text>
                            {gameOver ?
                                <>
                                    <div>Final Score: {score}/6</div>
                                    <Button variant="primary" onClick={startOver}>Try Again</Button>
                                    <Button variant="primary" onClick={() => navigate('/')}>Return to quizzes</Button>
                                </>
                                : <p>Select an answer</p>}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup>
                        {quiz.questions[currentQuestionNumber].choices.map((c, i) => (
                            <ListGroup.Item key={i} onClick={(e) => checkAnswer(c, e)}>{c}</ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card>
                :
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            }
        </Container>
    );
}

export default Quiz;