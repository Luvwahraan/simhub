
function contractName(name) {
    let cleanName = '';
    let sep = false;
    for (let s in name) {	
        if (sep) cleanName += name[s];
        if (name[s] == ' ') sep = true;
    }

    if (sep) {
        return tcase(name[0]) + '. ' + cleanName;
    }
    return name;
}