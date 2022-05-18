import loader from '../Assets/loading.gif'
import estilos from "../Estilos/Loading.module.css";

export default function Loading() {
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
