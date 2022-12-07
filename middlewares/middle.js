
const myMiddle1 = (req,res,next) =>{
  console.log("middleware runs from different folders 1 ");
  next();
 

};

const myMiddle2 = (req,res,next) =>{
  console.log("middleware runs from different folders 2");
  

};


module.exports={
	myMiddle1,
	myMiddle2
};