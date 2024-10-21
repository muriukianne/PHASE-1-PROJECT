

// Fetch all flight post from the backend
fetch('https://phase-1-project-22js.onrender.com/flights')
  .then((res) => res.json())
  .then((data) => {

    // Got the container where the flight posts will be displayed
const posts_row = document.getElementById("posts_row")

    //  Iterate through each flight post in the fetched data
for(post of data){

    // Construct the HTML for each flight post and append it to the container
    posts_row.innerHTML += `
    <div class="col-md-3 mb-2">
      <div class="bg-dark p-1 border">
        <img src=${post.image} class="img-fluid" />
        <h6 class="fw-bold">Name - ${post.name}</h6>
        <h6 class="fw-bold">From - ${post.from}</h6>
        <h6 class="fw-bold">To - ${post.to}</h6>
        <h6 class="fw-bold">Airline - ${post.airline}</h6>
        <h6 class="fw-bold">Price - ${post.price}</h6>
        <div class="row">
          <p class="col fw-bold">Departure Time - ${post.departureTime}</p>
          <p class="col fw-bold" >Arrival Time - ${post.arrivalTime}</p>
        </div>
        <div class="btn-group">
        <button onclick="deletePost('${(post.id)}')" class="btn btn-secondary btn-sm">Delete Flight</buton>
        <br>
        <button onclick="editPost('${(post.id)}')" class="btn btn-secondary ms-4 btn-sm">Update Flight</buton>
        <br>
        <button onclick="viewPost('${(post.id)}')" class="btn btn-secondary ms-4 btn-sm">View Flight </buton>
        </div>
      </div>
    </div>
    `
}
});


// Set up an event listener for adding a new flight post
const add_form = document.getElementById("add_post_form");

