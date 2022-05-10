import loader from '../Img/loading.gif'
import estilos from "../Estilos/Loading.module.css";

function Loading() {
    return (
        <div className={estilos.spinner}>
            <img 
				src={loader}
				alt='loader'
                width="500"
                height="450"
			/>
            
        </div> 
    )
}

export default Loading;