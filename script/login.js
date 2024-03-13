const app= Vue.createApp({
    data:()=>({
     email:'',
     password:'',
     postion:  '', 
    }),
    methods:{
     handleFormSubmission(e) 
       {
         if(this.HTMLValidations(e))
         {
           this.loginApiFun();
         }
       },
     HTMLValidations(e)
         {
           if (!e.target.checkValidity())
           {
               e.preventDefault();
               e.stopPropagation();
               e.target.classList.add("was-validated");
               return false;
             }
             else
             {
               e.target.classList.add("was-validated");
               return true;
             }
         },
     loginApiFun(){
    myObject={
    email:this.email,
    password:this.password, 
    postion:this.postion, 
    };
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../api/Login.php");
    xhr.onreadystatechange = ()=>
    { 
    if (xhr.readyState === 4 && xhr.status === 200)
    {
     let res= JSON.parse(xhr.response);
       
   if(res.status===1){
      if(this.postion==='admin')
     {   location.href=`./adminhome.html?id=${res.id}`;}
     else if(this.postion==='user')
     { location.href=`./userhome.html?id=${res.id}`;}
   }
   else if(res.status===0){
     document.getElementById('warning').style.display='block';
   }
   
   } }
    xhr.setRequestHeader("Content-type", "application/json")  
    xhr.send(JSON.stringify(myObject)); 

    }    
    
},


}); 

app.mount("body");