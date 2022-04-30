import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import Card from "../Card/Card.jsx"
import Footer from "../Footer/Footer.jsx"
import Navbar from "../Navbar/Navbar.jsx";
import { getMovies } from "../../redux/actions/index.js";

export default function Home (){

    const dispatch = useDispatch();

    const allMovies = useSelector (state => state.pelisfiltradas);

    useEffect(()=>{
        dispatch(getMovies());
    }, [dispatch])

    return (
        <div>
            <div>
            <h1>CINE INDEPENDIENTE</h1>
            </div>
                <div>
                    <Navbar/>
                </div>
                <div>
                {
                    allMovies ? allMovies?.map(data => {
                        let nombresGen = [];

                        let generos = data.Genres
                        generos.forEach(a => {
                            nombresGen.push(a.name)
                        })

                        let nombresCountry = [];

                        let country = data.Countries
                        country.forEach(a => {
                            nombresCountry.push(a.name)
                        })
                        return (
                            <div key={data.id}>
                                <Card title={data.title}
                                poster={data.poster}
                                year={data.year}
                                country={nombresCountry}
                                Genres={"Géneros: " + nombresGen.join(", ")}
                                rating={"Rating: " + data.rating}
                                key={data.id} />
                            </div> 
                        )
                    }) :
                    <img /* src="https://i.pinimg.com/originals/3d/80/64/3d8064758e54ec662e076b6ca54aa90e.gif" */ alt="not found" />
                }
                </div>
                <div>
                    <Footer/>
                </div>
        </div>
    )
}