import { error } from "node:console";

export function transcribeDNA(dna: string): string {
  let rna = ""
  for(let i = 0; i < dna.length; i++){
    let letter = dna[i];
    
    if(letter === "A"){
      rna += "U"
    }
    else if(letter === "T"){
      rna += "A"
    }
    else if(letter === "C"){
      rna += "G"
    }
    else if(letter === "G"){
      rna += "C"
    }
    else{
      throw error("Invalid");
    }

  }
    
  return rna;
}
