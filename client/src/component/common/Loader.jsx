import BeatLoader from "react-spinners/BeatLoader";

const override = {
    display: "block",
    margin: "30px auto",
    borderColor: "red",
};

const Loader = () => {

    return (

        <BeatLoader
            color="#00C3FF"
            cssOverride={override}
            aria-label="Loading Spinner"

        />

    )
}

export default Loader
