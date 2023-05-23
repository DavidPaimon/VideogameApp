import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../../redux/actions";
import style from "./Filters.module.css"

export default function Filters({handlerGenres, handlerCreated, source, genrechange}) {

    const dispatch = useDispatch();
    const genres = useSelector(state => state.genres);

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);


    return (
        <div className={style.divSourceGenres}>

            <div className={style.divSource}>
                <p className={style.titles}>SOURCE</p>

                <div className={style.divSource}>
                    <button style={source === "All"? {backgroundColor: "#280783", color: "white", borderColor: "white"} : undefined} className={style.source} onClick={() => handlerCreated('All')} >ALL</button>
                    <button style={source === "Api"? {backgroundColor: "#280783", color: "white", borderColor: "white"} : undefined} className={style.source} onClick={() => handlerCreated('Api')}>RAWG</button>
                </div>
            </div>

            <div>
                <p className={style.titles}>GENRES</p>

                <select value={genrechange} onChange={(e) => handlerGenres(e)} className={style.select}>
                    <option value=''>--Select--</option>
                    <option value='All'>All</option>
                    {
                        genres && genres.map(g => (
                            <option value={g.name} key={g.id}>{g.name}</option>
                        ))
                    }
                </select>
            </div>

        </div>
    )
}