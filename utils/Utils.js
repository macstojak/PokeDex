const Utils = {
    
    getColor: (name) => {
        if(name === undefined){
            return "#4FC1A6";
        }

       

        switch (name) {
            case 'fire':
                return "#F7786B"
            case 'water':
                return "#77C4FE"
            case 'poison':
                return "#7C538C"
            case 'grass':
                return "#4FC1A6";
            case 'electric':
                return "#FFCE4B";
            case 'rock':
                return "#B1736C";
            case 'dark':
                return "#565669";
            case 'flying':
                return "#cdcde6";
            case 'dragon':
                return "#f7af5a";
            case 'bug':
                return "#92df68";
            case 'ground':
                return "#be7447";
            case 'psychic':
                return "#405483";
            case 'fighting':
                return "#a2a29b";
            case 'ghost':
                return '#9473b4';
            case 'ice':
                return '#a4def6';
            default:
                return "#c5c5c5"
        }
    },
}
export default Utils;