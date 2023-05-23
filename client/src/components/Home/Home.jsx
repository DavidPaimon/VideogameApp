import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../../redux/actions";
import Nav from "../Nav/Nav";
import CardVideogame from "../CardVg/CardVg";
import Pagination from "../Pagination/Pagination";
import Filters from "../Filters/Filters";
import OrderBy from "../OrderBy/OrderBy";
import { filterByGenres, filterByCreated } from "../../redux/actions";
import { orderByName, orderByRating } from "../../redux/actions";
import style from "./Home.module.css"
import imgDefault from "../../images/imgDefault.png"

export default function Home() {

    let dispatch = useDispatch();

    const allVideogames = useSelector(state => state.videogames);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        const storedPage = localStorage.getItem("currentPage");
        if (storedPage) {
          setCurrentPage(parseInt(storedPage));
        }
      }, []);
    
      useEffect(() => {
        localStorage.setItem("currentPage", currentPage.toString());
      }, [currentPage]);
    const [videogamesPerPage] = useState(15);
    const indexOfLastVideogame = currentPage * videogamesPerPage;
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame);
    const [source, setSource] = useState("All");
    const [namechange, setNamechange] = useState('');
    const [ratingchange, setRatingchange] = useState('');
    const [genrechange, setGenrechange] = useState('');
    const [, setOrder] = useState()

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    }


    useEffect(() => {
        dispatch(getVideogames());
    }, [dispatch]);


    function handleClick(e) {
        e.preventDefault();
        dispatch(getVideogames());
        setNamechange("");
        setRatingchange("");
        setGenrechange("")
        setCurrentPage(1);
        setSource("All");
    }

    function handlerGenres(e) {
        e.preventDefault();
        dispatch(filterByGenres(e.target.value));
        setCurrentPage(1);
        setSource("All");
        setGenrechange(e.target.value);
        setOrder("Order" + e.target.value)
    }
    
    function handlerCreated(e) {
        dispatch(filterByCreated(e));
        console.log(e);
        setSource(e);
        setCurrentPage(1);
        setGenrechange("");
        setOrder("Order" + e)
    }

    function handlerByName(e) {
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setRatingchange("");
        setNamechange(e.target.value);                      
        setOrder("Order" + e.target.value) 
    }

    function handlerByRating(e) { 
        dispatch(orderByRating(e.target.value));
        setCurrentPage(1);   
        setNamechange("");                   
        setRatingchange(e.target.value); 
        setOrder("Order" + e.target.value); 
    }


    return (
        <div>

            <Nav/>

            <div className={`${style.divCards} ${style.home}`}>
                
                <div className={style.firstColum}>
                    <OrderBy handlerByName={handlerByName} handlerByRating={handlerByRating} namechange={namechange} ratingchange={ratingchange}/>
                    <Filters handlerGenres={handlerGenres} handlerCreated={handlerCreated} source={source} genrechange={genrechange}/>
                    <button onClick={e => {handleClick(e)}} className={style.btn}>
                        RESET
                    </button>
                </div>

                <div className={style.secondColum}>
                    <h1 className={style.title}>VIDEOGAME INFORMATION</h1>
                
                     <Pagination videogamesPerPage={videogamesPerPage} allVideogames={allVideogames.length} pagination={pagination} currentPage={currentPage}/>
                    
                    <div className={style.home}>

                        {currentVideogames.length > 0 ?
                        <div className={style.divCards}>
                            {currentVideogames.map( el => {
                                return (
                                    <div key={el.id}>
                                        <CardVideogame name={el.name} genres={el.genres} image = {el.image ? el.image : imgDefault} rating={el.rating} id={el.id} createdInDb={el.createdInDb}/>
                                    </div>
                                );
                            })}
                        </div> 
                        : 
                        <div className={style.divLoading}>
                            <img className={style.loading} src="https://img1.picmix.com/output/stamp/normal/8/5/2/9/509258_fb107.gif" alt="Img not found" width="150px"/>
                        </div>}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}