function addData(){
    let email, pass;
     email = document.getElementById('Email').value;
     pass = document.getElementById('Password').value;

    let userrecord = new Array();
    userrecord = JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]
    if (userrecord.some((v)=>{
        return v.email==email
    })) {
        alert("duplicate data");
    }else{
        userrecord.push({
            "email": email,
            "pass" : pass
        })
        localStorage.setItem("users",JSON.stringify(userrecord));
    }
}