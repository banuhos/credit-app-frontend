import axios from 'axios';

const API_URL = 'http://localhost:8080/';

class UserService {
  
    checkCredit(name,surname, identificationNumber, phoneNumber,mounthlyIncome) {
      return axios.post(API_URL + "users/creditResponse", {
        name,
        surname,
        identificationNumber,
        phoneNumber,
        mounthlyIncome
      });
    }
  
  }
  
  export default new UserService();