export interface Coin {
    image: { 
        large: string 
    },
    name: string,
    market_cap_rank: number,
    description: { 
        en: string 
    },
    market_data: {
         market_cap: {
            eur: number 
        }, 
    current_price: { 
            eur: number 
        } 
    }
}



