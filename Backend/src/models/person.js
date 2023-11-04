class Person {
  constructor(name, dpi, datebirth, address, companies, recluiter) {
    this.name = name;
    this.dpi = dpi;
    this.datebirth = datebirth;
    this.address = address;
    this.companies= companies;
    this.recluiter= recluiter;
  }
  setCompanies(companies){
    this.companies = companies;
  }
  setRecluiter(recluiter){
    this.recluiter = recluiter;
  }
  setName(name){
    this.name = name;
  }
  setDpi(dpi){
    this.dpi = dpi;
  }
  setDatebirth(datebirth){
    this.datebirth = datebirth;
  }
  setAddress(address){
    this.address = address;
  }
  getCompanies(){
    return this.companies;
  }
  getRecluiter(){
    return this.recluiter;
  }
  getName(){
    return this.name;
  }
  getDpi(){
    return this.dpi;
  }
  getDatebirth(){
    return this.datebirth;
  }
  getAddress(){
    return this.address;
  }
  
}

export default Person;
