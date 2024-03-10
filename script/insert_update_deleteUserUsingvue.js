const app= Vue.createApp({
  data:()=>({
    fname:'',
    lname:'',
    email:'',
    password:'',
    room:'', 
    file:null, 
  }),
       
  methods:
  {
    handleFormSubmission(e,model) 
      {
        if(this.HTMLValidations(e)&&this.jsValidations())
        {
          this.sendrequest(model);
          let SModal = bootstrap.Modal.getOrCreateInstance(document.getElementById(`${model}Modal`))
            SModal.hide();
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
    jsValidations()
    {
      const namePattern = /^[a-zA-Z ,.'-]+$/;
      const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      const roomPattern = /^[1-9]\d*$/;
      if(namePattern.test(this.fname)
      &&namePattern.test(this.lname)
      &&emailPattern.test(this.email)
      &&passwordPattern.test(this.password)
        &&roomPattern.test(this.room))
      {
        return true;
      }
      else
      {
        return false;
      }
    },
    handleFileChange(event)
    {
      this.file = event.target.files[0];
    },
    resMass(Mass,done=0)
    {
      let ele=document.getElementById('res');
      if(done==1)
      {
        ele.classList.remove('bg-danger');
        ele.classList.add('bg-success')
      }
      else
      {
        ele.classList.remove('bg-success')
        ele.classList.add('bg-danger'); 
      }
      ele.style.display="block";
        ele.innerText=Mass; 
    },
    sendrequest(model)
    {
      this.id=document.getElementById('userID').value
      const formData = new FormData();
      formData.append('fname', this.fname);
      formData.append('lname',this.lname);
      formData.append('email', this.email);
      formData.append('password', this.password);
      formData.append('room', this.room);
      formData.append('img', this.file);
      if(model=="edit")
      {
      formData.append('id', this.id);
      }
      var xhr = new XMLHttpRequest();
      xhr.open("POST", `../api/${model}Customer.php`);
      xhr.onreadystatechange = ()=>
      { 
        if (xhr.readyState === 4 && xhr.status === 200)
        {
          let res= JSON.parse(xhr.response);
          if(res.status==='success')
          {
            this.resMass(res.message,1);
          }
          else if(res.status==='failed3')
         {
            let masseg='';
            for (err in res.errors)
            {
              masseg+=res.errors[`${err}`]+"\n";
            }
            this.resMass(masseg);
          }
         else if (res.status==='failed1')
         {
            if(res.message.includes('room'))
            {
              this.resMass('insert failed (wrong Room Number)');
            }
            else if(res.message.includes('email'))
            {
              this.resMass('insert failed (Duplicate entry for Email)');
            }
          }
          else if(res.status==='failed2')
          {
            this.resMass(res.message);
          }
          
        }
      }
          xhr.send( formData ); 

    },
  deleteUser(e)
  {
    const formData = new FormData();
    formData.append('id', e.target.value );
    var xhr = new XMLHttpRequest();
    xhr.open("POST", `../api/deleteUser.php`);
    xhr.onreadystatechange = ()=>
    { 

      if (xhr.readyState === 4 && xhr.status === 200)
      {
        let res= JSON.parse(xhr.response);
        if(res.status==='success')
        {
         this.resMass(res.message,1);
        }
        else if (res.status==='failed1')
        {
          this.resMass('failed to delete the record from database');
        }
        else if(res.status==='failed2')
        {
           this.resMass(res.message);
        }
       let SModal = bootstrap.Modal.getOrCreateInstance(document.getElementById(`deleteModal`))
        SModal.hide();
        location.href="";
      }
    }
    xhr.send( formData ); 
  
  }    
  
},


}); 

app.mount("body");