import {motion} from "motion/react";
import UseMoviesDatabase from "../../hooks/useMoviesDatabase.js";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {deleteMovie, fetchMovies, postMovie} from "../../redux/features/moviesSlice.js";

export default function ScrollAnimations() {

    const {moviesList, isLoading, error} = useSelector(state => state.movieSlice);
    const dispatch = useDispatch();

    // const {moviesData, loading, error} = UseMoviesDatabase("GET");
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    const newMovie = {
        title: "movie 5",
        publish_date: "2024",

    }

    return (
        <div style={container}>

            {error && <div className="text-3xl font-bold text-slate-950"> {error.errorMessage.toString()} </div>}

            {isLoading && <div className="text-3xl font-bold text-slate-950"> Loading .... </div>}


            {moviesList.length > 0 && moviesList.map((item, i) => (
                <Card
                    key={item.objectId}
                    i={i}
                    img={item.image}
                    title={item.title}
                    hueA={200}
                    hueB={500}
                    onClickImage={() => {
                        navigate("/movie-details", {state: item})
                    }}
                    onClickDelete={() => dispatch(deleteMovie(item.objectId))}
                />

            ))}

            <button className="mt-5 px-5 py-3 bg-slate-800 text-slate-300 rounded-md cursor-pointer"
                    onClick={() => {
                        dispatch(postMovie(newMovie))
                    }}
            >add new movie we
            </button>
        </div>
    )
}


function Card({img, title, hueA, hueB, i, onClickImage, onClickDelete}) {
    const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`

    return (
        <motion.div
            className={`card-container-${i}`}
            style={cardContainer}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{amount: 0.8}}
        >
            <div style={{...splash, background}}/>
            <motion.div style={{...card, flexDirection: "column"}} variants={cardVariants} className="card">
                <img
                    src={img}
                    alt={title}
                    style={{
                        width: "80%",
                        height: "auto",
                        borderRadius: 12,
                        objectFit: "cover",
                    }}
                    onClick={onClickImage}
                />
                <motion.div className="flex flex-row items-center justify-between space-x-3">
                    <p style={{marginTop: 16, fontSize: 20, fontWeight: "bold"}}>{title}</p>
                    <button className="text-sm text-center mt-[16px] px-5 py-2 bg-slate-800 text-slate-300
                     rounded-md cursor-pointer" onClick={onClickDelete}>delete
                    </button>
                </motion.div>

            </motion.div>
        </motion.div>
    )
}


const cardVariants = {
    offscreen: {
        y: 300,
    },
    onscreen: {
        y: 50,
        rotate: -10,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8,
        },
    },
}

const hue = (h) => `hsl(${h}, 100%, 50%)`

//region styles

const container = {
    margin: "100px auto",
    maxWidth: 500,
    paddingBottom: 100,
    width: "100%",
    height: "100%"
}

const cardContainer = {
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    paddingTop: 20,
    marginBottom: -10,

}

const splash = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
}

const card = {
    fontSize: 164,
    width: 300,
    height: 430,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    background: "#f5f5f5",
    boxShadow:
        "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)",
    transformOrigin: "-50% 60%",
}

//endregion

