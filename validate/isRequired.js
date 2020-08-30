const isRequired = (value) => {
 if(value === null || value === undefined || typeof value === 'object' ){
     return value
 }   
}
module.export = isRequired;
