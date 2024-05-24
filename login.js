function checkData(){
    let email, pass;
    email = document.getElementById('Email').value;
    pass = document.getElementById('Password').value;

   let userrecord = new Array();
   userrecord = JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]
   if (userrecord.some((v)=>{
       return v.email==email && v.pass == pass
   })) {
       alert("login success");
       let curr_user = userrecord.filter((v)=>{
        return v.email == email && v.pass == pass
       })[0]

       localStorage.setItem("email",curr_user.email);
       window.location.href="expense.html",true;
   }else{
      alert("login failed");
   }
}