import React from 'react';

export default function Paginado ({gamesPerPage, allGames, paginado}){
    const pageNumbers = []

    for (var i=1; i<=Math.ceil(allGames/gamesPerPage); i++){
        pageNumbers.push(i)
    }
    return(
        <nav>                        
                <div  style={{
                    display: 'flex',
                    flexdirection: 'row',                    
                    flexWrap: 'wrap',
                    justifyContent:'center',
                    alingItems: 'center',
                    margin: '5px',                    
                    decoration: 'none'     
                }}>
                    
                    {pageNumbers &&                   
                     pageNumbers.map ( number => (
                            <ul 
                                key={number} >
                                <button onClick={() => paginado(number)}>{ number }</button>
                            </ul>
                     )) }

                </div>
        </nav>

    )

}