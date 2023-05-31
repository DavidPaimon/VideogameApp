import Nav from "./Nav"
import style from "./styles/About.module.css";
import linkedin from '../images/linkedin.png';
import github from '../images/github.png';

export default function About() {

    return(
        <div className={style.divGeneral}>
            
            <Nav/>

            <div className={style.divDetail}>

                <h2 className={style.title}>WELCOME TO THE VIDEOGAMES APP</h2>

                <p className={style.text}>
                    Hello, my name is David Florido. 
                    I present to you my video game application.
                    <br/>
                    <br/>
                    This application provides information about various video games
                    obtained through an API and a Database.
                    The application has a pagination and has the functionality of filtering, sorting, searching and creating games.
                    <br/>
                    <br/>
                    This application was developed using:
                    Javascript, Node.js, React, Redux, Pure CSS, Sequalize, PostgreSQL, and Express.
                </p>

                <div className={style.divRedes}>
                    <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/david-felipe-florido-jim%C3%A9nez-a862bb262/" className={style.redes}>
                        <img className={style.imagenL} src={linkedin} alt="img not found"/>
                        <p className={style.textRedes}>LinkedIn</p>
                    </a>
                    
                    <a target="_blank" rel="noreferrer" href="https://github.com/DavidPaimon" className={style.redes}>
                        <img className={style.imagenG} src={github} alt="img not found"/>
                        <p className={style.textRedes}>GitHub</p>
                    </a>
                </div>
                
            </div>
        </div>
    )
}