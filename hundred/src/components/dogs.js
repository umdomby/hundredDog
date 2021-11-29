import React, {useEffect, useState} from 'react';
import {fetchRecordDog, fetchSearchTitle, fetchSelectBreed} from "../http/dogAPI";
import {Col, Container, Row, Spinner} from "react-bootstrap";
import ReactPaginate from "react-paginate";

const Dogs = () => {
    const [loading1, setLoading1] = useState(true)
    const [dog, setDog] = useState([])
    const [searchTitle, setSearchTitle] = useState('')
    const [selectBreed, setSelectBreed] = useState([])
    const [pageNumber01, setPageNumber01] = useState(0);
    const usersPerPage01 = 5;
    const pagesVisited01 = pageNumber01 * usersPerPage01;

    useEffect(() => {
        fetchDog()
    },[]);

    const allView = async () => {
        fetchDog()
        setSearchTitle('')
    }

    const fetchDog = () => {
        fetchRecordDog().then(data =>
            {
                setDog(data)
                var uDog = []
                for(let i = 0; i < Object.keys(data).length; i++){
                    uDog.push(data[i].breed.title)
                }
                setSelectBreed([...new Set(uDog)]);
            }
        ).finally(() => setLoading1(false))
    }

    if (loading1) {
        return <Spinner animation={"grow"}/>
    }

    const pageCount = Math.ceil(Object.keys(dog).length / usersPerPage01);
    const changePage = ({ selected }) => {
        setPageNumber01(selected);
    };

    const sendSearchTitle = async () => {
        setDog(await fetchSearchTitle(searchTitle))
        setSearchTitle('')
    }

    const sendSelectBreed = async (e) => {
        setDog(await fetchSelectBreed(e))
    }

    return(
        <Container style={{maxWidth: '100%', minWidth: '700px'}}>
            <div className="m-2 border">
                <Row className="m-2 d-flex h-100 justify-content-center align-self-center">
                    <Col className="mr-2 border" style={{maxWidth: '33%', fontSize:'12px'}}>
                        <input
                            type="text"
                            value={searchTitle}
                            onChange={e => setSearchTitle(e.target.value)}
                            onKeyPress={event => {
                                if (event.key === "Enter") {
                                    return sendSearchTitle()
                                }
                            }}
                        />
                        <button className={'ml-2'} onClick={sendSearchTitle}>Search</button>
                        <button className={'ml-2'} onClick={allView}>All dogs</button>
                    </Col>
                    <Col className="mr-2 border" style={{maxWidth: '30%', fontSize:'12px'}}>
                        <select
                            onChange={e => sendSelectBreed(e.target.value)}
                        >
                            {selectBreed.map((item, index) =>
                                <option key={index} value={item}>{item}</option>
                            )};
                        </select>
                        <button className={'ml-2'} onClick={allView}>All dogs</button>
                    </Col>
                    <Col style={{maxWidth: '20%'}}>

                    </Col>
                </Row>
                {Object.keys(dog)
                    .slice(pagesVisited01, pagesVisited01 + usersPerPage01)
                    .map((item, index )=> (

                    <Row key={index} className="m-2 d-flex h-100 justify-content-center align-self-center">
                        <Col  className="mr-2 border" style={{maxWidth: '33%', fontSize:'12px'}}>
                            {dog[item].title}
                        </Col>
                        <Col className="mr-2 border" style={{maxWidth: '30%', fontSize:'14px'}}>
                           {dog[item].breed.title}
                        </Col>
                        <Col style={{maxWidth: '20%'}}>
                           <img style={{width: '150px', height: '150px'}} src={dog[item].image} alt={dog[item].breed.title}/>
                        </Col>
                    </Row>
                ))}
            </div>
            <div className="mt-3">
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                />
            </div>
        </Container>
    );

};

export default Dogs;
