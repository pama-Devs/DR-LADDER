const submitHandler = (e) => {
    e.preventDefault();

    //fetch the form data values
    const formData = {
        first_name: document.getElementById("name").value,
        last_name: document.getElementById("lastname").value,
        email: document.getElementById("email").value,
        contact_number: document.getElementById("phone").value,
        dob: document.getElementById("dob").value,
        interested_in: interestedIn(),
        qualification: document.getElementById("edu").value,
        company: document.getElementById("com").value,
        designation: document.getElementById("des").value,
        from: document.getElementById("fro").value,
        to: document.getElementById("to").value,
        last_month_sal: document.getElementById("sal1").value,
        expected_monthly_sal: document.getElementById("sal2").value,
        possible_month_of_joining: document.getElementById("jon").value,
        additional_info: document.getElementById("inf").value,
        resume: document.getElementById("exampleFormControlFile1").files[0],
        photo: document.getElementById("exampleFormControlFile2").files[0]
    } 

    //fetch the checked radio button
    function interestedIn() {
        var radios = document.getElementsByClassName("form-check-input");
        for(let radio of radios) {
            if(radio.checked) {
                return document.getElementById(radio.id).value;
            }
        }
    }

     //create an instance of form data object
      var myFormData = new FormData();

      //append the form data name and values
      for(const [key, value] of Object.entries(formData)) {
        myFormData.append(key, value);
    }
    
      //fetch api with post method---form submission
      fetch("http://localhost:5000/contact-us", {
          method: "POST",
          headers: {
          },
          body: myFormData
      })
      .then(response => response.json())
      .then(data => {
        alert(`${data.message}`);
        location.reload();
      })
}

const hireFormSubmit = (e) => {
    e.preventDefault();
    const form = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    }
    var formData = new FormData();
    for(const [key, value] of Object.entries(form)) {
        formData.append(key, value);
    }
    fetch('http://localhost:5000/hire-form', {
        method: 'POST',
        headers: {
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert(data.message);
    })
}

const joinUsFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
        first_name: document.getElementById('name').value,
        last_name: document.getElementById('lastname').value,
        email: document.getElementById('email').value,
        contact: document.getElementById('phone').value,
        preferrable_location: document.getElementById('loc').value,
        position: position(),
        resume: document.getElementById('exampleFormControlFile1').files[0]
    }

    //fetch the checked radio button
    function position() {
        var radios = document.getElementsByClassName("form-check-input");
        for(let radio of radios) {
            if(radio.checked) {
                return document.getElementById(radio.id).value;
            }
        }
    }

    //create FormData Object
    const form = new FormData();
    for(const [key, value] of Object.entries(formData)) {
        form.append(key, value);
    }

    //fetch api
    fetch('http://localhost:5000/join-us', {
        method: 'POST',
        headers: {

        },
        body: form
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        console.log(data);
    })
}