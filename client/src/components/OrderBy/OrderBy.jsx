import React from "react";
import style from "./OrderBy.module.css"

export default function OrderBy({handlerByName, handlerByRating, namechange, ratingchange}) {

    return (
        <div className={style.divSort}>

            <p className={style.titles}>SORT BY </p>

            <div className={style.divName}>
                <label className={style.subTitles}>Name </label>
                <select value={namechange} onChange={(e) => handlerByName(e)} className={style.selects}>
                    <option value=''>Alphabetically</option>
                    <option value='asc'>(A - Z)</option>
                    <option value='desc'>(Z - A)</option>
                </select>
            </div>

            <div className={style.divRating}>
                <label className={style.subTitles}>Rating</label>
                <select value={ratingchange} onChange={(e) => handlerByRating(e)} className={style.selects}>
                    <option value=''>Qualification</option>
                    <option value='asc'>Ascending</option>
                    <option value='desc'>Descending</option>
                </select>
            </div>
        </div>
    )

}

