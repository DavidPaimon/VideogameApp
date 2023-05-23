import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getVideogameById, clearVideogame } from "../../redux/actions";
import { useParams } from "react-router-dom";
import style from "./DetailVg.module.css"
import imgDefault from "../../images/imgDefault.png"


export default function Detail() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const detailVideogame = useSelector(state => state.detail);

    useEffect(() => {
        dispatch(clearVideogame())
        dispatch(getVideogameById(id))
    }, [dispatch, id])


    return (
        <div>
            {
                detailVideogame.name?
                <div className={style.divGeneral}>

                    <div className={style.div}>

                        <h1 className={style.title}>{detailVideogame.name}</h1> <hr className={style.hr}></hr>

                        <div className={style.divAllInfo}>
                            <div className={style.divImg}>
                                <img className={style.img} src={detailVideogame.image? detailVideogame.image : imgDefault } alt="Img not found"/>
                            </div>
                            <div className={style.info}>
                                <p>{detailVideogame.description}</p>
                                <p>
                                    Released: <span>{detailVideogame.released}</span> 
                                </p>
                                <p>
                                    Rating: <span>{detailVideogame.rating}</span>
                                </p>
                                <p>
                                    Platforms: <span>{detailVideogame.platforms.length === 0 ? "Unspecified platform" : detailVideogame.platforms.join(", ")}</span>
                                </p>
                                <p>
                                    Genres: <span>{detailVideogame.genres.join(", ")}</span>
                                </p>
                            </div>
                        </div>

                    </div>

                    <div className={style.divBack}> 
                        <Link to = "/home">
                            <button className={style.btn}>BACK</button>
                        </Link>
                    </div>

                </div> 
                : 
                <div className={style.loading}>
                    <p>Loading</p>
                    <img  src="https://cdn.pixabay.com/animation/2023/03/20/02/45/02-45-27-186_512.gif" alt="Img not found" width="280px"/>
                </div>
            }
        </div>
    )
}