
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

for(let i = 0 ; i < F-5; i++){parkedTrucksF.push({bookingNumber:'fordemo'}) }
for(let i = 0 ; i < G-5; i++){parkedTrucksG.push({bookingNumber:'fordemo'}) }
for(let i = 0 ; i < H-5; i++){parkedTrucksH.push({bookingNumber:'fordemo'}) }
for(let i = 0 ; i < R-5; i++){parkedTrucksR.push({bookingNumber:'fordemo'}) }
for(let i = 0 ; i < A-5; i++){parkedTrucksA.push({bookingNumber:'fordemo'}) }
for(let i = 0 ; i < B-5; i++){parkedTrucksB.push({bookingNumber:'fordemo'}) } /*usually i load the whole thing with empty, but just for the demo */
for(let i = 0 ; i < C-5; i++){parkedTrucksC.push({bookingNumber:'fordemo'}) }
for(let i = 0 ; i < D-5; i++){parkedTrucksD.push({bookingNumber:'fordemo'}) }
for(let i = 0 ; i < E-5; i++){parkedTrucksE.push({bookingNumber:'fordemo'}) }


for(let i = 0 ; i < 6; i++){parkedTrucksF.push({bookingNumber:'empty'}) }
for(let i = 0 ; i < 6; i++){parkedTrucksG.push({bookingNumber:'empty'}) }
for(let i = 0 ; i < 6; i++){parkedTrucksH.push({bookingNumber:'empty'}) }
for(let i = 0 ; i < 6; i++){parkedTrucksR.push({bookingNumber:'empty'}) }
for(let i = 0 ; i < 6; i++){parkedTrucksA.push({bookingNumber:'empty'}) }
for(let i = 0 ; i < 6; i++){parkedTrucksB.push({bookingNumber:'empty'}) }
for(let i = 0 ; i < 6; i++){parkedTrucksC.push({bookingNumber:'empty'}) }
for(let i = 0 ; i < 6; i++){parkedTrucksD.push({bookingNumber:'empty'}) }
for(let i = 0 ; i < 6; i++){parkedTrucksE.push({bookingNumber:'empty'}) }

const productsArray = [
  {
    
    tagCounter: 'A',
    parkedTrucks: parkedTrucksA, 
    occupiedSpaces:32,
    currentFreeSpace:1
  },
  {
    
    tagCounter: 'B',
    parkedTrucks: parkedTrucksB, 
    occupiedSpaces:41,
    currentFreeSpace:1
  },
  {
    
    tagCounter: 'C',
    parkedTrucks: parkedTrucksC, 
    occupiedSpaces:73,
    currentFreeSpace:1
  },
  {
    
    tagCounter: 'D',
    parkedTrucks: parkedTrucksD,
    occupiedSpaces:25,
    currentFreeSpace:1 
  },
  {
    
    tagCounter: 'E',
    parkedTrucks: parkedTrucksE,
    occupiedSpaces:66,
    currentFreeSpace:1 
  },
  {
    
    tagCounter: 'F',
    parkedTrucks: parkedTrucksF,
    occupiedSpaces:47,
    currentFreeSpace:1 
  },
  {
    
    tagCounter: 'G',
    parkedTrucks: parkedTrucksG,
    occupiedSpaces:45,
    currentFreeSpace:1 
  },
  {
    
    tagCounter: 'H',
    parkedTrucks: parkedTrucksH,
    occupiedSpaces:46,
    currentFreeSpace:1 
  },
  {
    
    tagCounter: 'R',
    parkedTrucks: parkedTrucksR,
    occupiedSpaces:90,
    currentFreeSpace:1 
  }
] 

  return productsArray
}

export default products
