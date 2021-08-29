// FUNCTION
module.exports = (items) => {
    let i;
    let list = items;
    let weights = [];

    for (i = 0; i < list.length; i++)
        weights[i] = list[i].chance + (weights[i - 1] || 0);
        
    let random = Math.random() * weights[weights.length - 1];
    
    for (i = 0; i < weights.length; i++)
        if (weights[i] > random)
            break;
    
    return list[i]
}

// EXAMPLE HOW TO USE
let basicCrate = [{
  name: "Pocket Knife",
  chance: 50
}, {
  name: "Butcher Knife",
  chance: 40
}, {
  name: "Samurai Sword",
  chance: 10
}]

// function(basicCrate);