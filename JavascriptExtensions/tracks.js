
// Turns names


root.track = new Object();
    // TrackPos%        Name
root.track['Spa'] = {
    0: 'start',
    0.03:  'La Source',
    0.07:  ' ',
    0.13:  'Le Raidillon',
    0.19:  ' ',
    0.21:  'Le Kemmel',
    0.26:  ' ',
    0.32:  'Les Combes',
    0.38:  ' ',
    0.41:  'Bruxelles',
    0.46:  'Speakers Corner',
    0.49:  ' ',
    0.52:  'Double gauche du Pouhon',
    0.60:  ' ',
    0.62:  'Fagnes',
    0.68:  ' ',
    0.69:  'Campus',
    0.72:  'La Courbe Paul Frère',
    0.83:  'Blanchimont',
    0.90:  ' ',
    0.94:  'La Chicane',
    0.98:  ' ',
};

root.track['monza'] = {
    0: 'start',
    0.09: ' ',
    0.14: 'Première Chicane droite',
    0.16: 'Première Chicane gauche',
    0.19: 'Biassono',
    0.31: ' ',
    0.34: 'Deuxième Chicane gauche',
    0.37: 'Deuxième Chicane droite',
    0.39: ' ',
    0.42: '1st Lesmo',
    0.46: ' ',
    0.48: '2nd Lesmo',
    0.51: ' ',
    0.55: 'Serraglio',
    0.61: ' ',
    0.66: 'Entrée Ascari',
    0.68: 'Ascari',
    0.71: 'Sortie Ascari',
    0.75: ' ',
    0.87: 'Parabole'
    
};

/*root.track['misano'] = {
    
};*/

function getTurnName() {
    let track = $prop('DataCorePlugin.GameData.TrackId');
    let trackPos = $prop('DataCorePlugin.GameData.TrackPositionPercent');
    let turn = '';
    
    if (root.track[track] != undefined || root.track[track] != null) {
        for (let pos in root.track[track]) {
            if (trackPos >=  pos) turn = root.track[track][pos];
            if (turn != '' && trackPos < pos) break;
        }
    }
    
    return turn;
}



