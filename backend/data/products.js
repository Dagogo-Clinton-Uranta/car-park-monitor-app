
function products(){
const F = 52
const G = 50
const H = 51
const R = 95
const A = 37
const B = 46
const C = 78
const D = 30
const E = 71

let parkedTrucksF = []
let parkedTrucksG = []
let parkedTrucksH = []
let parkedTrucksR = []
let parkedTrucksA = []
let parkedTrucksB = []
let parkedTrucksC = []
let parkedTrucksD = []
let parkedTrucksE = []

for(let i = 0 ; i < F; i++){parkedTrucksF.push({bookingNumber:'empty'}) }
for(let i = 0 ; i < G; i++){parkedTrucksG.push({bookingNumber:'empty'}) }
for(let i = 0 ; i < H; i++){parkedTrucksH.push({bookingNumber:'empty'}) }
for(let i = 0 ; i < R; i++){parkedTrucksR.push({bookingNumber:'empty'}) }
for(let i = 0 ; i < A; i++){parkedTrucksA.push({bookingNumber:'empty'}) }
for(let i = 0 ; i < B; i++){parkedTrucksB.push({bookingNumber:'empty'}) } /*usually i load the whole thing with empty, but just for the demo */
for(let i = 0 ; i < C; i++){parkedTrucksC.push({bookingNumber:'empty'}) }
for(let i = 0 ; i < D; i++){parkedTrucksD.push({bookingNumber:'empty'}) }
for(let i = 0 ; i < E; i++){parkedTrucksE.push({bookingNumber:'empty'}) }


/*for(let i = 0 ; i < 6; i++){parkedTrucksF.push({bookingNumber:'empty'}) }
for(let i = 0 ; i < 6; i++){parkedTrucksG.push({bookingNumber:'empty'}) }
for(let i = 0 ; i < 6; i++){parkedTrucksH.push({bookingNumber:'empty'}) }
for(let i = 0 ; i < 6; i++){parkedTrucksR.push({bookingNumber:'empty'}) }//if you add block some spaces, don't forget to put freeSpace, to the array position after the blocks stop 
for(let i = 0 ; i < 6; i++){parkedTrucksA.push({bookingNumber:'empty'}) }
for(let i = 0 ; i < 6; i++){parkedTrucksB.push({bookingNumber:'empty'}) }
for(let i = 0 ; i < 6; i++){parkedTrucksC.push({bookingNumber:'empty'}) }
for(let i = 0 ; i < 6; i++){parkedTrucksD.push({bookingNumber:'empty'}) }
for(let i = 0 ; i < 6; i++){parkedTrucksE.push({bookingNumber:'empty'}) }*/

const productsArray = [
  {
    
    tagCounter: 'A',
    parkedTrucks: parkedTrucksA, 
    occupiedSpaces:0,
    currentFreeSpace:1
  },
  {
    
    tagCounter: 'B',
    parkedTrucks: parkedTrucksB, 
    occupiedSpaces:0,
    currentFreeSpace:1
  },
  {
    
    tagCounter: 'C',
    parkedTrucks: parkedTrucksC, 
    occupiedSpaces:0,
    currentFreeSpace:1
  },
  {
    
    tagCounter: 'D',
    parkedTrucks: parkedTrucksD,
    occupiedSpaces:0,
    currentFreeSpace:1 
  },
  {
    
    tagCounter: 'E',
    parkedTrucks: parkedTrucksE,
    occupiedSpaces:0,
    currentFreeSpace:1 
  },
  {
    
    tagCounter: 'F',
    parkedTrucks: parkedTrucksF,
    occupiedSpaces:0,
    currentFreeSpace:1 
  },
  {
    
    tagCounter: 'G',
    parkedTrucks: parkedTrucksG,
    occupiedSpaces:0,
    currentFreeSpace:1 
  },
  {
    
    tagCounter: 'H',
    parkedTrucks: parkedTrucksH,
    occupiedSpaces:0,
    currentFreeSpace:1 
  },
  {
    
    tagCounter: 'R',
    parkedTrucks: parkedTrucksR,
    occupiedSpaces:0,
    currentFreeSpace:1 
  }
] 

  return productsArray
}

export default products
