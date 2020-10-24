import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { Dialog } from '@progress/kendo-react-dialogs';

import UserService from "../services/user.service";


export default class UserInformationForm extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        name: "",
        surname: "",
        phoneNumber: "",
        identificationNumber: 0,
        mounthlyIncome:0.0,
        successful: false,
        message: "",
        visible: true,
        input: {},
        errors: {}
      };
    }

    toggleDialog=()=> {
      this.setState({
          visible: !this.state.visible
      });
  }

  handleChange=(event)=> {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let input = this.state.input;
    input[event.target.name] = event.target.value;
  
    this.setState({
      [name]: value,
      input
    });
  }

      
  validate(){
    let input = this.state.input;
    let errors = {};
    let isValid = true;

    if (!input["name"]) {
      isValid = false;
      errors["name"] = "Lütfen adınızı giriniz.";
    }

    if (!input["surname"]) {
      isValid = false;
      errors["surname"] = "Lütfen soyadınızı giriniz.";
    }

    if (!input["identificationNumber"]) {
      isValid = false;
      errors["identificationNumber"] = "Lütfen kimlik numaranızı giriniz.";
    }

    if (typeof input["identificationNumber"] !== "undefined") {
      var pattern = new RegExp(/^[0-9\b]+$/);
      if (!pattern.test(input["phoneNumber"])) {
        isValid = false;
        errors["identificationNumber"] = "Lütfen sadece sayı giriniz.";
      }else if(input["identificationNumber"].length <11){
        isValid = false;
        errors["identificationNumber"] = "Lütfen 11 haneli kimlik numaranızı giriniz.";
      }
    
    }

    if (!input["phoneNumber"]) {
      isValid = false;
      errors["phoneNumber"] = "Lütfen telefon numaranızı giriniz.";
    }
    if (typeof input["phoneNumber"] !== "undefined") {
        
      var pattern = new RegExp(/^[0-9\b]+$/);
      if (!pattern.test(input["phoneNumber"])) {
        isValid = false;
        errors["phoneNumber"] = "Lütfen sadece sayı giriniz.";
      }else if(input["phoneNumber"].length != 10){
        isValid = false;
        errors["phoneNumber"] = "Tanımlı bir telefon numarası giriniz.";
      }
    }

    if (!input["mounthlyIncome"]) {
      isValid = false;
      errors["mounthlyIncome"] = "Lütfen aylık gelirinizi giriniz";
    }

    this.setState({
      errors: errors
    });

    return isValid;
}

handleUser=(e)=> {
        e.preventDefault();
  
        this.setState({
          message: "",
          successful: false
        });

      
        if(this.validate()){
          console.log(this.state);
    
          let input = {};
          input["name"] = "";
          input["surname"] = "";
          input["phoneNumber"] = "";
          input["identificationNumber"] = "";
          input["mounthlyIncome"] = "";
          this.setState({input:input});

    
          UserService.checkCredit(
            this.state.name,
            this.state.surname,
            this.state.identificationNumber,
            this.state.phoneNumber,
            this.state.mounthlyIncome
          ).then(
            response => {
              this.setState({
                message: response.data.message,
                successful: true
              });
            },
            error => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
    
              this.setState({
                successful: false,
                message: resMessage
              });
            }
          ); 
      }
      }
     
       render() {
        return (
          <div className="col-md-12" >
            <div className="card card-container">
            <Form
            onSubmit={this.handleUser}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label style={{color:"purple",fontSize:"20px"}} for="name">Ad</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Adınız.." 
                    value={this.state.input.name}
                    onChange={this.handleChange}
                    id="name"
                  />
                  <div className="text-danger">{this.state.errors.name}</div>
                </div>

                <div className="form-group">
                  <label  style={{color:"purple",fontSize:"20px"}} htmlFor="surname">Soyad</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="surname"
                    placeholder="Soyadınız.." 
                    value={this.state.input.surname}
                    onChange={this.handleChange}
                    id="surname"
                  />
                  <div className="text-danger">{this.state.errors.surname}</div>
                </div>

                <div className="form-group">
                  <label  style={{color:"purple",fontSize:"20px"}} htmlFor="phoneNumber">Telefon Numarası</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="phoneNumber"
                    placeholder="Telefon Numaranız.." 
                    value={this.state.input.phoneNumber}
                    onChange={this.handleChange}
                    id="phoneNumber"
                  />
                  <div className="text-danger">{this.state.errors.phoneNumber}</div>
                </div>

                <div className="form-group">
                  <label  style={{color:"purple",fontSize:"20px"}} htmlFor="identificationNumber">Kimlik Numarası</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="identificationNumber"
                    placeholder="Kimlik numaranız.." 
                    maxLength="11"
                    value={this.state.input.identificationNumber}
                    onChange={this.handleChange}
                    id="identificationNumber"
                  />
                  <div className="text-danger">{this.state.errors.identificationNumber}</div>
                </div>

                <div className="form-group">
                  <label  style={{color:"purple",fontSize:"20px"}} htmlFor="mounthlyIncome">Aylık Gelir</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="mounthlyIncome"
                    placeholder="Aylık Gelir Bilginiz.." 
                    value={this.state.input.mounthlyIncome}
                    onChange={this.handleChange}
                    id="mounthlyIncome"
                  />
                  <div className="text-danger">{this.state.errors.mounthlyIncome}</div>
                </div>

                <input type="submit" value="Hesapla" class="btn btn-success" />

          
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                 {this.state.visible && 
                 <Dialog title={"Kredi Sonucunuz"} onClose={this.toggleDialog}>
                    <p style={{ margin: "20px", padding: "40px",textAlign: "center" }}>   
                    <div style={{padding:"40px"}}
                  className={
                    this.state.message.includes("Onay")
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div></p>
                </Dialog>
                }
             
              </div>
            )}
        
          </Form>
        </div>
      </div>
    );
  }
   
}