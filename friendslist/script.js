// JS here


Parse.initialize("eVsZAmlt57qwAxowUw5I2NrKxxL4Hn30yfczyzi5","czsLzXTvwCW299eI90GFPmDQzJMCLbFPD29IL8zw"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY


Parse.serverURL = 'https://parseapi.back4app.com/'


const newBtn = document.getElementById("newbtn");
const editBtns = document.querySelectorAll(".fa-edit");
const addFriendForm = document.getElementById("add-friend");
const editFriendForm = document.getElementById("edit-friend");
const friendList = document.querySelector("main ol");
const inputs = document.querySelectorAll("#add-friend input:not([type=submit])");
let thisRecord;

async function displayFriends(){
    const friends = Parse.Object.extend('Seal');
    const query = new Parse.Query(friends);

    try{
        const results = await query.ascending('lname').find();

        results.forEach(function(eachFriend){
            const id = eachFriend.id;
            const lname = eachFriend.get('lname');
            const fname = eachFriend.get('fname');
            const email = eachFriend.get('email');
            const facebook = eachFriend.get('facebook');
            const twitter = eachFriend.get('twitter');
            const instagram = eachFriend.get('instagram');
            const linkedin = eachFriend.get('linkedin');

            const theListItem = document.createElement("li");
            theListItem.setAttribute("id", `r-${id}`);
            theListItem.innerHTML = ` 
                <div class="name">
                        ${fname} ${lname} 
                    </div>
                    <div class="email">
                        <i class="fas fa-envelope-square"></i> ${email}
                    </div>
                    <div class="social">
                        <a href="${facebook}"><i class="fab fa-facebook-square"></i></a>
                        <a href="${twitter}"><i class="fab fa-twitter-square"></i></a>
                        <a href="${instagram}"><i class="fab fa-instagram"></i></a>
                        <a href="${linkedin}"><i class="fab fa-linkedin"></i></a>
                    </div>
                    <i class="fas fa-edit" id="e-${id}"></i>
                    <i class="fas fa-times-circle" id="e-${id}""></i>
            
            `;

            friendList.append(theListItem);
            
    });

    } catch (error){
        console.error('Error while creating friend: ', error);
    }

}

displayFriends();


newBtn.addEventListener("click", function(event){
    event.preventDefault();
    addFriendForm.className = "add-friend-onscreen";
})

addFriendForm.addEventListener("submit", function(event){
    event.preventDefault();
    // addFriendForm.className = "add-friend-offscreen";
    addFriend();
    
})

async function addFriend(){
    const newFriend = {};

    for(let i = 0; i < inputs.length; i++){
        let key = inputs[i].getAttribute('name');
        let value = inputs[i].value;
        newFriend[key] = value;
    }

    if(newFriend.fname != "" && newFriend.lname != "" && newFriend.email != ""){
        // const newFriendData = new Parse.Object('Friends');
        const newFriendData = new Parse.Object('Seal');
        newFriendData.set('fname', newFriend.fname);
        newFriendData.set('lname', newFriend.lname);
        newFriendData.set('email', newFriend.email);
        newFriendData.set('facebook', newFriend.facebook);
        newFriendData.set('twitter', newFriend.twitter);
        newFriendData.set('instagram', newFriend.instagram);
        newFriendData.set('linkedin', newFriend.linkedin);
        

        try{
            const result = await newFriendData.save();
            resetFormFields();
            addFriendForm.className = "add-friend-offscreen";
            friendList.innerHTML = '';
            displayFriends();
    
        } catch (error){
            console.error('Error while creating friend: ', error);
        }
    }

    else {
        addFriendForm.className = "add-friend-offscreen";
    }

    



}



for(let i = 0; i < editBtns.length; i++){
    editBtns[i].addEventListener("click", function(event){
        event.preventDefault();
        editFriendForm.className = "edit-friend-onscreen";
    })
}





editFriendForm.addEventListener("submit", function(event){
    event.preventDefault();
    // editFriendForm.className = "edit-friend-offscreen";
    updateRecord(thisRecord);
})

document.addEventListener('click', function(event){
    if (event.target.matches('.fa-edit')){
        // editFriendForm.className = "edit-friend-onscreen";
        // const thisRecord = event.target.getAttribute('id').slice(2);
        console.log(thisRecord);
        thisRecord = event.target.getAttribute('id').slice(2);
        setForm(thisRecord);
        // console.log(thisRecord);
    }
}, false);






function resetFormFields(){
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("fbook").value = "";
    document.getElementById("twitter").value = "";
    document.getElementById("insta").value = "";
    document.getElementById("linkedin").value = "";

}

async function setForm(recordId){
    const friends = Parse.Object.extend('Seal');
    const query = new Parse.Query(friends);
    query.equalTo("objectId", recordId);

    try{
        const results = await query.find();

        results.forEach(function(thisFriend){
            const lname = thisFriend.get('lname');
            const fname = thisFriend.get('fname');
            const email = thisFriend.get('email');
            const facebook = thisFriend.get('facebook');
            const twitter = thisFriend.get('twitter');
            const instagram = thisFriend.get('instagram');
            const linkedin = thisFriend.get('linkedin');
        
            document.getElementById("fname-edit").value = fname;
            document.getElementById("lname-edit").value = lname;
            document.getElementById("email-edit").value = email;
            document.getElementById("fbook-edit").value = facebook;
            document.getElementById("twitter-edit").value = twitter;
            document.getElementById("insta-edit").value = instagram;
            document.getElementById("linkedin-edit").value = linkedin;
        
        });

        editFriendForm.className = "edit-friend-onscreen";

    } catch (error){
        console.error('Error while fetching Friends', error);

    }
    
}


async function updateRecord(recordId){
    const theFields = document.querySelectorAll("#edit-friend input:not([type=submit])");
    const editedRecord = {};
    let key;
    let value;
    for(let i=0; i<theFields.length; i++){
        key = theFields[i].getAttribute("name");
        value = theFields[i].value;
        editedRecord[key] = value;
    }

    const friends = Parse.Object.extend('Seal');
    const query = new Parse.Query(friends);
    try{
        const object = await query.get(recordId);
        object.set('fname', editedRecord.fname);
        object.set('lname', editedRecord.lname);
        object.set('email', editedRecord.email);
        object.set('facebook', editedRecord.facebook);
        object.set('twitter', editedRecord.twitter);
        object.set('instagram', editedRecord.instagram);
        object.set('linkedin', editedRecord.linkedin);
        try{
            await object.save();
            editFriendForm.className = "edit-friend-offscreen";
            friendList.innerHTML = '';
            displayFriends();
            

        } catch (error){
            console.error('Error while updating friends', error);
        }
    } catch (error){
        console.error('Error while retrieving object friends', error);
    }

}



document.addEventListener('click', function(event){
    if (event.target.matches('.fa-times-circle')){
        thisRecord = event.target.getAttribute('id').slice(2);
        deleteRecord(thisRecord);
    }
}, false);

async function deleteRecord(recordId){
    const youAreSure = confirm(
        'Are you sure you want to delete this record?'
    );

    if (youAreSure){
        const query = new Parse.Query('Seal');
        try{
            const object = await query.get(recordId);
            try{
                await object.destroy();
                document.getElementById(`r-${recordId}`).className = 'remove';
                setTimeout(function(){
                    const elem = document.getElementById(`r-${recordId}`);
                    elem.parentNode.removeChild(elem);
                }, 1500);

            } catch(error){
                console.error('Error while deleting ParseObject', error);
            }
        } catch (error){
            console.error('Error while retrieving ParseObject', error);
        }
    }
}