add_form.addEventListener("submit", (event)=>{

    // Used to prevent deafault form submission
    event.preventDefault();

    // Gathered the input values from the form fields
      const image = document.getElementById("image").value;
      const name = document.getElementById("name").value;
      const from = document.getElementById("from").value;
      const to = document.getElementById("to").value;
      const departureTime= document.getElementById("departureTime").value;
      const arrivalTime = document.getElementById("arrivalTime").value;
      const airline= document.getElementById("airline").value;
      const price= document.getElementById("price").value;

    // Sent a POST request to create a new flight post
      fetch('https://phase-1-project-22js.onrender.com/flights', {
        method: 'POST',
        body: JSON.stringify({
          image:image,
          name:name,  
          from: from,
          to: to,
          departureTime: departureTime,
          arrivalTime: arrivalTime,
          airline: airline,
          price:price,
          comments: []
        }),
        headers: {
            // Specified the content type of the request
          'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json())
        .then((res) => {
          const message = document.getElementById("message");
          message.innerText = "Flight created Successfully"
          
        });
})


// Added a function to delete a specific flight post by its ID
function deletePost(id){
 
  fetch(`https://phase-1-project-22js.onrender.com/flights/${id}`, {
    // Specified the delete method
    method: 'DELETE',
  })
  .then((res)=> res.json() )
  .then((response) =>{
          const message = document.getElementById("delete_message");
          message.innerText = "Flight deleted Successfully"
  })
  }

//   Created a function to initiate the editing of a flight post
function editPost(id)
{
    // fetch the existing flight data for the specified ID
  fetch(`https://phase-1-project-22js.onrender.com/flights/${id}`)
  .then((res) => res.json())
  .then((data) => {

    const edit_container = document.getElementById("edit_container")

    // populate the edit form with existing flight data
    edit_container.innerHTML = `
            
        <h5>Update Flight Ticket</h5>
        <div id="update_message" class="text-success" role="alert"></div>
        <form id="update_post_form">
          <div class="mb-3">
            <h5 style="color:black">Image</h5>
            <input type="text" class="form-control" id="edit_image" value="${data.image}" required placeholder="Image" >
          </div>
          <div class="mb-3">
            <h5 style="color:black">Name</h5>
            <input type="text" class="form-control" id="edit_name" value="${data.name}" required placeholder="Name" >
          </div>

        <!-- Dropdown for selecting destination -->
        <h5 style="color:black">To</h5>       
        <div class="mb-3">
           <select id="edit_to" class="form-control" required>
           <option value="Zanzibar" ${data.to === "Zanzibar" ? "selected" : ""}>Zanzibar</option>
           <option value="London" ${data.to === "London" ? "selected" : ""}>London</option>
           <option value="South Africa" ${data.to === "South Africa" ? "selected" : ""}>South Africa</option>
           <option value="New York" ${data.to === "New York" ? "selected" : ""}>New York</option>
           <option value="Paris" ${data.to === "Paris" ? "selected" : ""}>Paris</option>
           <option value="Dubai" ${data.to === "Dubai" ? "selected" : ""}>Dubai</option>
           </select>
        </div>

        <!-- Dropdown for selecting the departure location destination -->
        <h5 style="color:black">From</h5>
        <div class="mb-3">
           <select id="edit_from" class="form-control" required>
           <option value> --select--</option>
           <option value="Nairobi" ${data.from === "Nairobi" ? "selected" : ""}>Nairobi</option>
           <option value="Eldoret" ${data.from === "Eldoret" ? "selected" : ""}>Eldoret</option>
           <option value="Kisumu" ${data.from === "Kisumu" ? "selected" : ""}>Kisumu</option>
           <option value="Mombasa" ${data.from === "Mombasa" ? "selected" : ""}>Mombasa</option>
           <option value="Malindi" ${data.from === "Malindi" ? "selected" : ""}>Malindi</option>
           </select>
        </div>
                 
        
        <div class="mb-3">
            <h5 style="color:black">AirLine</h5>
            <input type="text" class="form-control" id="edit_airline" value="${data.airline}" required placeholder="Airline" >
        </div>
        
        <div class="mb-3">
            <h5 style="color:black">Price</h5>
            <input type="text" class="form-control" id="edit_price" value="${data.price}" required placeholder="Price" >
        </div>

        <div class="mb-3">
            <h5 style="color:black">Departure Time</h5>
            <input type="text" class="form-control" id="edit_departureTime" value="${data.departureTime}" required placeholder="Departure Time" >
        </div>

         <div class="mb-3">
             <h5 style="color:black">Arrival Time</h5>
            <input type="text" class="form-control" id="edit_arrivalTime" value="${data.arrivalTime}" required placeholder="Arrival Time" >
        </div>
        
        <button type="submit" class="btn btn-primary">Update</button>
        </form>
    `
    // Set up an event listener to handle the submission of the updated form
    const edit_form = document.getElementById("update_post_form");

    edit_form.addEventListener("submit", (event)=>{
        event.preventDefault();

        // Gather the updated values from the form fields
        const image = document.getElementById("edit_image").value;
        const name = document.getElementById("edit_name").value;
        const from = document.getElementById("edit_from").value;
        const to= document.getElementById("edit_to").value;
        const airline= document.getElementById("edit_airline").value;
        const price = document.getElementById("edit_price").value;
  
        // sent a patch request to update the flight post with new data
        fetch(`https://phase-1-project-22js.onrender.com/flights/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            image:image,
            name: name,
            from: from,
            to: to,
            airline: airline,
            price: price,
            comments: []
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
          .then((response) => response.json())
          .then((res) => {
            const update_message = document.getElementById("update_message");
            update_message.innerText = "Flight Updated Successfully"
  
        });
    })
})
}


// Created a function to display a single post

function viewPost(id){

  fetch(`https://phase-1-project-22js.onrender.com/flights/${id}`)
  .then((res) => res.json())
  .then((data) => {

    const single_post = document.getElementById("single_post")
    single_post.innerHTML = `
        <div class="justify-content-center mb-2">
    <div class="bg-dark p-1 border text-center">
     <img src=${data.image} class="img-fluid" />
     <h6 class="fw-bold">Name - ${data.name}</h6>
     <h6 class="fw-bold">From - ${data.from}</h6>
     <h6 class="fw-bold">To - ${data.to}</h6>
     <h6 class="fw-bold">Airline - ${data.airline}</h6>
     <h6 class="fw-bold">Price - ${data.price}</h6>
     <div class="row">
        <p class="col">Departure Time - ${data.departureTime}</p>
        <p class="col">Arrival Time - ${data.arrivalTime}</p>
     </div>
     <button onclick="deletePost('${(data.id)}')" class="btn btn-danger btn-sm">Delete</buton>
     <button onclick="editPost('${(data.id)}')" class="btn btn-success ms-4 btn-sm">Update</button>
       
    </div>
    </div>
    `
 })
}






  